import BANNERS, { BANNER_CODE } from "../constants/Banners";
import Character from "../models/Character";
import Weapon from "../models/Weapon";
import { WishAction, WishState } from "./Store";

export const ACTION_TYPES = {
    INCREMENT_PITY: 'INCREMENT_PITY',
    UPDATE_RESULT: 'UPDATE_RESULT',
    SET_BANNER: 'SET_BANNER'
}

export interface PityState {
    eventFiveStarCharacterPity: number,
    eventFourStarCharacterPity: number,
    eventFiveStarGuarantee: boolean,
    eventFourStarGuarantee: boolean,
    wanderlustFiveStarPity: number,
    wanderlustFourStarPity: number,
}

const isEventFiveStar = (character: Character | Weapon, banner: BANNER_CODE): boolean => {
    const eventFiveStar = BANNERS.find(c => c.eventFiveStar?.name === character.name);

    return !!eventFiveStar && banner !== BANNER_CODE.NONE;
}

const isEventFourStar = (character: Character | Weapon, banner: BANNER_CODE): boolean => {
    const eventFourStar = BANNERS.find(c => {
        const fourStars = c.eventFourStars;

        return fourStars?.find(fourStarCharacter => fourStarCharacter.name === character.name);
    });

    return !!eventFourStar && banner !== BANNER_CODE.NONE;
}

const updatePity = (state: WishState, wishResult: Array<Character | Weapon>): PityState => {
    const resultState: PityState = {...state};

    for (const item of wishResult) {
        if (item.stars === 5) {
            if (isEventFiveStar(item, state.banner)) {
                resultState.eventFiveStarGuarantee = false;
            } else if (state.banner !== BANNER_CODE.NONE) {
                resultState.eventFiveStarGuarantee = true;
            } else {
                resultState.wanderlustFiveStarPity = 0;
            }
        } else {
            if (isEventFourStar(item, state.banner)) {
                resultState.eventFourStarGuarantee = false;
            } else if (state.banner !== BANNER_CODE.NONE) {
                resultState.eventFourStarGuarantee = true;
            } else {
                resultState.wanderlustFourStarPity = 0;
            }
        }
    }
    
    return resultState;
}

const Reducer = (state: WishState, action: WishAction): WishState => {
    switch (action.type) {
        case ACTION_TYPES.INCREMENT_PITY:
            const eventFiveStarCharacterPity = state.eventFiveStarCharacterPity >= 90 ? 0 : state.eventFiveStarCharacterPity + 1;
            const eventFourStarCharacterPity = state.eventFourStarCharacterPity >= 90 ? 0 : state.eventFourStarCharacterPity + 1;
            const wanderlustFiveStarPity = state.wanderlustFiveStarPity >= 90 ? 0 : state.wanderlustFiveStarPity + 1;
            const wanderlustFourStarPity = state.wanderlustFourStarPity >= 90 ? 0 : state.wanderlustFourStarPity + 1;
            return {
                ...state,
                grandTotal: state.grandTotal + 1,
                eventFiveStarCharacterPity,
                eventFourStarCharacterPity,
                wanderlustFiveStarPity,
                wanderlustFourStarPity,
            }
        case ACTION_TYPES.UPDATE_RESULT:
            const pityState = updatePity(state, action.payload as Array<Character | Weapon>);

            return {
                ...state,
                ...pityState
            }
        case ACTION_TYPES.SET_BANNER:
            return {
                ...state,
                banner: action.payload as BANNER_CODE
            }
        default:
            return state;
    }
}

export default Reducer;
