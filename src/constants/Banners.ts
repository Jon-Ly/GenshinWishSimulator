import CHARACTERS from './Characters';

export enum BANNER_CODES {
    NONE = 'none',
    ALBEDO = 'albedo_banner',
    KLEE = 'klee_banner',
    TARTAGLIA = 'tartaglia_banner',
    VENTI = 'venti_banner',
    ZHONGLI = 'zhongli_banner'
}

export const Banners = [
    {
        code: BANNER_CODES.ALBEDO,
        fiveStar: CHARACTERS.ALBEDO,
        fourStar: [CHARACTERS.BENNETT, CHARACTERS.FISCHL, CHARACTERS.SUCROSE]
    },
    {
        code: BANNER_CODES.KLEE,
        fiveStar: CHARACTERS.KLEE,
        fourStar: [CHARACTERS.SUCROSE, CHARACTERS.NOELLE, CHARACTERS.XINGQUI]
    },
    {
        code: BANNER_CODES.TARTAGLIA,
        fiveStar: CHARACTERS.TARTAGLIA,
        fourStar: [CHARACTERS.NINGGUANG, CHARACTERS.BEIDOU, CHARACTERS.DIONA]
    },
    {
        code: BANNER_CODES.VENTI,
        fiveStar: CHARACTERS.VENTI,
        fourStar: [CHARACTERS.XIANGLING, CHARACTERS.BARBARA, CHARACTERS.FISCHL]
    },
    {
        code: BANNER_CODES.ZHONGLI,
        fiveStar: CHARACTERS.ZHONGLI,
        fourStar: [CHARACTERS.XINGYAN, CHARACTERS.RAZOR, CHARACTERS.CHONGYUN]
    }
]