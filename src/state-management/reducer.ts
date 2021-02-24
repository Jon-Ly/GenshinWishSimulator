import { BANNER_CODE } from "../constants/banners";
import { IPrimoTopUp } from "../constants/primo-top-ups";
import WishService from "../services/wish-service";
import { WishState } from "./store";

const wishService = new WishService();

export const ACTION_TYPE = {
    PAY: 'PAY',
    SET_BANNER: 'SET_BANNER',
    RESET: 'RESET',
    WISH: 'WISH'
}

interface BannerAction {
    type: string,
    payload?: BANNER_CODE
}

interface WishAction {
    type: string,
    payload?: number
}

interface PaymentAction {
    type: string,
    payload?: IPrimoTopUp
}

export type Action = BannerAction | WishAction | PaymentAction

const reducer = (state: WishState, action: Action): WishState => {
    switch (action.type) {
        case ACTION_TYPE.PAY:
            if (action.payload) {
                const userData = wishService.pay(action.payload as IPrimoTopUp);
                state.primogems = userData.primogems;
                state.firstTimeBonus = userData.firstTimeBonus;
            }

            return {...state};
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
            const wishResult = wishService.wish(wishes);
            
            return {...wishResult}
        default:
            return state;
    }
}

export default reducer;
