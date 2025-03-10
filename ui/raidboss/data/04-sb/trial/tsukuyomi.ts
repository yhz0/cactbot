import { Responses } from '../../../../../resources/responses';
import ZoneId from '../../../../../resources/zone_id';
import { RaidbossData } from '../../../../../types/data';
import { TriggerSet } from '../../../../../types/trigger';

export type Data = RaidbossData;

// Tsukuyomi Normal
const triggerSet: TriggerSet<Data> = {
  zoneId: ZoneId.CastrumFluminis,
  timelineFile: 'tsukuyomi.txt',
  triggers: [
    {
      id: 'Tsukuyomi Torment Unto Death',
      type: 'StartsUsing',
      netRegex: { id: '2BE3', source: 'Tsukuyomi' },
      response: Responses.tankCleave(),
    },
    {
      id: 'Tsukuyomi Reprimand',
      type: 'StartsUsing',
      netRegex: { id: '2BE2', source: 'Tsukuyomi', capture: false },
      response: Responses.aoe(),
    },
    {
      id: 'Tsukuyomi Midnight Haze',
      type: 'AddedCombatant',
      netRegex: { npcNameId: '7230', capture: false },
      response: Responses.killAdds(),
    },
    {
      id: 'Tsukuyomi Lead Of The Underworld',
      type: 'StartsUsing',
      netRegex: { id: '2BE6', source: 'Tsukuyomi' },
      alertText: (data, matches, output) => {
        if (data.me === matches.target)
          return output.lineStackOnYou!();
        return output.lineStackOn!({ player: data.ShortName(matches.target) });
      },
      outputStrings: {
        lineStackOnYou: {
          en: 'Line Stack on YOU',
          de: 'Linien Stack auf DIR',
          fr: 'Package en ligne sur VOUS',
          ja: '直線頭割り',
          cn: '直线分摊点名',
          ko: '직선 쉐어 대상자',
        },
        lineStackOn: {
          en: 'Line Stack on ${player}',
          de: 'Linien Stack auf ${player}',
          fr: 'Package en ligne sur ${player}',
          ja: '${player}に直線頭割り',
          cn: '直线分摊点${player}',
          ko: '${player} 직선 쉐어',
        },
      },
    },
    {
      id: 'Tsukuyomi Nightbloom',
      type: 'StartsUsing',
      netRegex: { id: '2CB0', source: 'Tsukuyomi', capture: false },
      response: Responses.aoe(),
    },
    {
      id: 'Tsukuyomi Lunacy',
      type: 'HeadMarker',
      netRegex: { id: '003E' },
      response: Responses.stackMarkerOn(),
    },
    {
      id: 'Tsukuyomi Moonlit Debuff',
      type: 'GainsEffect',
      netRegex: { effectId: '602' },
      condition: (data, matches) => {
        if (matches.target !== data.me)
          return false;
        return parseInt(matches.count) >= 4;
      },
      alertText: (_data, _matches, output) => output.text!(),
      outputStrings: {
        text: {
          en: 'Move to Black!',
          de: 'In\'s schwarze laufen!',
          fr: 'Allez en zone noire !',
          ja: '新月に！',
          cn: '踩黑色！',
          ko: '검정색으로 이동!',
        },
      },
    },
    {
      id: 'Tsukuyomi Moonshadowed Debuff',
      type: 'GainsEffect',
      netRegex: { effectId: '603' },
      condition: (data, matches) => {
        if (matches.target !== data.me)
          return false;
        return parseInt(matches.count) >= 4;
      },
      alertText: (_data, _matches, output) => output.text!(),
      outputStrings: {
        text: {
          en: 'Move to White!',
          de: 'In\'s weiße laufen!',
          fr: 'Allez en zone blanche !',
          ja: '満月に！',
          cn: '踩白色！',
          ko: '흰색으로 이동!',
        },
      },
    },
    {
      id: 'Tsukuyomi Dance Of The Dead',
      // 2BFD is an unnamed ability that happens ~5 seconds before Dance Of The Dead.
      // Dance Of The Dead has no castbar.
      type: 'Ability',
      netRegex: { id: '2BFD', source: 'Tsukuyomi', capture: false },
      response: Responses.aoe(),
    },
  ],
  timelineReplace: [
    {
      'locale': 'en',
      'replaceText': {
        'Bright Blade/Dark Blade': 'Bright/Dark Blade',
      },
    },
    {
      'locale': 'de',
      'replaceSync': {
        'Dancing Fan': 'tanzend(?:e|er|es|en) Fächer',
        'Moonlight': 'Mondlicht',
        'Specter(?! )': 'Schemen',
        'Specter Of The Empire': 'garleisch(?:e|er|es|en) Soldat',
        'Specter Of The Matriarch': 'Yotsuyus Ziehmutter',
        'Specter of Zenos': 'Zenos',
        'Tsukuyomi': 'Tsukuyomi',
      },
      'replaceText': {
        'Antitwilight': 'Schönheit der Nacht',
        'Bright Blade': 'Helle Klinge',
        'Concentrativity': 'Konzentriertheit',
        'Dance Of The Dead': 'Tanz der Toten',
        'Dark Blade': 'Dunkle Klinge',
        'Dispersivity': 'Dispersivität',
        'Empire': 'Soldat',
        'Homeland': 'Domaner',
        'Lead Of The Underworld': 'Blei der Unterwelt',
        'Lunacy': 'Mondscheinblüte',
        'Lunar Halo': 'Flammender Mond',
        'Matriarch': 'Ziehmutter',
        'Midnight Haze': 'Mitternachtsnebel',
        'Nightbloom': 'Monddämmerung',
        'Nightfall': 'Einbruch der Dunkelheit',
        'Patriarch': 'Ziehvater',
        'Perilune': 'Zenit des Mondes',
        'Reprimand': 'Maßregelung',
        'Selenomancy': 'Mondprophezeiung',
        'Steel Of The Underworld': 'Stahl der Unterwelt',
        'Torment Unto Death': 'Todesqualen',
        'Tsuki-No-Maiogi': 'Mondfächer',
        'Unmoving Troika': 'Unbewegte Troika',
        'Zashiki-Asobi': 'Zashiki-Asobi',
      },
    },
    {
      'locale': 'fr',
      'replaceSync': {
        'Dancing Fan': 'maiôgi',
        'Moonlight': 'Clair de lune',
        'Specter(?! )': 'spector',
        'Specter Of The Empire': 'spectre de soldat impérial',
        'Specter Of The Matriarch': 'spectre de la marâtre',
        'Specter of Zenos': 'spectre de Zenos',
        'Tsukuyomi': 'Tsukuyomi',
      },
      'replaceText': {
        '--Empire/Homeland Adds': '--Adds Impériaux/Domiens--',
        '--Patriarch/Matriarch Adds--': '--Adds Parâtres/Marâtres--',
        'Antitwilight': 'Belle-de-nuit',
        'Bright Blade/Dark Blade': 'Lame blafarde/ténébreuse',
        'Concentrativity': 'Kenki concentré',
        'Dance Of The Dead': 'Danse des morts',
        'Dispersivity': 'Onde Kenki',
        'Lead Of The Underworld': 'Tir de l\'au-delà',
        'Lunacy': 'Efflorescence au clair de lune',
        'Lunar Halo': 'Flamboiement lunaire',
        'Midnight Haze': 'Brume nocturne',
        'Nightbloom': 'Lis araignée',
        'Nightfall': 'Jeune nuit',
        'Perilune': 'Zénith lunaire',
        'Reprimand': 'Correction',
        'Selenomancy': 'Sélénomancie',
        'Steel Of The Underworld': 'Pointes de l\'au-delà',
        'Torment Unto Death': 'Brimade meurtrière',
        'Tsuki-No-Maiogi': 'Maiôgi lunaire',
        'Unmoving Troika': 'Troïka immobile',
        'Zashiki-Asobi': 'Zashiki asobi',
      },
    },
    {
      'locale': 'ja',
      'missingTranslations': true,
      'replaceSync': {
        'Dancing Fan': '舞扇',
        'Moonlight': '月光',
        'Specter(?! )': 'スペクター',
        'Specter Of The Empire': '帝国兵の幻影',
        'Specter Of The Matriarch': '養母の幻影',
        'Specter of Zenos': 'ゼノスの幻影',
        'Tsukuyomi': 'ツクヨミ',
      },
      'replaceText': {
        'Antitwilight': '月下美人',
        'Bright Blade': '月刀左近',
        'Concentrativity': '圧縮剣気',
        'Dance Of The Dead': '黄泉の舞',
        'Dark Blade': '月刀右近',
        'Dispersivity': '剣気波動',
        'Lead Of The Underworld': '黄泉の銃弾',
        'Lunacy': '月下繚乱',
        'Lunar Halo': '百月光',
        'Midnight Haze': '夜の煙',
        'Nightbloom': '月下彼岸花',
        'Nightfall': '宵の早替え',
        'Perilune': '月天心',
        'Reprimand': '折檻',
        'Selenomancy': '月読',
        'Steel Of The Underworld': '黄泉の穂先',
        'Torment Unto Death': 'なぶり殺し',
        'Tsuki-No-Maiogi': '月の舞扇',
        'Unmoving Troika': '不動三段',
        'Zashiki-Asobi': '座敷遊び',
      },
    },
    {
      'locale': 'cn',
      'replaceSync': {
        'Dancing Fan': '舞扇',
        'Moonlight': '月光',
        'Specter(?! )': '妖影',
        'Specter Of The Empire': '帝国兵的幻影',
        'Specter Of The Matriarch': '养母的幻影',
        'Specter of Zenos': '芝诺斯的幻影',
        'Tsukuyomi': '月读',
      },
      'replaceText': {
        'Adds': '小怪',
        'Antitwilight': '月下美人',
        'Bright Blade': '月刀左斩',
        'Concentrativity': '压缩剑气',
        'Dance Of The Dead': '黄泉之舞',
        'Dark Blade': '月刀右斩',
        'Dispersivity': '剑气波动',
        'Empire': '帝国',
        'Homeland': '家乡',
        'Lead Of The Underworld': '黄泉之弹',
        'Lunacy': '月下缭乱',
        'Lunar Halo': '百月光',
        'Midnight Haze': '夜烟',
        'Nightbloom': '月下彼岸花',
        'Nightfall': '深宵换装',
        'Perilune': '月天心',
        'Reprimand': '责难',
        'Selenomancy': '月读',
        'Steel Of The Underworld': '黄泉之枪',
        'Torment Unto Death': '折磨',
        'Tsuki-No-Maiogi': '月下舞扇',
        'Unmoving Troika': '不动三段',
        'Zashiki-Asobi': '宴会游乐',
      },
    },
    {
      'locale': 'ko',
      'replaceSync': {
        'Dancing Fan': '춤추는 부채',
        'Moonlight': '월광',
        'Specter(?! )': '그림자요괴',
        'Specter Of The Empire': '제국 병사의 환영',
        'Specter Of The Matriarch': '양어머니의 환영',
        'Specter of Zenos': '제노스의 환영',
        'Tsukuyomi': '츠쿠요미',
      },
      'replaceText': {
        '--Patriarch/Matriarch Adds--': '--양아버지/양어머니 등장--',
        '--Empire/Homeland Adds--': '--제국 병사/도마인 등장--',
        'Antitwilight': '월하미인',
        'Bright Blade': '하현달 베기',
        'Concentrativity': '압축 검기',
        'Dance Of The Dead': '황천의 춤',
        'Dark Blade': '상현달 베기',
        'Dispersivity': '검기 파동',
        'Lead Of The Underworld': '황천의 총탄',
        'Lunacy': '월하요란',
        'Lunar Halo': '백월광',
        'Midnight Haze': '밤의 연기',
        'Nightbloom': '달빛 저승꽃',
        'Nightfall': '밤의 옷차림',
        'Perilune': '중천의 달',
        'Reprimand': '절함',
        'Selenomancy': '달읽기',
        'Steel Of The Underworld': '황천의 창끝',
        'Torment Unto Death': '고문살인',
        'Tsuki-No-Maiogi': '춤추는 달 부채',
        'Unmoving Troika': '부동삼단',
        'Zashiki-Asobi': '유흥',
      },
    },
  ],
};

export default triggerSet;
