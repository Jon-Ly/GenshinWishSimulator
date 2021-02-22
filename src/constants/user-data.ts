import { BANNER_CODE } from "./banners";

export interface ItemData {
    name: string,
    stars: number,
    timestamp?: string,
    banner?: BANNER_CODE,
    type: 'Character' | 'Weapon'
}

export interface UserData {
    items: Array<ItemData>,
    eventFiveStarGuarantee: boolean,
    eventFourStarGuarantee: boolean,
    eventFiveStarCharacterPity: number,
    eventFourStarCharacterPity: number,
    wanderlustFiveStarPity: number,
    wanderlustFourStarPity: number,
    moneySpent: number,
    primogems: number,
    stardust: number,
    starglitter: number,
    banner: BANNER_CODE,
    firstTimeBonus: Array<boolean>
}

const InitialUserData: UserData = {
    items: [
        {
            name: 'Amber',
            stars: 4,
            type: 'Character'
        },
        {
            name: 'Barbara',
            stars: 4,
            type: 'Character'
        },
        {
            name: 'Kaeya',
            stars: 4,
            type: 'Character'
        },
        {
            name: 'Lisa',
            stars: 4,
            type: 'Character'
        },
        {
            name: 'Noelle',
            stars: 4,
            type: 'Character'
        },
        {
            name: 'Xiangling',
            stars: 4,
            type: 'Character'
        }
    ],
    eventFiveStarGuarantee: false,
    eventFourStarGuarantee: false,
    eventFiveStarCharacterPity: 0,
    eventFourStarCharacterPity: 0,
    wanderlustFiveStarPity: 0,
    wanderlustFourStarPity: 0,
    moneySpent: 0,
    primogems: 0,
    stardust: 0,
    starglitter: 0,
    banner: BANNER_CODE.VENTI,
    firstTimeBonus: [true, true, true, true, true, true]
};

export default InitialUserData;
