import { BANNER_CODE } from "../constants/Banners";
import WishService from "../services/WishService";
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
            console.log(ACTION_TYPE.SET_BANNER);
            if (action.payload) {
                const newBanner = action.payload as BANNER_CODE
                wishService.setBanner(newBanner);
                state.banner = newBanner;
            }
            return {...state};
        case ACTION_TYPE.RESET:
            wishService.reset();
            return {...state}
        case ACTION_TYPE.WISH:
            const results = wishService.wish(action.payload as number);
            state.results = results;
            return {...state}
        default:
            return state;
    }
}

export default reducer;