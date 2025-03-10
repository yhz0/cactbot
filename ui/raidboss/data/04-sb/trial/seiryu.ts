import Conditions from '../../../../../resources/conditions';
import Outputs from '../../../../../resources/outputs';
import { Responses } from '../../../../../resources/responses';
import ZoneId from '../../../../../resources/zone_id';
import { RaidbossData } from '../../../../../types/data';
import { TriggerSet } from '../../../../../types/trigger';

export interface Data extends RaidbossData {
  redRush?: string[];
}

// Seiryu Normal
const triggerSet: TriggerSet<Data> = {
  zoneId: ZoneId.TheWreathOfSnakes,
  timelineFile: 'seiryu.txt',
  timelineTriggers: [
    {
      id: 'Seiryu Line Stack',
      regex: /Forbidden Arts/,
      beforeSeconds: 1,
      suppressSeconds: 10,
      infoText: (_data, _matches, output) => output.text!(),
      outputStrings: {
        text: {
          en: 'line stack',
          de: 'Linien-Stack',
          fr: 'Packez-vous en ligne',
          ja: 'スタック',
          cn: '直线分摊',
          ko: '직선 쉐어',
        },
      },
    },
  ],
  triggers: [
    {
      id: 'Seiryu Fifth Element',
      type: 'StartsUsing',
      netRegex: { source: 'Seiryu', id: '37FE', capture: false },
      response: Responses.aoe(),
    },
    {
      id: 'Seiryu Serpent-Eye Sigil',
      type: 'StartsUsing',
      netRegex: { source: 'Seiryu', id: '3A08', capture: false },
      response: Responses.getIn(),
    },
    {
      id: 'Seiryu Onmyo Sigil',
      type: 'StartsUsing',
      netRegex: { source: 'Seiryu', id: '3A07', capture: false },
      response: Responses.getOut(),
    },
    {
      id: 'Seiryu Infirm Soul',
      type: 'StartsUsing',
      netRegex: { source: 'Seiryu', id: '37FD' },
      response: Responses.tankBuster(),
    },
    {
      id: 'Seiryu Serpent Ascending Towers',
      type: 'Ability',
      netRegex: { source: 'Seiryu', id: '3C25', capture: false },
      infoText: (_data, _matches, output) => output.text!(),
      outputStrings: {
        text: {
          en: 'Get Towers',
          de: 'Türme nehmen',
          fr: 'Prenez les tours',
          ja: '塔を踏む',
          cn: '踩塔',
          ko: '장판 하나씩 들어가기',
        },
      },
    },
    {
      id: 'Seiryu Serpent Descending',
      type: 'HeadMarker',
      netRegex: { id: '00A9' },
      condition: Conditions.targetIsYou(),
      response: Responses.spread(),
    },
    {
      id: 'Seiryu Blue Bolt',
      type: 'Tether',
      netRegex: { source: 'Ao-No-Shiki', id: '0011' },
      delaySeconds: 0.5,
      infoText: (data, matches, output) => {
        if (data.redRush?.includes(data.me))
          return;
        if (matches.target === data.me)
          return output.stackOnYou!();
        return output.stackOnPlayer!({ player: data.ShortName(matches.target) });
      },
      run: (data) => delete data.redRush,
      outputStrings: {
        stackOnPlayer: Outputs.stackOnPlayer,
        stackOnYou: Outputs.stackOnYou,
      },
    },
    {
      id: 'Seiryu Red Rush',
      type: 'Tether',
      netRegex: { source: 'Aka-No-Shiki', id: '0011' },
      alertText: (data, matches, output) => {
        // If targeted by two, skip.
        if (data.redRush?.includes(data.me))
          return;
        if (data.me === matches.target)
          return output.text!();
      },
      run: (data, matches) => (data.redRush ??= []).push(matches.target),
      outputStrings: {
        text: {
          en: 'Point Knockback Tether Outside',
          de: 'Rückstoß-Verbindung nach draußen zeigen',
          fr: 'Orientez les liens de poussée vers l\'extérieur',
          cn: '将击退连线指向场外',
          ko: '외곽으로 유도하기',
        },
      },
    },
    {
      id: 'Seiryu Kanabo',
      type: 'Tether',
      netRegex: { source: 'Iwa-No-Shiki', id: '0011' },
      condition: Conditions.targetIsYou(),
      suppressSeconds: 1,
      alarmText: (_data, _matches, output) => output.text!(),
      outputStrings: {
        text: {
          en: 'Point Cleave Tether Outside',
          de: 'Cleave nach draußen zeigen',
          fr: 'Orientez les liens de cleave vers l\'extérieur',
          cn: '将顺劈连线指向场外',
          ko: '선 구석으로 유도하기',
        },
      },
    },
    {
      id: 'Seiryu Handprint East',
      type: 'Ability',
      netRegex: { source: 'Yama-No-Shiki', id: '37E5', capture: false },
      response: Responses.goEast(),
    },
    {
      id: 'Seiryu Handprint West',
      type: 'Ability',
      netRegex: { source: 'Yama-No-Shiki', id: '37E6', capture: false },
      response: Responses.goWest(),
    },
  ],
  timelineReplace: [
    {
      'locale': 'en',
      'replaceText': {
        'Onmyo Sigil / Serpent-Eye Sigil': 'Onmyo / Serpent-Eye Sigil',
        'Serpent-Eye Sigil / Onmyo Sigil': 'Serpent-Eye / Onmyo Sigil',
      },
    },
    {
      'locale': 'de',
      'replaceSync': {
        'Aka-No-Shiki': 'Aka no Shiki',
        'Ao-No-Shiki': 'Ao no Shiki',
        'Blue Orochi': 'blau(?:e|er|es|en) Orochi',
        'Iwa-No-Shiki': 'Iwa no Shiki',
        'Seiryu': 'Seiryu',
        'Ten-No-Shiki': 'Ten no Shiki',
        'Yama-No-Shiki': 'Yama no Shiki',
      },
      'replaceText': {
        '100-Tonze Swing': '100-Tonzen-Schwung',
        'Blue Bolt': 'Blauer Blitz',
        'Coursing River': 'Woge der Schlange',
        'Doro-No-Shiki': 'Doro no Shiki',
        'Dragon\'s Wake': 'Erwachen des Drachen',
        'Fifth Element': 'Fünftes Element',
        'Forbidden Arts': 'Verbotene Künste',
        'Force Of Nature': 'Naturgewalt',
        'Fortune-Blade Sigil': 'Glücksklingen-Siegel',
        'Handprint': 'Handabdruck',
        'Infirm Soul': 'Kraftlose Seele',
        'Kanabo': 'Kanabo',
        'Kuji-Kiri': 'Kuji-kiri',
        'Numa-No-Shiki': 'Numa no Shiki',
        'Onmyo Sigil': 'Onmyo-Siegel',
        'Red Rush': 'Roter Ansturm',
        'Serpent Ascending': 'Aufstieg der Schlange',
        'Serpent Descending': 'Niedergang der Schlange',
        'Serpent\'s Fang': 'Schlangengiftzahn',
        'Serpent-Eye Sigil': 'Siegel des Schlangenauges',
        'Strength Of Spirit': 'Stärke des Geistes',
        'Summon Shiki': 'Shiki-Beschwörung',
        'Yama-Kagura': 'Yamakagura',
      },
    },
    {
      'locale': 'fr',
      'replaceSync': {
        'Aka-No-Shiki': 'shiki écarlate',
        'Ao-No-Shiki': 'shiki céruléen',
        'Blue Orochi': 'orochi azur',
        'Iwa-No-Shiki': 'shiki rocailleux',
        'Seiryu': 'Seiryû',
        'Ten-No-Shiki': 'shiki céleste',
        'Yama-No-Shiki': 'shiki montagneux',
      },
      'replaceText': {
        '100-Tonze Swing': 'Swing de 100 tonz',
        'Blue Bolt': 'Percée bleue',
        'Coursing River': 'Vague de serpents',
        'Doro-No-Shiki': 'shiki fangeux',
        'Dragon\'s Wake': 'Ascension draconique',
        'Fifth Element': 'Cinq éléments',
        'Forbidden Arts': 'Lame interdite',
        'Force Of Nature': 'Main écrasante',
        'Fortune-Blade Sigil': 'Lame solaire',
        'Handprint': 'Main lourde',
        'Infirm Soul': 'Onde d\'amertume',
        'Kanabo': 'Massue démoniaque',
        'Kuji-Kiri': 'Kuji-kiri',
        'Numa-No-Shiki': 'shiki uligineux',
        'Onmyo Sigil': 'Onmyo',
        'Red Rush': 'Percée rouge',
        'Serpent Ascending': 'Dragon levant',
        'Serpent Descending': 'Serpent couchant',
        'Serpent\'s Fang': 'Dent de serpent',
        'Serpent-Eye Sigil': 'Œil de serpent',
        'Strength Of Spirit': 'Chakra',
        'Summon Shiki': 'Invocation de shiki',
        'Yama-Kagura': 'Yama-kagura',
      },
    },
    {
      'locale': 'ja',
      'replaceSync': {
        'Aka-No-Shiki': '紅の式鬼',
        'Ao-No-Shiki': '蒼の式鬼',
        'Blue Orochi': '青のオロチ',
        'Iwa-No-Shiki': '岩の式鬼',
        'Seiryu': '青龍',
        'Ten-No-Shiki': '天の式鬼',
        'Yama-No-Shiki': '山の式鬼',
      },
      'replaceText': {
        '100-Tonze Swing': '100トンズ・スイング',
        'Blue Bolt': '青の突進',
        'Coursing River': '蛇崩',
        'Doro-No-Shiki': '泥の式鬼',
        'Dragon\'s Wake': '雲蒸龍変',
        'Fifth Element': '陰陽五行',
        'Forbidden Arts': '刀禁呪',
        'Force Of Nature': '大圧殺',
        'Fortune-Blade Sigil': '陽の刀印',
        'Handprint': '圧殺掌',
        'Infirm Soul': '虚証弾',
        'Kanabo': '鬼に金棒',
        'Kuji-Kiri': '九字切り',
        'Numa-No-Shiki': '沼の式鬼',
        'Onmyo Sigil': '陰陽の印',
        'Red Rush': '赤の突進',
        'Serpent Ascending': '登り龍',
        'Serpent Descending': '降り蛇',
        'Serpent\'s Fang': '蛇牙',
        'Serpent-Eye Sigil': '蛇眼の印',
        'Strength Of Spirit': '霊気',
        'Summon Shiki': '式鬼召喚',
        'Yama-Kagura': '山神楽',
      },
    },
    {
      'locale': 'cn',
      'replaceSync': {
        'Aka-No-Shiki': '红之式鬼',
        'Ao-No-Shiki': '苍之式鬼',
        'Blue Orochi': '青之大蛇',
        'Iwa-No-Shiki': '岩之式鬼',
        'Seiryu': '青龙',
        'Ten-No-Shiki': '天之式鬼',
        'Yama-No-Shiki': '山之式鬼',
      },
      'replaceText': {
        '100-Tonze Swing': '百吨回转',
        'Blue Bolt': '青突进',
        'Coursing River': '蛇崩',
        'Doro-No-Shiki': '泥之式鬼',
        'Dragon\'s Wake': '云蒸龙变',
        'Fifth Element': '阴阳五行',
        'Forbidden Arts': '刀禁咒',
        'Force Of Nature': '大压杀',
        'Fortune-Blade Sigil': '阳之刀印',
        'Handprint': '压杀掌',
        'Infirm Soul': '虚证弹',
        'Kanabo': '如虎添翼',
        'Kuji-Kiri': '九字切',
        'Numa-No-Shiki': '沼之式鬼',
        'Onmyo Sigil': '阴阳之印',
        'Red Rush': '赤突进',
        'Serpent Ascending': '升龙',
        'Serpent Descending': '降蛇',
        'Serpent\'s Fang': '蛇牙',
        'Serpent-Eye Sigil': '蛇眼之印',
        'Strength Of Spirit': '灵气',
        'Summon Shiki': '式鬼召唤',
        'Yama-Kagura': '山神乐',
      },
    },
    {
      'locale': 'ko',
      'replaceSync': {
        'Aka-No-Shiki': '붉은 사역귀',
        'Ao-No-Shiki': '푸른 사역귀',
        'Blue Orochi': '푸른 이무기',
        'Iwa-No-Shiki': '바위 사역귀',
        'Seiryu': '청룡',
        'Ten-No-Shiki': '하늘 사역귀',
        'Yama-No-Shiki': '산 사역귀',
      },
      'replaceText': {
        '100-Tonze Swing': '100톤즈 휘두르기',
        'Blue Bolt': '푸른 돌진',
        'Coursing River': '뱀의 행진',
        'Doro-No-Shiki': '진흙 사역귀',
        'Dragon\'s Wake': '운증용변',
        'Fifth Element': '음양오행',
        'Forbidden Arts': '금단의 주술검',
        'Force Of Nature': '대압살',
        'Fortune-Blade Sigil': '양의 칼',
        'Handprint': '압살장',
        'Infirm Soul': '허증탄',
        'Kanabo': '도깨비 방망이',
        'Kuji-Kiri': '구자호신법',
        'Numa-No-Shiki': '늪 사역귀',
        'Onmyo Sigil': '음양의 인',
        'Red Rush': '붉은 돌진',
        'Serpent Ascending': '승천하는 용',
        'Serpent Descending': '강림하는 뱀',
        'Serpent\'s Fang': '뱀송곳니',
        'Serpent-Eye Sigil': '뱀눈의 인',
        'Strength Of Spirit': '영기',
        'Summon Shiki': '사역귀 소환',
        'Yama-Kagura': '산타령',
      },
    },
  ],
};

export default triggerSet;
