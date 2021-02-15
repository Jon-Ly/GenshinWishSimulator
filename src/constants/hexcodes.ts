import ELEMENT from "./elements";

const HEXCODES = {
    ANEMO: '#3D9A9B',
    BANNER_TAB_ACTIVE: '#F7F3D8',
    BANNER_TAB_INACTIVE: '#4D6D96',
    CRYO: '#4883B5',
    DETAIL_BACKGROUND: '#EBEBEB',
    DETAIL_FONT_COLOR: '#727272',
    DETAIL_TABLE_HEADER: '#DBD7D3',
    DETAIL_TABLE_TEXT: '#A68457',
    ELECTRO: '#9D6CC8',
    ERROR: '#FF5F40',
    FIVE_STAR_CHANCE_BANNER: '#DCBBA5',
    FIVE_STAR_HISTORY_COLOR: '#BF6D38',
    FOUR_STAR_CHANCE_BANNER: '#B6ABBF',
    FOUR_STAR_HISTORY_COLOR: '#A45AE1',
    ITEM_BANNER_STAR: '#FFCC33',
    ITEM_BANNER_TEXT_COLOR: '#AD8E67',
    IMPORTANT: '#CD5239',
    LIMITED_TIME_BANNER : '#A38052',
    PURPLE: '#A257E1',
    PYRO: '#EC5532',
    SHOP_DETAIL_HISTORY: '#E2DED4',
    SHOP_DETAIL_HISTORY_TEXT: '#343434',
    STARGLITTER_TEXT: '#C27746',
    THREE_STAR_CHANCE_BANNER: '#A5BACC',
    WISH_BUTTON: '#FFFFFF',
    WISH_BUTTON_BORDER: '',
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
