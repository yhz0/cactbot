import Conditions from '../../../../../resources/conditions';
import { Responses } from '../../../../../resources/responses';
import ZoneId from '../../../../../resources/zone_id';
import { RaidbossData } from '../../../../../types/data';
import { TriggerSet } from '../../../../../types/trigger';

// TODO: Big Cheese Bomb directions?
// TODO: Big Cheese Bombs are only spawned once, is it possible the fast one is always the same id?

export interface Data extends RaidbossData {
  smileyFace: boolean;
  frownyFace: boolean;
}

const triggerSet: TriggerSet<Data> = {
  zoneId: ZoneId.Smileton,
  timelineFile: 'smileton.txt',
  initData: () => {
    return {
      smileyFace: false,
      frownyFace: false,
    };
  },
  triggers: [
    {
      id: 'Smileton Face Off My Lawn',
      type: 'StartsUsing',
      netRegex: { id: '673E', source: 'Face', capture: false },
      infoText: (_data, _matches, output) => output.text!(),
      outputStrings: {
        text: {
          en: 'Knockback (one row)',
          de: 'Rückstoß (eine Reihe)',
          fr: 'Poussée (une ligne)',
          ja: '一行ノックバック',
          cn: '击退 (向后一行)',
          ko: '넉백 (한 줄)',
        },
      },
    },
    {
      id: 'Smileton Face Temper\'s Flare',
      type: 'StartsUsing',
      netRegex: { id: '6743', source: 'Face', capture: false },
      response: Responses.aoe(),
    },
    {
      id: 'Smileton Face Heart on Fire IV',
      type: 'StartsUsing',
      netRegex: { id: '6742', source: 'Face' },
      response: Responses.tankBuster(),
    },
    {
      id: 'Smileton Face Smiley Face Gain',
      type: 'GainsEffect',
      netRegex: { effectId: 'ACB', source: 'Relatively Small Face' },
      condition: Conditions.targetIsYou(),
      run: (data) => data.smileyFace = true,
    },
    {
      id: 'Smileton Face Smiley Face Lose',
      type: 'LosesEffect',
      netRegex: { effectId: 'ACB', source: 'Relatively Small Face' },
      condition: Conditions.targetIsYou(),
      run: (data) => data.smileyFace = false,
    },
    {
      id: 'Smileton Face Frowny Face Gain',
      type: 'GainsEffect',
      netRegex: { effectId: 'ACC', source: 'Relatively Small Face' },
      condition: Conditions.targetIsYou(),
      run: (data) => data.frownyFace = true,
    },
    {
      id: 'Smileton Face Frowny Face Lose',
      type: 'LosesEffect',
      netRegex: { effectId: 'ACC', source: 'Relatively Small Face' },
      condition: Conditions.targetIsYou(),
      run: (data) => data.frownyFace = false,
    },
    {
      id: 'Smileton Face MixedFeelings',
      type: 'StartsUsing',
      netRegex: { id: '6738', source: 'Face', capture: false },
      suppressSeconds: 1,
      infoText: (data, _matches, output) => {
        if (data.smileyFace)
          return output.frowny!();
        if (data.frownyFace)
          return output.smiley!();
        return output.either!();
      },
      outputStrings: {
        smiley: {
          en: 'Get hit by blue smiley',
          de: 'Von der blauen Grinsen treffen lassen',
          fr: 'Faites-vous toucher par un sourir bleu',
          ja: 'ニコニコ(青)',
          cn: '吃蓝脸AOE',
          ko: '파란 얼굴이 쏘는 레이저 맞기',
        },
        frowny: {
          en: 'Get hit by red frowny',
          de: 'Von dem roten Grimigen treffen lassen',
          fr: 'Faites-vous toucher par un visage en colère rouge',
          ja: 'ムカムカ(赤)',
          cn: '吃红脸AOE',
          ko: '빨간 얼굴이 쏘는 레이저 맞기',
        },
        either: {
          en: 'Get hit by red or blue face',
          de: 'Von irgendeiner Farbe treffen lassen',
          fr: 'Faites-vous toucher par une couleur',
          ja: '青か赤の攻撃を受ける',
          cn: '吃任意颜色脸的AOE',
          ko: '아무 색의 레이저 맞기',
        },
      },
    },
    {
      id: 'Smileton Frameworker Circular Saw',
      type: 'StartsUsing',
      netRegex: { id: '6745', source: 'Frameworker', capture: false },
      response: Responses.aoe(),
    },
    {
      id: 'Smileton Frameworker Steel Beam',
      type: 'StartsUsing',
      netRegex: { id: '6744', source: 'Frameworker' },
      response: Responses.tankBuster(),
    },
    {
      id: 'Smileton The Big Cheese Violent Discharge',
      type: 'StartsUsing',
      netRegex: { id: '6752', source: 'The Big Cheese', capture: false },
      response: Responses.aoe(),
    },
    {
      id: 'Smileton The Big Cheese Right Disassembler',
      type: 'StartsUsing',
      netRegex: { id: '674F', source: 'The Big Cheese', capture: false },
      response: Responses.goRight(),
    },
    {
      id: 'Smileton The Big Cheese Left Disassembler',
      type: 'StartsUsing',
      netRegex: { id: '6750', source: 'The Big Cheese', capture: false },
      response: Responses.goLeft(),
    },
    {
      id: 'Smileton The Big Cheese Piercing Missile',
      type: 'StartsUsing',
      netRegex: { id: '6751', source: 'The Big Cheese' },
      response: Responses.tankBuster(),
    },
    {
      id: 'Smileton The Big Cheese Leveling Missile',
      type: 'StartsUsing',
      netRegex: { id: '6755', source: 'The Big Cheese' },
      condition: Conditions.targetIsYou(),
      response: Responses.spread(),
    },
    {
      id: 'Smileton The Big Cheese Electric Arc',
      type: 'StartsUsing',
      netRegex: { id: '6753', source: 'The Big Cheese' },
      response: Responses.stackMarkerOn(),
    },
  ],
  timelineReplace: [
    {
      'locale': 'en',
      'replaceText': {
        'Left Disassembler/Right Disassembler': 'Left/Right Disassembler',
      },
    },
    {
      'locale': 'de',
      'replaceSync': {
        '(?<!Excavation )Bomb': 'Bombe',
        'Excavation Bomb': 'Sprengladung',
        '(?<!Small )Face': 'Fratze',
        'Frameworker': 'Rahmenwerker',
        'Printed Worker': 'Druckwerker',
        'Relatively Small Face': 'Klein(?:e|er|es|en) Fratze',
        'Smileport': 'Tor des Breiten Lächelns',
        'The Big Cheese': 'Bittelächeln',
        'The Frame': 'Hauptrahmen',
        'The Welcome Wheel': 'Herzlich-Willkommen-Halle',
      },
      'replaceText': {
        'Circular Saw': 'Rundstreich',
        'Dispense Explosives': 'Schusslegung',
        'Electric Arc': 'Elektrischer Bogen',
        'Excavated': 'Schusssprengung',
        'Explosive Power': 'Schusszündung',
        'Explosives Distribution': 'Bombenladung',
        'Heart on Fire IV': 'Flackerndes Feuka',
        'Iron Kiss': 'Eiserner Kuss',
        'Leap Forward': 'Vorwärtssprung',
        'Left Disassembler': 'Linker Demontier-Arm',
        'Leveling Missile': 'Planierrakete',
        'Lines of Fire': 'Kommando Feuer',
        'Mixed Feelings': 'Fluch des Fressens',
        'Off My Lawn': 'Hinausdrängen',
        'Omnidimensional Onslaught': 'Omnidimensionale Offensive',
        'Piercing Missile': 'Förderrakete',
        'Print Workers': 'Werkerdruck',
        'Right Disassembler': 'Rechter Demontier-Arm',
        'Steel Beam': 'Frontalstreich',
        'Temper\'s Flare': 'Flackerndes Flare',
        'Temper, Temper': 'Flackernde Flamme',
        'Upside Down': 'Kommando Drehen',
        'Violent Discharge': 'Heftige Entladung',
      },
    },
    {
      'locale': 'fr',
      'replaceSync': {
        '(?<!Excavation )Bomb': 'bombe',
        'Excavation Bomb': 'mine de forage',
        '(?<!Small )Face': 'Visage Imperturbable',
        'Frameworker': 'ouvrier modeleur',
        'Printed Worker': 'ouvrier manufacturé',
        'Relatively Small Face': 'Visage Changeant',
        'Smileport': 'Porte de la Gaieté',
        'The Big Cheese': 'Béatotron',
        'The Frame': 'Matrice du Bonheur',
        'The Welcome Wheel': 'Place de l\'Hospitalité',
      },
      'replaceText': {
        'Circular Saw': 'Assaut tailladant omnidirectionnel',
        'Dispense Explosives': 'Explosifs de forage',
        'Electric Arc': 'Arc électrique',
        'Excavated': 'Mine de forage',
        'Explosive Power': 'Pose de mines de forage',
        'Explosives Distribution': 'Distributeur de charges explosives',
        'Heart on Fire IV': 'Giga Feu crépitant',
        'Iron Kiss': 'Charge explosive',
        'Leap Forward': 'Assaut plongeant avant',
        'Left Disassembler/Right Disassembler': 'Atomiseur gauche/droit',
        'Leveling Missile': 'Missile de nivellement',
        'Lines of Fire': 'Extériorisation',
        'Mixed Feelings': 'Humeur instable',
        'Off My Lawn': 'Bourrade amicale',
        'Omnidimensional Onslaught': 'Assaut omnidirectionnel en deux temps',
        'Piercing Missile': 'Missiles foreurs',
        'Print Workers': 'Manufacture d\'ouvrier',
        'Steel Beam': 'Assaut tailladant avant',
        'Temper\'s Flare': 'Brasier crépitant',
        'Temper, Temper': 'Flammes crépitantes',
        'Upside Down': 'Saute d\'humeur',
        'Violent Discharge': 'Décharge forcée',
      },
    },
    {
      'locale': 'ja',
      'replaceSync': {
        '(?<!Excavation )Bomb': '爆弾',
        'Excavation Bomb': '採掘爆弾',
        '(?<!Small )Face': 'フェイス',
        'Frameworker': 'フレームワーカー',
        'Printed Worker': 'プリンテッドワーカー',
        'Relatively Small Face': 'リトルフェイス',
        'Smileport': '笑顔あふれる正門',
        'The Big Cheese': 'ビッグチーズ',
        'The Frame': 'ビッグチーズ',
        'The Welcome Wheel': '大歓迎の玄関',
      },
      'replaceText': {
        'Circular Saw': '全体斬攻撃',
        'Dispense Explosives': '採掘爆弾設置',
        'Electric Arc': 'アーク放電',
        'Excavated': '採掘爆弾爆発',
        'Explosive Power': '採掘爆弾起爆',
        'Explosives Distribution': '爆弾供給',
        'Heart on Fire IV': 'メラメラファイジャ',
        'Iron Kiss': '着弾',
        'Leap Forward': '前方跳躍攻撃',
        'Left Disassembler': '左腕分解砲',
        'Leveling Missile': '整地ミサイル',
        'Lines of Fire': '斉射の号令',
        'Mixed Feelings': 'ペロペロの呪い',
        'Off My Lawn': '押し出し',
        'Omnidimensional Onslaught': '連続多方向攻撃',
        'Piercing Missile': '採掘ミサイル',
        'Print Workers': 'ワーカー・プリントアウト',
        'Right Disassembler': '右腕分解砲',
        'Steel Beam': '前方斬攻撃',
        'Temper\'s Flare': 'メラメラフレア',
        'Temper, Temper': 'メラメラフレイム',
        'Upside Down': '回転の号令',
        'Violent Discharge': '強制放電',
      },
    },
    {
      'locale': 'cn',
      'replaceSync': {
        '(?<!Excavation )Bomb': '炸弹',
        'Excavation Bomb': '采掘炸弹',
        '(?<!Small )Face': '面像',
        'Frameworker': '框架工作员',
        'Printed Worker': '打印出的工作员',
        'Relatively Small Face': '小面像',
        'Smileport': '面带微笑的正门',
        'The Big Cheese': '大笑脸',
        'The Frame': '大笑脸',
        'The Welcome Wheel': '热烈欢迎的门厅',
      },
      'replaceText': {
        'Circular Saw': '全体斩击',
        'Dispense Explosives': '设置采掘炸弹',
        'Electric Arc': '弧状放电',
        'Excavated': '采掘炸弹爆炸',
        'Explosive Power': '引爆采掘炸弹',
        'Explosives Distribution': '炸弹供给',
        'Heart on Fire IV': '熊熊炽炎',
        'Iron Kiss': '钢铁之吻',
        'Leap Forward': '前方跃进攻击',
        'Left Disassembler': '左腕分解炮',
        'Leveling Missile': '整地导弹',
        'Lines of Fire': '齐射号令',
        'Mixed Feelings': '喜怒无常',
        'Off My Lawn': '击退',
        'Omnidimensional Onslaught': '连续多方向攻击',
        'Piercing Missile': '采掘导弹',
        'Print Workers': '生成工作员',
        'Right Disassembler': '右腕分解炮',
        'Steel Beam': '前方斩击',
        'Temper\'s Flare': '熊熊核爆',
        'Temper, Temper': '熊熊烈焰',
        'Upside Down': '回旋号令',
        'Violent Discharge': '强制放电',
      },
    },
    {
      'locale': 'ko',
      'replaceSync': {
        'Excavation Bomb': '채굴 폭탄',
        'Frameworker': '프레임워커',
        'Printed Worker': '출력된 워커',
        'Relatively Small Face': '작은 얼굴',
        'Smileport': '웃음이 넘치는 정문',
        'The Big Cheese': '빅치즈',
        'The Frame': '빅치즈',
        'The Welcome Wheel': '대환영 현관',
        '(?<!Excavation )Bomb': '폭탄',
        '(?<!Small )Face': '얼굴',
      },
      'replaceText': {
        'Circular Saw': '전체 베기 공격',
        'Dispense Explosives': '채굴 폭탄 설치',
        'Electric Arc': '아크 방전',
        'Excavated': '채굴 폭탄 폭발',
        'Explosive Power': '채굴 폭탄 기폭',
        'Explosives Distribution': '폭탄 공급',
        'Heart on Fire IV': '이글이글 파이쟈',
        'Iron Kiss': '착탄',
        'Leap Forward': '전방 도약 공격',
        'Left Disassembler': '왼팔 분해포',
        'Leveling Missile': '땅고르기 미사일',
        'Lines of Fire': '일제 사격 호령',
        'Mixed Feelings': '메롱메롱 저주',
        'Off My Lawn': '밀치기',
        'Omnidimensional Onslaught': '연속 다방향 공격',
        'Piercing Missile': '채굴 미사일',
        'Print Workers': '워커 출력',
        'Right Disassembler': '오른팔 분해포',
        'Steel Beam': '전방 베기 공격',
        'Temper\'s Flare': '이글이글 플레어',
        'Temper, Temper': '이글이글 플레임',
        'Upside Down': '회전 호령',
        'Violent Discharge': '강제 방전',
      },
    },
  ],
};

export default triggerSet;
