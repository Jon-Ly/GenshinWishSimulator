import Character from '../models/character';
import Weapon from '../models/weapon';
import CHARACTERS from './characters';
import PATHS from './paths';
import WEAPONS from './weapons';

export enum BANNER_CODE {
    NONE = 'none',
    ALBEDO = 'albedo_banner',
    EULA = 'eula_banner',
    GANYU = 'ganyu_banner',
    HU_TAO = 'hu_tao_banner',
    KEQING = 'keqing_banner',
    KLEE = 'klee_banner',
    TARTAGLIA = 'tartaglia_banner',
    TARTAGLIA_2 = 'tartaglia_banner_2',
    VENTI = 'venti_banner',
    VENTI_2 = 'venti_banner_2',
    WANDERLUST = 'wanderlust_banner',
    WEAPON = 'weapon_banner',
    XIAO = 'xiao_banner',
    ZHONGLI = 'zhongli_banner',
    ZHONGLI_2 = 'zhongli_banner_2'
};

export interface Banner {
    code: BANNER_CODE,
    title: string,
    eventFiveStar?: Character,
    eventFourStars: Array<Character>,
    fiveStars: Array<Character | Weapon>,
    fourStars: Array<Character | Weapon>,
    imagePath: string,
    startDate: Date,
    label: string
}

const WANDERLUST_BANNER: Banner = {
    code: BANNER_CODE.WANDERLUST,
    title: 'Wanderlust Invocation',
    fiveStars: [...CHARACTERS.WANDERLUST_FIVE_STAR_CHARACTERS, ...WEAPONS.WANDERLUST_FIVE_STAR_WEAPONS],
    fourStars: [...CHARACTERS.WANDERLUST_FOUR_STAR_CHARACTERS, ...WEAPONS.FOUR_STAR_WEAPONS],
    eventFourStars: [],
    imagePath: `${PATHS.CHARACTER_BANNERS}/wanderlust_banner.webp`,
    startDate: new Date(9999, 12, 31),
    label: 'Wanderlust'
}

const EVENT_BANNERS = {
    ALBEDO: {
        code: BANNER_CODE.ALBEDO,
        title: 'Secretum Secretorum',
        eventFiveStar: CHARACTERS.PLAYABLE_CHARACTERS.ALBEDO,
        eventFourStars: [CHARACTERS.PLAYABLE_CHARACTERS.FISCHL, CHARACTERS.PLAYABLE_CHARACTERS.SUCROSE, CHARACTERS.PLAYABLE_CHARACTERS.BENNETT],
        fiveStars: [CHARACTERS.PLAYABLE_CHARACTERS.ALBEDO, ...CHARACTERS.WANDERLUST_FIVE_STAR_CHARACTERS],
        fourStars: [],
        imagePath: `${PATHS.CHARACTER_BANNERS}/${BANNER_CODE.ALBEDO}.webp`,
        startDate: new Date(2020, 12, 23),
        label: 'Albedo'
    },
    EULA: {
        code: BANNER_CODE.EULA,
        title: 'Born of Ocean Swell',
        eventFiveStar: CHARACTERS.PLAYABLE_CHARACTERS.EULA,
        eventFourStars: [CHARACTERS.PLAYABLE_CHARACTERS.XINYAN, CHARACTERS.PLAYABLE_CHARACTERS.XINGQUI, CHARACTERS.PLAYABLE_CHARACTERS.BEIDOU],
        fiveStars: [CHARACTERS.PLAYABLE_CHARACTERS.EULA, ...CHARACTERS.WANDERLUST_FIVE_STAR_CHARACTERS],
        fourStars: [],
        imagePath: `${PATHS.CHARACTER_BANNERS}/${BANNER_CODE.EULA}.webp`,
        startDate: new Date(2021, 5, 18),
        label: 'Eula'
    },
    GANYU: {
        code: BANNER_CODE.GANYU,
        title: 'Adrift in the Harbor',
        eventFiveStar: CHARACTERS.PLAYABLE_CHARACTERS.GANYU,
        eventFourStars: [CHARACTERS.PLAYABLE_CHARACTERS.NOELLE, CHARACTERS.PLAYABLE_CHARACTERS.XINGQUI, CHARACTERS.PLAYABLE_CHARACTERS.XIANGLING],
        fiveStars: [CHARACTERS.PLAYABLE_CHARACTERS.GANYU, ...CHARACTERS.WANDERLUST_FIVE_STAR_CHARACTERS],
        fourStars: [],
        imagePath: `${PATHS.CHARACTER_BANNERS}/${BANNER_CODE.GANYU}.webp`,
        startDate: new Date(2021, 1, 12),
        label: 'Ganyu'
    },
    HU_TAO: {
        code: BANNER_CODE.HU_TAO,
        title: 'Moment of Bloom',
        eventFiveStar: CHARACTERS.PLAYABLE_CHARACTERS.HU_TAO,
        eventFourStars: [CHARACTERS.PLAYABLE_CHARACTERS.XINGQUI, CHARACTERS.PLAYABLE_CHARACTERS.XIANGLING, CHARACTERS.PLAYABLE_CHARACTERS.CHONGYUN],
        fiveStars: [CHARACTERS.PLAYABLE_CHARACTERS.HU_TAO, ...CHARACTERS.WANDERLUST_FIVE_STAR_CHARACTERS],
        fourStars: [],
        imagePath: `${PATHS.CHARACTER_BANNERS}/${BANNER_CODE.HU_TAO}.webp`,
        startDate: new Date(2021, 3, 2),
        label: 'Hu Tao'
    },
    KEQING: {
        code: BANNER_CODE.KEQING,
        title: 'Dance of Lanterns',
        eventFiveStar: CHARACTERS.PLAYABLE_CHARACTERS.KEQING,
        eventFourStars: [CHARACTERS.PLAYABLE_CHARACTERS.BENNETT, CHARACTERS.PLAYABLE_CHARACTERS.NINGGUANG, CHARACTERS.PLAYABLE_CHARACTERS.BARBARA],
        fiveStars: [CHARACTERS.PLAYABLE_CHARACTERS.KEQING, ...CHARACTERS.WANDERLUST_FIVE_STAR_CHARACTERS],
        fourStars: [],
        imagePath: `${PATHS.CHARACTER_BANNERS}/${BANNER_CODE.KEQING}.webp`,
        startDate: new Date(2021, 2, 17),
        label: 'Keqing'
    },
    KLEE: {
        code: BANNER_CODE.KLEE,
        title: 'Sparkling Steps',
        eventFiveStar: CHARACTERS.PLAYABLE_CHARACTERS.KLEE,
        eventFourStars: [CHARACTERS.PLAYABLE_CHARACTERS.SUCROSE, CHARACTERS.PLAYABLE_CHARACTERS.NOELLE, CHARACTERS.PLAYABLE_CHARACTERS.XINGQUI],
        fiveStars: [CHARACTERS.PLAYABLE_CHARACTERS.KLEE, ...CHARACTERS.WANDERLUST_FIVE_STAR_CHARACTERS],
        fourStars: [],
        imagePath: `${PATHS.CHARACTER_BANNERS}/${BANNER_CODE.KLEE}.webp`,
        startDate: new Date(2020, 10, 20),
        label: 'Klee'
    },
    TARTAGLIA: {
        code: BANNER_CODE.TARTAGLIA,
        title: 'Farewell of Snezhnaya',
        eventFiveStar: CHARACTERS.PLAYABLE_CHARACTERS.TARTAGLIA,
        eventFourStars: [CHARACTERS.PLAYABLE_CHARACTERS.DIONA, CHARACTERS.PLAYABLE_CHARACTERS.NINGGUANG, CHARACTERS.PLAYABLE_CHARACTERS.BEIDOU],
        fiveStars: [CHARACTERS.PLAYABLE_CHARACTERS.TARTAGLIA, ...CHARACTERS.WANDERLUST_FIVE_STAR_CHARACTERS],
        fourStars: [],
        imagePath: `${PATHS.CHARACTER_BANNERS}/${BANNER_CODE.TARTAGLIA}.webp`,
        startDate: new Date(2020, 11, 11),
        label: 'Tartaglia'
    },
    TARTAGLIA_2: {
        code: BANNER_CODE.TARTAGLIA_2,
        title: 'Farewell of Snezhnaya',
        eventFiveStar: CHARACTERS.PLAYABLE_CHARACTERS.TARTAGLIA,
        eventFourStars: [CHARACTERS.PLAYABLE_CHARACTERS.ROSARIA, CHARACTERS.PLAYABLE_CHARACTERS.FISCHL, CHARACTERS.PLAYABLE_CHARACTERS.BARBARA],
        fiveStars: [CHARACTERS.PLAYABLE_CHARACTERS.TARTAGLIA, ...CHARACTERS.WANDERLUST_FIVE_STAR_CHARACTERS],
        fourStars: [],
        imagePath: `${PATHS.CHARACTER_BANNERS}/${BANNER_CODE.TARTAGLIA_2}.webp`,
        startDate: new Date(2021, 4, 6),
        label: 'Tartaglia 2'
    },
    VENTI: {
        code: BANNER_CODE.VENTI,
        title: 'Ballad of Goblets',
        eventFiveStar: CHARACTERS.PLAYABLE_CHARACTERS.VENTI,
        eventFourStars: [CHARACTERS.PLAYABLE_CHARACTERS.FISCHL, CHARACTERS.PLAYABLE_CHARACTERS.XIANGLING, CHARACTERS.PLAYABLE_CHARACTERS.BARBARA],
        fiveStars: [CHARACTERS.PLAYABLE_CHARACTERS.VENTI, ...CHARACTERS.WANDERLUST_FIVE_STAR_CHARACTERS],
        fourStars: [],
        imagePath: `${PATHS.CHARACTER_BANNERS}/${BANNER_CODE.VENTI}.webp`,
        startDate: new Date(2020, 9, 28),
        label: 'Venti'
    },
    VENTI_2: {
        code: BANNER_CODE.VENTI_2,
        title: 'Ballad of Goblets',
        eventFiveStar: CHARACTERS.PLAYABLE_CHARACTERS.VENTI,
        eventFourStars: [CHARACTERS.PLAYABLE_CHARACTERS.SUCROSE, CHARACTERS.PLAYABLE_CHARACTERS.RAZOR, CHARACTERS.PLAYABLE_CHARACTERS.NOELLE],
        fiveStars: [CHARACTERS.PLAYABLE_CHARACTERS.VENTI, ...CHARACTERS.WANDERLUST_FIVE_STAR_CHARACTERS],
        fourStars: [],
        imagePath: `${PATHS.CHARACTER_BANNERS}/${BANNER_CODE.VENTI_2}.webp`,
        startDate: new Date(2021, 3, 16),
        label: 'Venti 2'
    },
    XIAO: {
        code: BANNER_CODE.XIAO,
        title: 'Invitation to Mundane Life',
        eventFiveStar: CHARACTERS.PLAYABLE_CHARACTERS.XIAO,
        eventFourStars: [CHARACTERS.PLAYABLE_CHARACTERS.DIONA, CHARACTERS.PLAYABLE_CHARACTERS.BEIDOU, CHARACTERS.PLAYABLE_CHARACTERS.XINYAN],
        fiveStars: [CHARACTERS.PLAYABLE_CHARACTERS.XIAO, ...CHARACTERS.WANDERLUST_FIVE_STAR_CHARACTERS],
        fourStars: [],
        imagePath: `${PATHS.CHARACTER_BANNERS}/${BANNER_CODE.XIAO}.webp`,
        startDate: new Date(2021, 2, 3),
        label: 'Xiao'
    },
    ZHONGLI: {
        code: BANNER_CODE.ZHONGLI,
        title: 'Gentry of Hermitage',
        eventFiveStar: CHARACTERS.PLAYABLE_CHARACTERS.ZHONGLI,
        eventFourStars: [CHARACTERS.PLAYABLE_CHARACTERS.XINYAN, CHARACTERS.PLAYABLE_CHARACTERS.CHONGYUN, CHARACTERS.PLAYABLE_CHARACTERS.RAZOR],
        fiveStars: [CHARACTERS.PLAYABLE_CHARACTERS.ZHONGLI, ...CHARACTERS.WANDERLUST_FIVE_STAR_CHARACTERS],
        fourStars: [],
        imagePath: `${PATHS.CHARACTER_BANNERS}/${BANNER_CODE.ZHONGLI}.webp`,
        startDate: new Date(2020, 12, 1),
        label: 'Zhongli'
    },
    ZHONGLI_2: {
        code: BANNER_CODE.ZHONGLI_2,
        title: 'Gentry of Hermitage',
        eventFiveStar: CHARACTERS.PLAYABLE_CHARACTERS.ZHONGLI,
        eventFourStars: [CHARACTERS.PLAYABLE_CHARACTERS.YANFEI, CHARACTERS.PLAYABLE_CHARACTERS.NOELLE, CHARACTERS.PLAYABLE_CHARACTERS.DIONA],
        fiveStars: [CHARACTERS.PLAYABLE_CHARACTERS.ZHONGLI, ...CHARACTERS.WANDERLUST_FIVE_STAR_CHARACTERS],
        fourStars: [],
        imagePath: `${PATHS.CHARACTER_BANNERS}/${BANNER_CODE.ZHONGLI_2}.webp`,
        startDate: new Date(2021, 4, 28),
        label: 'Zhongli 2'
    },
}

const FilterOutFourStarEventCharacters = (banner: Banner) => {
    const result = CHARACTERS.EVENT_FOUR_STAR_CHARACTERS.filter((eventCharacter: Character) => {
        const eventFourStarLength = banner.eventFourStars?.length || 0;
        const eventFourStars = banner.eventFourStars || [];

        for (let i = 0; i < eventFourStarLength; i++ ) {
            if (eventCharacter.name === eventFourStars[i].name) {
                return false;
            }
        }

        return true;
    });

    return result;
}

const BANNERS = new Array<Banner>(
    WANDERLUST_BANNER,
    {
        ...EVENT_BANNERS.ALBEDO,
        fourStars: [...EVENT_BANNERS.ALBEDO.eventFourStars, ...FilterOutFourStarEventCharacters(EVENT_BANNERS.ALBEDO), ...WEAPONS.FOUR_STAR_WEAPONS]
    },
    {
        ...EVENT_BANNERS.EULA,
        fourStars: [...WEAPONS.FOUR_STAR_WEAPONS]
    },
    {
        ...EVENT_BANNERS.GANYU,
        fourStars: [...EVENT_BANNERS.GANYU.eventFourStars, ...FilterOutFourStarEventCharacters(EVENT_BANNERS.GANYU), ...WEAPONS.FOUR_STAR_WEAPONS]
    },
    {
        ...EVENT_BANNERS.HU_TAO,
        fourStars: [...EVENT_BANNERS.HU_TAO.eventFourStars, ...FilterOutFourStarEventCharacters(EVENT_BANNERS.HU_TAO), ...WEAPONS.FOUR_STAR_WEAPONS]
    },
    {
        ...EVENT_BANNERS.KEQING,
        fourStars: [...EVENT_BANNERS.KEQING.eventFourStars, ...FilterOutFourStarEventCharacters(EVENT_BANNERS.KEQING), ...WEAPONS.FOUR_STAR_WEAPONS]
    },
    {
        ...EVENT_BANNERS.KLEE,
        fourStars: [...EVENT_BANNERS.KLEE.eventFourStars, ...FilterOutFourStarEventCharacters(EVENT_BANNERS.KLEE), ...WEAPONS.FOUR_STAR_WEAPONS]
    },
    {
        ...EVENT_BANNERS.TARTAGLIA,
        fourStars: [...EVENT_BANNERS.TARTAGLIA.eventFourStars, ...FilterOutFourStarEventCharacters(EVENT_BANNERS.TARTAGLIA), ...WEAPONS.FOUR_STAR_WEAPONS]
    },
    {
        ...EVENT_BANNERS.TARTAGLIA_2,
        fourStars: [...EVENT_BANNERS.TARTAGLIA_2.eventFourStars, ...FilterOutFourStarEventCharacters(EVENT_BANNERS.TARTAGLIA_2), ...WEAPONS.FOUR_STAR_WEAPONS]
    },
    {
        ...EVENT_BANNERS.VENTI,
        fourStars: [...EVENT_BANNERS.VENTI.eventFourStars, ...FilterOutFourStarEventCharacters(EVENT_BANNERS.VENTI), ...WEAPONS.FOUR_STAR_WEAPONS]
    },
    {
        ...EVENT_BANNERS.VENTI_2,
        fourStars: [...EVENT_BANNERS.VENTI_2.eventFourStars, ...FilterOutFourStarEventCharacters(EVENT_BANNERS.VENTI_2), ...WEAPONS.FOUR_STAR_WEAPONS]
    },
    {
        ...EVENT_BANNERS.XIAO,
        fourStars: [...EVENT_BANNERS.XIAO.eventFourStars, ...FilterOutFourStarEventCharacters(EVENT_BANNERS.XIAO), ...WEAPONS.FOUR_STAR_WEAPONS]
    },
    {
        ...EVENT_BANNERS.ZHONGLI,
        fourStars: [...EVENT_BANNERS.ZHONGLI.eventFourStars, ...FilterOutFourStarEventCharacters(EVENT_BANNERS.ZHONGLI), ...WEAPONS.FOUR_STAR_WEAPONS]
    },
    {
        ...EVENT_BANNERS.ZHONGLI_2,
        fourStars: [...EVENT_BANNERS.ZHONGLI_2.eventFourStars, ...FilterOutFourStarEventCharacters(EVENT_BANNERS.ZHONGLI_2), ...WEAPONS.FOUR_STAR_WEAPONS]
    }
);

export default BANNERS;
