import ELEMENT from "./elements";

const COLORS = {
    ANEMO: '#3d9a9b',
    CRYO: '#4883b5',
    ELECTRO: '#9d6cc8',
    GEO: '#debd6c',
    HYDRO: '#23c5fc',
    FIVE_STAR_CHANCE_BANNER: '#dcbab5',
    FOUR_STAR_CHANCE_BANNER: '#b6abbf',
    PYRO: '#ec5532',
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
            return COLORS.GEO;
        case ELEMENT.HYDRO:
            return COLORS.HYDRO;
        case ELEMENT.PYRO:
            return COLORS.PYRO;
    }
}

export default COLORS;
