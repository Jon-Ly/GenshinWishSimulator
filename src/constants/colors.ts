import ELEMENT from "./elements";

const COLORS = {
    ANEMO: '#3D9A9B',
    CRYO: '#4883B5',
    ELECTRO: '#9D6CC8',
    HYDRO: '#23C5FC',
    FIVE_STAR_CHANCE_BANNER: '#DCBBA5',
    FOUR_STAR_CHANCE_BANNER: '#B6ABBF',
    PYRO: '#EC5532',
};

export const GetElementColor = (type: string) => {
    switch (type) {
        case ELEMENT.ANEMO:
            return COLORS.ANEMO;
        case ELEMENT.CRYO:
            return COLORS.CRYO;
        case ELEMENT.DENDRO:
            return '';
        case ELEMENT.ELECTRO:
            return COLORS.ELECTRO;
        case ELEMENT.GEO:
            return '';
        case ELEMENT.HYDRO:
            return COLORS.HYDRO;
        case ELEMENT.PYRO:
            return COLORS.PYRO;
    }
}

export default COLORS;
