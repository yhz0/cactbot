import DTFuncs from '../../../../../resources/datetime';
import logDefinitions, { LogDefinitionMap } from '../../../../../resources/netlog_defs';
import SFuncs from '../../../../../resources/stringhandlers';
import { Job } from '../../../../../types/job';

import { LineEvent0x03 } from './LineEvent0x03';
import LogRepository from './LogRepository';

const fields = {
  event: 0,
  timestamp: 1,
} as const;

const unknownLogMessagePrefix = 'Unknown';

const logMessagePrefix: { [type: string]: string } = {};
const logDefsGeneric: LogDefinitionMap = logDefinitions;
for (const def of Object.values(logDefsGeneric)) {
  if (def.messageType !== undefined)
    logMessagePrefix[def.type] = def.messageType;
}

/**
 * Generic class to track an FFXIV log line
 */
export default class LineEvent {
  public offset = 0;
  public convertedLine: string;
  public invalid = false;
  public index = 0;
  public readonly decEventStr: string;
  public readonly decEvent: number;
  public readonly hexEvent: string;
  public readonly timestamp: number;
  public readonly checksum: string;
  public readonly tzOffsetMillis: number;

  constructor(repo: LogRepository, public networkLine: string, parts: string[]) {
    const timestampString = parts[fields.timestamp] ?? '0';
    this.tzOffsetMillis = DTFuncs.getTimezoneOffsetMillis(timestampString);
    this.decEventStr = parts[fields.event] ?? '00';
    this.decEvent = parseInt(this.decEventStr);
    this.hexEvent = SFuncs.zeroPad(this.decEvent.toString(16).toUpperCase());
    this.timestamp = new Date(timestampString).getTime();
    this.checksum = parts.slice(-1)[0] ?? '';
    repo.updateTimestamp(this.timestamp);
    this.convertedLine = this.prefix() + parts.slice(2, -1).join(':').replace('|', ':');
  }

  prefix(): string {
    const timeString = DTFuncs.timeToTimeString(this.timestamp, this.tzOffsetMillis, true);
    // TODO: should raidemulator not convert lines that don't come from the ffxiv plugin?
    const logMessageName = logMessagePrefix[this.decEventStr] ?? unknownLogMessagePrefix;
    return `[${timeString}] ${logMessageName} ${this.hexEvent}:`;
  }

  static isDamageHallowed(damage: string): boolean {
    return (parseInt(damage, 16) & parseInt('1000', 16)) > 0;
  }

  static isDamageBig(damage: string): boolean {
    return (parseInt(damage, 16) & parseInt('4000', 16)) > 0;
  }

  static calculateDamage(damage: string): number {
    if (LineEvent.isDamageHallowed(damage))
      return 0;

    damage = SFuncs.zeroPad(damage, 8);
    const parts = [
      damage.slice(0, 2),
      damage.slice(2, 4),
      damage.slice(4, 6),
      damage.slice(6, 8),
    ] as const;

    if (!LineEvent.isDamageBig(damage))
      return parseInt(parts.slice(0, 2).reverse().join(''), 16);

    return parseInt(
      parts[3] + parts[0] +
        (parseInt(parts[1], 16) - parseInt(parts[3], 16)).toString(16),
      16,
    );
  }
}

// Type guards for these interfaces require their own descriptor property
// because we don't want every line event with an id/name
// to update combatant state, for example
export interface LineEventSource extends LineEvent {
  readonly isSource: true;
  readonly id: string;
  readonly name: string;
  readonly x?: number;
  readonly y?: number;
  readonly z?: number;
  readonly heading?: number;
  readonly targetable?: boolean;
  readonly hp?: number;
  readonly maxHp?: number;
  readonly mp?: number;
  readonly maxMp?: number;
}

export const isLineEventSource = (line: LineEvent): line is LineEventSource => {
  return 'isSource' in line;
};

export interface LineEventTarget extends LineEvent {
  readonly isTarget: true;
  readonly targetId: string;
  readonly targetName: string;
  readonly targetX?: number;
  readonly targetY?: number;
  readonly targetZ?: number;
  readonly targetHeading?: number;
  readonly targetHp?: number;
  readonly targetMaxHp?: number;
  readonly targetMp?: number;
  readonly targetMaxMp?: number;
}

export const isLineEventTarget = (line: LineEvent): line is LineEventTarget => {
  return 'isTarget' in line;
};

export interface LineEventJobLevel extends LineEvent {
  readonly isJobLevel: true;
  readonly job: Job;
  readonly jobId: number;
  readonly level: number;
}

export const isLineEventJobLevel = (line: LineEvent): line is LineEventJobLevel => {
  return 'isJobLevel' in line;
};

export interface LineEventAbility extends LineEvent {
  readonly isAbility: true;
  readonly abilityId: number;
  readonly abilityName: string;
}

export const isLineEventAbility = (line: LineEvent): line is LineEventAbility => {
  return 'isAbility' in line;
};

export const isLineEvent0x03 = (line: LineEvent): line is LineEvent0x03 => {
  return line.decEvent === 3;
};
