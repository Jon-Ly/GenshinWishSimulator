import React, { createContext, useReducer, useMemo, ReactNode } from "react";
import { BANNER_CODE} from "../constants/Banners";
import Character from "../models/Character";
import Weapon from "../models/Weapon";
import Reducer from "./Reducer";

export interface WishState {
    banner: BANNER_CODE
    eventFiveStarCharacterPity: number,
    eventFourStarCharacterPity: number,
    eventFiveStarGuarantee: boolean,
    eventFourStarGuarantee: boolean,
    grandTotal: number,
    isWishing: boolean;
    wanderlustFiveStarPity: number,
    wanderlustFourStarPity: number,
    wishes: number,
};

const initialState: WishState = {
    banner: BANNER_CODE.NONE,
    eventFiveStarCharacterPity: 0,
    eventFourStarCharacterPity: 0,
    eventFiveStarGuarantee: false,
    eventFourStarGuarantee: false,
    grandTotal: 0,
    isWishing: false,
    wanderlustFiveStarPity: 0,
    wanderlustFourStarPity: 0,
    wishes: 0
};

export interface WishAction {
    type: string,
    payload: Array<Character | Weapon> | BANNER_CODE
}

interface StoreProps {
    children?: ReactNode
};

export const StoreContext = createContext(initialState);

const StoreProvider = ({children}: StoreProps) => {
    const [state, dispatch] = useReducer(Reducer, initialState);

    const store = useMemo(() => [state, dispatch], [state]);

    // TODO: Get value={store} instead
    return (
        <StoreContext.Provider value={state}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreProvider;
