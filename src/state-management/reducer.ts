import { BANNER_CODE } from "../constants/banners";
import WishService from "../services/wish-service";
import { WishState } from "./store";

const wishService = new WishService();

export const ACTION_TYPE = {
    SET_BANNER: 'SET_BANNER',
    RESET: 'RESET',
    WISH: 'WISH'
}

export interface WishAction {
    type: string,
    payload?: BANNER_CODE | number
}

const reducer = (state: WishState, action: WishAction): WishState => {
    switch (action.type) {
        case ACTION_TYPE.SET_BANNER:
            if (action.payload) {
                const newBanner = action.payload as BANNER_CODE
                wishService.setBanner(newBanner);
                state.banner = newBanner;
            }
            return {...state};
        case ACTION_TYPE.RESET:
            const result = wishService.reset();
            return {...result, results: []};
        case ACTION_TYPE.WISH:
            const wishes = action.payload as number;
            state.results = wishService.wish(action.payload as number);
            state.primogems -= wishes === 1 ? 160 : 1600;
            
            return {...state}
        default:
            return state;
    }
}

export default reducer;