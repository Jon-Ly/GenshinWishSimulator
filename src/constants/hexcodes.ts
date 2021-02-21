import ELEMENT from "./elements";

const HEXCODES = {
    ANEMO: '#3D9A9B',
    CRYO: '#4883B5',
    ELECTRO: '#9D6CC8',
    ERROR: '#FF5F40',
    FIVE_STAR_CHANCE_BANNER: '#DCBBA5',
    FIVE_STAR_HISTORY_COLOR: '#BF6D38',
    FOUR_STAR_CHANCE_BANNER: '#B6ABBF',
    FOUR_STAR_HISTORY_COLOR: '#A45AE1',
    PURPLE: '#A257E1',
    PYRO: '#EC5532',
    WISH_BUTTON_TEXT: '#BAA996'
};

export const GetElementColor = (type: string) => {
    switch (type) {
        case ELEMENT.ANEMO:
            return HEXCODES.ANEMO;
        case ELEMENT.CRYO:
            return HEXCODES.CRYO;
        case ELEMENT.DENDRO: 
            return '';
        case ELEMENT.ELECTRO:
            return HEXCODES.ELECTRO;
        case ELEMENT.GEO:
            return '';
        case ELEMENT.HYDRO:
            return '';
        case ELEMENT.PYRO:
            return HEXCODES.PYRO;
    }
}

export default HEXCODES;
