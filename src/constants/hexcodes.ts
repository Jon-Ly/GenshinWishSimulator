import ELEMENT from "./elements";

const HEXCODES = {
    ANEMO: '#3D9A9B',
    DETAIL_BACKGROUND: '#EBEBEB',
    DETAIL_FONT_COLOR: '#727272',
    BANNER_TAB_ACTIVE: '#F7F3D8',
    BANNER_TAB_INACTIVE: '#4D6D96',
    CRYO: '#4883B5',
    ELECTRO: '#9D6CC8',
    FIVE_STAR_CHANCE_BANNER: '#DCBBA5',
    FOUR_STAR_CHANCE_BANNER: '#B6ABBF',
    IMPORTANT: '#CD5239',
    LIMITED_TIME_BANNER : '#A38052',
    PYRO: '#EC5532',
    SHOP_DETAIL_HISTORY: '#E2DED4',
    SHOP_DETAIL_HISTORY_TEXT: '#343434',
    PURPLE: '#A257E1',
    STARGLITTER_TEXT: '#C27746',
    WISH_BUTTON: '#FFFFFF',
    WISH_BUTTON_BORDER: '',
    WISH_BUTTON_TEXT: '#BAA996',
    WISH_TABLE_HEADER: '#DBD7D3',
    WISH_TABLE_TEXT: '#A68457'
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
