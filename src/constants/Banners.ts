import Character from '../models/Character';
import Weapon from '../models/Weapon';
import CHARACTERS from './Characters';
import PATHS from './Paths';
import WEAPONS from './Weapons';

export enum BANNER_CODE {
    NONE = 'none',
    ALBEDO = 'albedo_banner',
    GANYU = 'ganyu_banner',
    KLEE = 'klee_banner',
    TARTAGLIA = 'tartaglia_banner',
    VENTI = 'venti_banner',
    WANDERLUST = 'wanderlust_banner',
    XIAO = 'xiao_banner',
    ZHONGLI = 'zhongli_banner'
};

export interface Banner {
    code: BANNER_CODE,
    eventFiveStar?: Character,
    eventFourStars?: Array<Character>,
    fiveStars: Array<Character | Weapon>,
    fourStars: Array<Character | Weapon>,
    imagePath: string,
    startDate: Date
}

const WANDERLUST_BANNER: Banner = {
    code: BANNER_CODE.WANDERLUST,
    fiveStars: [...CHARACTERS.WANDERLUST_FIVE_STAR_CHARACTERS, ...WEAPONS.WANDERLUST_FIVE_STAR_WEAPONS],
    fourStars: [...CHARACTERS.WANDERLUST_FOUR_STAR_CHARACTERS, ...WEAPONS.WANDERLUST_FIVE_STAR_WEAPONS],
    imagePath: `${PATHS.CHARACTER_BANNERS}/wanderlust_banner.png`,
    startDate: new Date(9999, 12, 31)
}

const EVENT_BANNERS = {
    ALBEDO: {
        code: BANNER_CODE.ALBEDO,
        eventFiveStar: CHARACTERS.PLAYABLE_CHARACTERS.ALBEDO,
        eventFourStars: [CHARACTERS.PLAYABLE_CHARACTERS.BENNETT, CHARACTERS.PLAYABLE_CHARACTERS.FISCHL, CHARACTERS.PLAYABLE_CHARACTERS.SUCROSE],
        fiveStars: WANDERLUST_BANNER.fiveStars,
        fourStars: [],
        imagePath: `${PATHS.CHARACTER_BANNERS}/${BANNER_CODE.ALBEDO}.jpg`,
        startDate: new Date(2020, 12, 23)
    },
    GANYU: {
        code: BANNER_CODE.GANYU,
        eventFiveStar: CHARACTERS.PLAYABLE_CHARACTERS.GANYU,
        eventFourStars: [CHARACTERS.PLAYABLE_CHARACTERS.XIANGLING, CHARACTERS.PLAYABLE_CHARACTERS.XINGQUI, CHARACTERS.PLAYABLE_CHARACTERS.NOELLE],
        fiveStars: WANDERLUST_BANNER.fiveStars,
        fourStars: [],
        imagePath: `${PATHS.CHARACTER_BANNERS}/${BANNER_CODE.GANYU}.jpg`,
        startDate: new Date(2021, 1, 12)
    },
    KLEE: {
        code: BANNER_CODE.KLEE,
        eventFiveStar: CHARACTERS.PLAYABLE_CHARACTERS.KLEE,
        eventFourStars: [CHARACTERS.PLAYABLE_CHARACTERS.SUCROSE, CHARACTERS.PLAYABLE_CHARACTERS.NOELLE, CHARACTERS.PLAYABLE_CHARACTERS.XINGQUI],
        fiveStars: WANDERLUST_BANNER.fiveStars,
        fourStars: [],
        imagePath: `${PATHS.CHARACTER_BANNERS}/${BANNER_CODE.KLEE}.jpg`,
        startDate: new Date(2020, 10, 20)
    },
    TARTAGLIA: {
        code: BANNER_CODE.TARTAGLIA,
        eventFiveStar: CHARACTERS.PLAYABLE_CHARACTERS.TARTAGLIA,
        eventFourStars: [CHARACTERS.PLAYABLE_CHARACTERS.NINGGUANG, CHARACTERS.PLAYABLE_CHARACTERS.BEIDOU, CHARACTERS.PLAYABLE_CHARACTERS.DIONA],
        fiveStars: WANDERLUST_BANNER.fiveStars,
        fourStars: [],
        imagePath: `${PATHS.CHARACTER_BANNERS}/${BANNER_CODE.TARTAGLIA}.jpg`,
        startDate: new Date(2020, 11, 11)
    },
    VENTI: {
        code: BANNER_CODE.VENTI,
        eventFiveStar: CHARACTERS.PLAYABLE_CHARACTERS.VENTI,
        eventFourStars: [CHARACTERS.PLAYABLE_CHARACTERS.XIANGLING, CHARACTERS.PLAYABLE_CHARACTERS.BARBARA, CHARACTERS.PLAYABLE_CHARACTERS.FISCHL],
        fiveStars: WANDERLUST_BANNER.fiveStars,
        fourStars: [],
        imagePath: `${PATHS.CHARACTER_BANNERS}/${BANNER_CODE.VENTI}.jpg`,
        startDate: new Date(2020, 9, 28)
    },
    XIAO: {
        code: BANNER_CODE.XIAO,
        eventFiveStar: CHARACTERS.PLAYABLE_CHARACTERS.XIAO,
        eventFourStars: [CHARACTERS.PLAYABLE_CHARACTERS.DIONA, CHARACTERS.PLAYABLE_CHARACTERS.XINGYAN, CHARACTERS.PLAYABLE_CHARACTERS.BEIDOU],
        fiveStars: WANDERLUST_BANNER.fiveStars,
        fourStars: [],
        imagePath: `${PATHS.CHARACTER_BANNERS}/${BANNER_CODE.XIAO}.jpg`,
        startDate: new Date(2021, 2, 3)
    },
    ZHONGLI: {
        code: BANNER_CODE.ZHONGLI,
        eventFiveStar: CHARACTERS.PLAYABLE_CHARACTERS.ZHONGLI,
        eventFourStars: [CHARACTERS.PLAYABLE_CHARACTERS.XINGYAN, CHARACTERS.PLAYABLE_CHARACTERS.RAZOR, CHARACTERS.PLAYABLE_CHARACTERS.CHONGYUN],
        fiveStars: WANDERLUST_BANNER.fiveStars,
        fourStars: [],
        imagePath: `${PATHS.CHARACTER_BANNERS}/${BANNER_CODE.ZHONGLI}.png`,
        startDate: new Date(2020, 12, 1)
    },
}

const FilterOutFourStarEventCharacters = (banner: Banner) => {
    const result = CHARACTERS.EVENT_FOUR_STAR_CHARACTERS.filter((event_character: Character) => {
        banner.eventFourStars?.forEach((banner_character: Character) => {
            if (event_character.name === banner_character.name) {
                return false;
            }
        });
        return true;
    });

    return result;
}

const BANNERS = new Array<Banner>(
    WANDERLUST_BANNER,
    {
        ...EVENT_BANNERS.ALBEDO,
        fourStars: FilterOutFourStarEventCharacters(EVENT_BANNERS.ALBEDO)
    },
    {
        ...EVENT_BANNERS.GANYU,
        fourStars: FilterOutFourStarEventCharacters(EVENT_BANNERS.GANYU)
    },
    {
        ...EVENT_BANNERS.KLEE,
        fourStars: FilterOutFourStarEventCharacters(EVENT_BANNERS.KLEE)
    },
    {
        ...EVENT_BANNERS.TARTAGLIA,
        fourStars: FilterOutFourStarEventCharacters(EVENT_BANNERS.TARTAGLIA)
    },
    {
        ...EVENT_BANNERS.VENTI,
        fourStars: FilterOutFourStarEventCharacters(EVENT_BANNERS.VENTI)
    },
    {
        ...EVENT_BANNERS.XIAO,
        fourStars: FilterOutFourStarEventCharacters(EVENT_BANNERS.XIAO)
    },
    {
        ...EVENT_BANNERS.ZHONGLI,
        fourStars: FilterOutFourStarEventCharacters(EVENT_BANNERS.ZHONGLI)
    }
);

export default BANNERS;
