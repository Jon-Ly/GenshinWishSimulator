import Character from '../models/Character';
import Weapon from '../models/Weapon';
import CHARACTERS from './Characters';
import WEAPONS from './Weapons';

export enum BANNER_CODE {
    NONE = 'none',
    ALBEDO = 'albedo_banner',
    GANYU = 'ganyu_banner',
    KLEE = 'klee_banner',
    TARTAGLIA = 'tartaglia_banner',
    VENTI = 'venti_banner',
    WANDERLUST = 'wanderlust_banner',
    ZHONGLI = 'zhongli_banner'
};

interface Banner {
    code: BANNER_CODE,
    eventFiveStar?: Character,
    eventFourStars?: Array<Character>,
    fiveStars: Array<Character | Weapon>,
    fourStars: Array<Character | Weapon>
}

const WANDERLUST_BANNER: Banner = {
    code: BANNER_CODE.WANDERLUST,
    fiveStars: [...CHARACTERS.WANDERLUST_FIVE_STAR_CHARACTERS, ...WEAPONS.WANDERLUST_FIVE_STAR_WEAPONS],
    fourStars: [...CHARACTERS.WANDERLUST_FOUR_STAR_CHARACTERS, ...WEAPONS.WANDERLUST_FIVE_STAR_WEAPONS]
}

const EVENT_BANNERS = {
    ALBEDO: {
        code: BANNER_CODE.ALBEDO,
        eventFiveStar: CHARACTERS.PLAYABLE_CHARACTERS.ALBEDO,
        eventFourStars: [CHARACTERS.PLAYABLE_CHARACTERS.BENNETT, CHARACTERS.PLAYABLE_CHARACTERS.FISCHL, CHARACTERS.PLAYABLE_CHARACTERS.SUCROSE],
        fiveStars: WANDERLUST_BANNER.fiveStars,
        fourStars: []
    },
    GANYU: {
        code: BANNER_CODE.GANYU,
        eventFiveStar: CHARACTERS.PLAYABLE_CHARACTERS.GANYU,
        eventFourStars: [CHARACTERS.PLAYABLE_CHARACTERS.XIANGLING, CHARACTERS.PLAYABLE_CHARACTERS.XINGQUI, CHARACTERS.PLAYABLE_CHARACTERS.NOELLE],
        fiveStars: WANDERLUST_BANNER.fiveStars,
        fourStars: []
    },
    KLEE: {
        code: BANNER_CODE.KLEE,
        eventFiveStar: CHARACTERS.PLAYABLE_CHARACTERS.KLEE,
        eventFourStars: [CHARACTERS.PLAYABLE_CHARACTERS.SUCROSE, CHARACTERS.PLAYABLE_CHARACTERS.NOELLE, CHARACTERS.PLAYABLE_CHARACTERS.XINGQUI],
        fiveStars: WANDERLUST_BANNER.fiveStars,
        fourStars: []
    },
    TARTAGLIA: {
        code: BANNER_CODE.TARTAGLIA,
        eventFiveStar: CHARACTERS.PLAYABLE_CHARACTERS.TARTAGLIA,
        eventFourStars: [CHARACTERS.PLAYABLE_CHARACTERS.NINGGUANG, CHARACTERS.PLAYABLE_CHARACTERS.BEIDOU, CHARACTERS.PLAYABLE_CHARACTERS.DIONA],
        fiveStars: WANDERLUST_BANNER.fiveStars,
        fourStars: []
    },
    VENTI: {
        code: BANNER_CODE.VENTI,
        eventFiveStar: CHARACTERS.PLAYABLE_CHARACTERS.VENTI,
        eventFourStars: [CHARACTERS.PLAYABLE_CHARACTERS.XIANGLING, CHARACTERS.PLAYABLE_CHARACTERS.BARBARA, CHARACTERS.PLAYABLE_CHARACTERS.FISCHL],
        fiveStars: WANDERLUST_BANNER.fiveStars,
        fourStars: []
    },
    ZHONGLI: {
        code: BANNER_CODE.ZHONGLI,
        eventFiveStar: CHARACTERS.PLAYABLE_CHARACTERS.ZHONGLI,
        eventFourStars: [CHARACTERS.PLAYABLE_CHARACTERS.XINGYAN, CHARACTERS.PLAYABLE_CHARACTERS.RAZOR, CHARACTERS.PLAYABLE_CHARACTERS.CHONGYUN],
        fiveStars: WANDERLUST_BANNER.fiveStars,
        fourStars: []
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
        ...EVENT_BANNERS.KLEE,
        fourStars: FilterOutFourStarEventCharacters(EVENT_BANNERS.KLEE)
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
        ...EVENT_BANNERS.VENTI,
        fourStars: FilterOutFourStarEventCharacters(EVENT_BANNERS.VENTI)
    },
    {
        ...EVENT_BANNERS.ZHONGLI,
        fourStars: FilterOutFourStarEventCharacters(EVENT_BANNERS.ZHONGLI)
    }
);

export default BANNERS;
