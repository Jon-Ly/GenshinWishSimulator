import { BANNER_CODE } from "../constants/Banners";
import UserDataService from "../services/UserDataService";
import { WishState } from "./store";

const userDataService = new UserDataService();

export const ACTION_TYPE = {
    RESET: 'RESET',
    WISH: 'WISH'
}

export interface WishAction {
    type: string,
    payload?: BANNER_CODE | number
}

const reducer = (state: WishState, action: WishAction): WishState => {
    switch (action.type) {
        case ACTION_TYPE.RESET:
            
            return {...state}
        case ACTION_TYPE.WISH:
            const results = userDataService.wish(action.payload as number);
            state.results = results;
            return {...state}
        default:
            return state;
    }
}

export default reducer;