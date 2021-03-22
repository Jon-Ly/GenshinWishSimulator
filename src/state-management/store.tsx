import React from 'react';
import { UserData } from '../constants/user-data';
import { Item } from '../models/item';
import WishService from '../services/wish-service';
import reducer, { Action } from './reducer';

export interface WishState extends UserData{
    results: Array<Item>,
    isMute: boolean
}

const initIsMuted = localStorage.getItem('muted') === 'true';

type Dispatch = (action: Action) => void;

const wishService = new WishService();

const initialState = {...wishService.getUserData(), results: new Array<Item>(), isMute: initIsMuted};

const StateContext = React.createContext<WishState>(initialState);
const DispatchContext = React.createContext<Dispatch |  undefined>(undefined);

const StoreProvider = ({children}: any) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                {children}
            </DispatchContext.Provider>
        </StateContext.Provider>
    )
}

const useWishState = () => {
    const context = React.useContext(StateContext);

    if (!context) {
        throw Error('useWishState must be used within a provider');
    }

    return context;
}

const useWishDispatch = () => {
    const context = React.useContext(DispatchContext);

    if (!context) {
        throw Error('useWishDispatch must be used within a provider');
    }

    return context;
}

export {StoreProvider, useWishState, useWishDispatch};
