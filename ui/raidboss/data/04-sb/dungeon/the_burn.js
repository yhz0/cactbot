'use strict';

[{
  zoneId: ZoneId.TheBurn,
  timelineFile: 'the_burn.txt',
  triggers: [
    {
      id: 'The Burn Crystal Needle',
      netRegex: NetRegexes.startsUsing({ id: '3193', source: 'Hedetet' }),
      netRegexDe: NetRegexes.startsUsing({ id: '3193', source: 'Hedetet' }),
      netRegexFr: NetRegexes.startsUsing({ id: '3193', source: 'Hedetet' }),
      netRegexJa: NetRegexes.startsUsing({ id: '3193', source: 'ヘデテト' }),
      netRegexCn: NetRegexes.startsUsing({ id: '3193', source: '赫德提特' }),
      netRegexKo: NetRegexes.startsUsing({ id: '3193', source: '헤데테트' }),
      condition: Conditions.caresAboutPhysical(),
      response: Responses.tankBuster(),
    },
    {
      id: 'The Burn Hailfire',
      netRegex: NetRegexes.headMarker({ id: '0002', capture: false }),
      condition: (data) => !data.hedetet,
      infoText: {
        en: 'Hide behind crystal',
        de: 'Hinter dem Kristall verstecken',
        fr: 'Cachez-vous derrière le cristal',
        ja: '水晶の後ろに',
        cn: '躲在水晶后',
      },
    },
    {
      id: 'The Burn Shardstrike',
      netRegex: NetRegexes.headMarker({ id: '0060' }),
      condition: Conditions.targetIsYou(),
      alertText: {
        en: 'Spread + Avoid Crystals',
        de: 'Verteilen + Kristall meiden',
        fr: 'Écartez-vous & évitez les cristaux',
        ja: '散開 + 水晶に避け',
        cn: '散开并远离水晶',
      },
    },
    {
      id: 'The Burn Crystal Shardfall',
      netRegex: NetRegexes.startsUsing({ id: '3191', source: 'Hedetet', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ id: '3191', source: 'Hedetet', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ id: '3191', source: 'Hedetet', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ id: '3191', source: 'ヘデテト', capture: false }),
      netRegexCn: NetRegexes.startsUsing({ id: '3191', source: '赫德提特', capture: false }),
      netRegexKo: NetRegexes.startsUsing({ id: '3191', source: '헤데테트', capture: false }),
      infoText: {
        en: 'Hide behind crystal',
        de: 'Hinter dem Kristall verstecken',
        fr: 'Cachez-vous derrière le cristal',
        ja: '水晶の後ろに',
        cn: '躲在水晶后',
      },
    },
    {
      // This has a visible donut AoE, but the user must be inside the target ring to be safe.
      id: 'The Burn Crystal Dissonance',
      netRegex: NetRegexes.startsUsing({ id: '3192', source: 'Hedetet', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ id: '3192', source: 'Hedetet', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ id: '3192', source: 'Hedetet', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ id: '3192', source: 'ヘデテト', capture: false }),
      netRegexCn: NetRegexes.startsUsing({ id: '3192', source: '赫德提特', capture: false }),
      netRegexKo: NetRegexes.startsUsing({ id: '3192', source: '헤데테트', capture: false }),
      response: Responses.getUnder(),
    },
    {
      // Head marker 0002 is used in both the first two encounters.
      id: 'The Burn Dead Hedetet',
      netRegex: NetRegexes.ability({ id: '368', source: 'Defective Drone', capture: false }),
      netRegexDe: NetRegexes.ability({ id: '368', source: 'Defekt(?:e|er|es|en) Drohne', capture: false }),
      netRegexFr: NetRegexes.ability({ id: '368', source: 'Drone Défectueux', capture: false }),
      netRegexJa: NetRegexes.ability({ id: '368', source: 'デフェクティブ・ドローン', capture: false }),
      netRegexCn: NetRegexes.ability({ id: '368', source: '次品无人机', capture: false }),
      netRegexKo: NetRegexes.ability({ id: '368', source: '고장난 무인기', capture: false }),
      condition: (data) => !data.hedetet,
      run: (data) => data.hedetet = true,
    },
    {
      id: 'The Burn Aetherochemical Flame',
      netRegex: NetRegexes.startsUsing({ id: '2D73', source: 'Defective Drone', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ id: '2D73', source: 'Defekt(?:e|er|es|en) Drohne', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ id: '2D73', source: 'Drone Défectueux', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ id: '2D73', source: 'デフェクティブ・ドローン', capture: false }),
      netRegexCn: NetRegexes.startsUsing({ id: '2D73', source: '次品无人机', capture: false }),
      netRegexKo: NetRegexes.startsUsing({ id: '2D73', source: '고장난 무인기', capture: false }),
      condition: Conditions.caresAboutAOE(),
      response: Responses.aoe(),
    },
    {
      id: 'The Burn Aetherochemical Coil',
      netRegex: NetRegexes.startsUsing({ id: '2D72', source: 'Defective Drone' }),
      netRegexDe: NetRegexes.startsUsing({ id: '2D72', source: 'Defekt(?:e|er|es|en) Drohne' }),
      netRegexFr: NetRegexes.startsUsing({ id: '2D72', source: 'Drone Défectueux' }),
      netRegexJa: NetRegexes.startsUsing({ id: '2D72', source: 'デフェクティブ・ドローン' }),
      netRegexCn: NetRegexes.startsUsing({ id: '2D72', source: '次品无人机' }),
      netRegexKo: NetRegexes.startsUsing({ id: '2D72', source: '고장난 무인기' }),
      condition: Conditions.caresAboutPhysical(),
      response: Responses.tankBuster(),
    },
    {
      id: 'The Burn Aetherochemical Residue',
      netRegex: NetRegexes.headMarker({ id: '0002' }),
      condition: (data, matches) => data.me == matches.target && data.hedetet,
      infoText: {
        en: 'Puddle on YOU',
        de: 'Fläche auf DIR',
        fr: 'Zone au sol sur VOUS',
        ja: '自分に粘液',
        cn: '圈圈点名',
      },
    },
    {
      // The NPC here is Mining Drone.
      id: 'The Burn Throttle',
      netRegex: NetRegexes.addedCombatantFull({ npcNameId: '7670', capture: false }),
      suppressSeconds: 5,
      infoText: {
        en: 'In line with smoking drone',
        de: 'In einer Linie mit der rauchenden Drohne stellen',
        fr: 'En ligne avec le drone endommagé',
        ja: 'ドローンの直線に',
        cn: '站在冒烟小怪直线上',
      },
    },
    {
      id: 'The Burn Adit Driver',
      netRegex: NetRegexes.startsUsing({ id: '2D78', source: 'Rock Biter', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ id: '2D78', source: 'Felsbeißer', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ id: '2D78', source: 'Trancheur De Pierre', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ id: '2D78', source: 'ロックカッター', capture: false }),
      netRegexCn: NetRegexes.startsUsing({ id: '2D78', source: '石刃', capture: false }),
      netRegexKo: NetRegexes.startsUsing({ id: '2D78', source: '암석 절단날', capture: false }),
      suppressSeconds: 5,
      infoText: {
        en: 'Avoid Rock Biters',
        de: 'Felsbeißer meiden',
        fr: 'Évitez le trancheur de pierre',
        ja: 'ロックカッターに避け',
        cn: '躲开电锯',
      },
    },
    {
      id: 'The Burn Rime Wreath',
      netRegex: NetRegexes.startsUsing({ id: '314B', source: 'Mist Dragon', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ id: '314B', source: 'Nebeldrache', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ id: '314B', source: 'Dragon Des Brumes', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ id: '314B', source: 'ミストドラゴン', capture: false }),
      netRegexCn: NetRegexes.startsUsing({ id: '314B', source: '雾龙', capture: false }),
      netRegexKo: NetRegexes.startsUsing({ id: '314B', source: '안개 드래곤', capture: false }),
      condition: Conditions.caresAboutAOE(),
      response: Responses.aoe(),
    },
    {
      // Also handles Chilling Aspiration, which is randomly targeted.
      id: 'The Burn Frost Breath',
      netRegex: NetRegexes.headMarker({ id: ['001A', '000E'] }),
      alertText: function(data, matches) {
        if (data.me === matches.target) {
          return {
            en: 'Puddle + cleave on YOU',
            de: 'Fläche + Cleave auf DIR',
            fr: 'Zone au sol + Cleave sur VOUS',
            ja: '自分に沼 + フロストブレス',
            cn: '圈圈+吐息点名',
          };
        }
        return {
          en: 'Avoid marker cone',
          de: 'Kegel-Markierung ausweichen',
          fr: 'Évitez le marqueur de cône',
          ja: 'マークに避け',
          cn: '远离锥形点名',
        };
      },
    },
    {
      id: 'The Burn Fog Plume',
      netRegex: NetRegexes.startsUsing({ id: '3144', source: 'Mist Dragon', capture: false }),
      netRegexDe: NetRegexes.startsUsing({ id: '3144', source: 'Nebeldrache', capture: false }),
      netRegexFr: NetRegexes.startsUsing({ id: '3144', source: 'Dragon Des Brumes', capture: false }),
      netRegexJa: NetRegexes.startsUsing({ id: '3144', source: 'ミストドラゴン', capture: false }),
      netRegexCn: NetRegexes.startsUsing({ id: '3144', source: '雾龙', capture: false }),
      netRegexKo: NetRegexes.startsUsing({ id: '3144', source: '안개 드래곤', capture: false }),
      suppressSeconds: 5,
      infoText: {
        en: 'Bait Star Explosions',
        de: 'Stern Explosion ködern',
        fr: 'Déposez les explosions d\'étoiles',
        ja: '放射霧を誘導',
        cn: '诱导放射雾',
      },
    },
  ],
  timelineReplace: [
    {
      'locale': 'de',
      'replaceSync': {
        'The Scorpion\'s Den': 'Nistplatz der Hedetet',
        'The Gamma Segregate': 'Gamma-Isolationsbereich',
        'The Aspersory': 'Nebelhort',
        'Rock Biter': 'Felsbeißer',
        'Mist Dragon': 'Nebeldrache',
        'Dim Crystal': 'trüber Kristall',
        'Defective Drone': 'defekte Drohne',
        'Hedetet': 'Hedetet',
      },
      'replaceText': {
        'Vaporize': 'Vaporisieren',
        'Shardstrike': 'Splitterschlag',
        'Shardfall': 'Splitterregen',
        'Rime Wreath': 'Frostkalter Reif',
        'Resonant Frequency': 'Resonanzfrequenz',
        'Hailfire': 'Hagelfeuer',
        'Full Throttle': 'Vollgas',
        'Frost Breath': 'Frostiger Atem',
        'Fog Plume': 'Nebelschwaden',
        'Dissonance': 'Dissonanz',
        'Deep Fog': 'Dichter Nebel',
        'Crystalline Fracture': 'Kristallfraktur',
        'Crystal Needle': 'Kristallnadel',
        'Cold Fog': 'Eisiger Nebel',
        'Chilling Aspiration': 'Nebelatem',
        'Cauterize': 'Kauterisieren',
        'Aetherochemical Residue': 'Ätherochemischer Rückstand',
        'Aetherochemical Flame': 'Ätherochemische Flamme',
        'Aetherochemical Coil': 'Ätherochemische Windung',
        'Adit Driver': 'Steinbohrer',
      },
    },
    {
      'locale': 'fr',
      'replaceSync': {
        'The Scorpion\'s Den': 'Nid du scorpion',
        'The Gamma Segregate': 'Ancien répartiteur gamma',
        'The Aspersory': 'Plateau des Brumes',
        'Rock Biter': 'Trancheur de pierre',
        'Mist Dragon': 'Dragon des brumes',
        'Dim Crystal': 'Cristal décoloré',
        'Defective Drone': 'Drone défectueux',
        'Hedetet': 'Hedetet',
      },
      'replaceText': {
        'Vaporize': 'Vaporisation',
        'Shardstrike': 'Coup d\'éclats',
        'Shardfall': 'Pluie d\'éclats',
        'Rime Wreath': 'Enveloppe de givre',
        'Resonant Frequency': 'Explosion résonante',
        'Hailfire': 'Feu grêleux',
        'Full Throttle': 'Cadence infernale',
        'Frost Breath': 'Souffle glacé',
        'Fog Plume': 'Panache brumeux',
        'Dissonance': 'Dissonance',
        'Deep Fog': 'Brouillard épais',
        'Crystalline Fracture': 'Fragmentation cristalline',
        'Crystal Needle': 'Aiguille cristalline',
        'Cold Fog': 'Brume glaciale',
        'Chilling Aspiration': 'Souffle de brume',
        'Cauterize': 'Cautérisation',
        'Aetherochemical Residue': 'Mucus magismologique',
        'Aetherochemical Flame': 'Flammes magismologiques',
        'Aetherochemical Coil': 'Roue magismologique',
        'Adit Driver': 'Sciage de pierre',
      },
    },
    {
      'locale': 'ja',
      'replaceSync': {
        'The Scorpion\'s Den': 'ヘデテトの縄張り',
        'The Gamma Segregate': '旧ガンマ分離区',
        'The Aspersory': '霧の皿',
        'Rock Biter': 'ロックカッター',
        'Mist Dragon': 'ミストドラゴン',
        'Dim Crystal': '色あせたクリスタル',
        'Defective Drone': 'デフェクティブ・ドローン',
        'Hedetet': 'ヘデテト',
      },
      'replaceText': {
        'Vaporize': '霧散',
        'Shardstrike': 'シャードストライク',
        'Shardfall': 'シャードフォール',
        'Rime Wreath': 'ライムリリース',
        'Resonant Frequency': '共振炸裂',
        'Hailfire': 'ヘイルファイア',
        'Full Throttle': 'フルスロットル',
        'Frost Breath': 'フロストブレス',
        'Fog Plume': '放射霧',
        'Dissonance': 'ディソナンス',
        'Deep Fog': '濃霧',
        'Crystalline Fracture': '水晶剥落',
        'Crystal Needle': 'クリスタルニードル',
        'Cold Fog': '冷たい霧',
        'Chilling Aspiration': 'ミストブレス',
        'Cauterize': 'カータライズ',
        'Aetherochemical Residue': '魔科学粘液',
        'Aetherochemical Flame': '魔科学フレイム',
        'Aetherochemical Coil': '魔科学ホイール',
        'Adit Driver': '削岩',
      },
    },
    {
      'locale': 'cn',
      'replaceSync': {
        'The Scorpion\'s Den': '赫德提特的领地',
        'The Gamma Segregate': '伽马隔离区',
        'The Aspersory': '雾碟',
        'Rock Biter': '石刃',
        'Mist Dragon': '雾龙',
        'Dim Crystal': '褪色水晶',
        'Defective Drone': '次品无人机',
        'Hedetet': '赫德提特',
      },
      'replaceText': {
        'Vaporize': '雾散',
        'Shardstrike': '碎片打击',
        'Shardfall': '碎片脱落',
        'Rime Wreath': '白霜环绕',
        'Resonant Frequency': '共振炸裂',
        'Hailfire': '冰雹发射',
        'Full Throttle': '全力轰油起步',
        'Frost Breath': '寒霜吐息',
        'Fog Plume': '放射雾',
        'Dissonance': '不和谐音',
        'Deep Fog': '浓雾',
        'Crystalline Fracture': '水晶剥落',
        'Crystal Needle': '水晶针',
        'Cold Fog': '彻骨雾寒',
        'Chilling Aspiration': '迷雾吐息',
        'Cauterize': '低温俯冲',
        'Aetherochemical Residue': '魔科学粘液',
        'Aetherochemical Flame': '魔科学烈焰',
        'Aetherochemical Coil': '魔科学车轮',
        'Adit Driver': '削岩',
      },
    },
    {
      'locale': 'ko',
      'replaceSync': {
        'The Scorpion\'s Den': '헤데테트의 영역',
        'The Gamma Segregate': '구 감마 분리구역',
        'The Aspersory': '안개접시',
        'Rock Biter': '암석 절단날',
        'Mist Dragon': '안개 드래곤',
        'Dim Crystal': '빛바랜 크리스탈',
        'Defective Drone': '고장난 무인기',
        'Hedetet': '헤데테트',
      },
      'replaceText': {
        'Vaporize': '흩어지는 안개',
        'Shardstrike': '샤드 스트라이크',
        'Shardfall': '샤드 낙하',
        'Rime Wreath': '분노의 서릿발',
        'Resonant Frequency': '공진 작렬',
        'Hailfire': '우박 발사',
        'Full Throttle': '초고속 주행',
        'Frost Breath': '서리 숨결',
        'Fog Plume': '안개 방사',
        'Dissonance': '충돌',
        'Deep Fog': '짙은 안개',
        'Crystalline Fracture': '수정 조각',
        'Crystal Needle': '크리스탈 바늘',
        'Cold Fog': '차가운 안개',
        'Chilling Aspiration': '안개 숨결',
        'Cauterize': '인두질',
        'Aetherochemical Residue': '마과학 점액',
        'Aetherochemical Flame': '마과학 불꽃',
        'Aetherochemical Coil': '마과학 톱니바퀴',
        'Adit Driver': '암석 절단',
      },
    },
  ],
}];
