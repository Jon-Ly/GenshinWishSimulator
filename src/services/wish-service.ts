import BANNERS, { BANNER_CODE } from "../constants/banners";
import CHANCES from "../constants/chances";
import CHARACTERS from "../constants/characters";
import HISTORY_TYPE from "../constants/history-type";
import LOCAL_STORAGE_KEY from "../constants/local-storage-keys";
import { IPrimoTopUp } from "../constants/primo-top-ups";
import InitialUserData, { ItemData, UserData } from "../constants/user-data";
import WEAPONS from "../constants/weapons";
import Character from "../models/character";
import { Item } from "../models/item"
import { WishState } from "../state-management/store";

export default class WishService {

    userData!: UserData;

    /**
     * 
     * 0.3% - 5 Star Character
     * 0.3% - 5 Star Weapon
     * 2.55% - 4 Star Character
     * 2.55% - 4 Star Weapon
     * Every 10 Rolls = 4 Star
     * Every 90 Rolls = 5 Star
     * 
     * Weapon/Character Event Rules
     * 50% - Advertised 5 Star for the first time you win a 5 star
     * 50% - All advertised 4 Star for the first time you win a 4 star
     * If 5 Star is not the advertised Character, the next 5 star will be the advertised Character.
     * If 4 Star is not the advertised Characters, the next 4 star will be one of the advertised Characters.
     */

    constructor() {
        this.initializeUserData();
    }

    getUserData = (): UserData => {
        let data = localStorage.getItem(LOCAL_STORAGE_KEY.UserData) || '';

        if (!data) {
            this.initializeUserData();
            data = localStorage.getItem(LOCAL_STORAGE_KEY.UserData) || '';
        }

        return JSON.parse(data) as UserData;
    }

    pay = (topUpOption: IPrimoTopUp): UserData => {
        const topUpPrimogems = topUpOption.primogems;

        if (this.userData.firstTimeBonus[0] && topUpPrimogems === 60) {
            this.userData.primogems += topUpOption.primogems * 2;
            this.userData.firstTimeBonus[0] = false;
        } else if (this.userData.firstTimeBonus[1] && topUpPrimogems === 300) {
            this.userData.primogems += topUpOption.primogems * 2;
            this.userData.firstTimeBonus[1] = false;
        } else if (this.userData.firstTimeBonus[2] && topUpPrimogems === 980) {
            this.userData.primogems += topUpOption.primogems * 2;
            this.userData.firstTimeBonus[2] = false;
        } else if (this.userData.firstTimeBonus[3] && topUpPrimogems === 1980) {
            this.userData.primogems += topUpOption.primogems * 2;
            this.userData.firstTimeBonus[3] = false;
        } else if (this.userData.firstTimeBonus[4] && topUpPrimogems === 3280) {
            this.userData.primogems += topUpOption.primogems * 2;
            this.userData.firstTimeBonus[4] = false;
        } else if (this.userData.firstTimeBonus[5] && topUpPrimogems === 6480) {
            this.userData.primogems += topUpOption.primogems * 2;
            this.userData.firstTimeBonus[5] = false;
        } else {
            this.userData.primogems += topUpOption.primogems + topUpOption.bonus;
        }

        this.saveUserDataToLocal();

        return this.userData;
    }

    reset = (): UserData => {
        this.userData = {...InitialUserData, banner: this.userData.banner};
        this.saveUserDataToLocal();
        return this.userData;
    }

    setBanner = (newBanner: BANNER_CODE) => {
        this.userData.banner = newBanner;
        localStorage.setItem(LOCAL_STORAGE_KEY.HistoryType, newBanner === BANNER_CODE.WANDERLUST ? HISTORY_TYPE.WANDERLUST : HISTORY_TYPE.CHARACTER_EVENT);
        this.saveUserDataToLocal();
    }

    wish = (wishes: number): WishState => {
        const results = new Array<Item>();

        for (let i = 0; i < wishes; i++) {
            results.push(this.randomize());
        }

        this.addItemsToUserData(results);
        this.saveUserDataToLocal();

        return {...this.userData, results: results};
    }

    private addItemsToUserData = (results: Array<Item>): void => {
        var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 19).replace('T', ' ');
        results.forEach((result: Item) => {
            this.userData.items.unshift({
                name: result.name,
                stars: result.stars,
                timestamp: localISOTime,
                banner: this.userData.banner,
                type: result.chance === 0.5 ? 'Character' : 'Weapon'
            })
        });
    }

    private initializeUserData = (): void => {
        const data = localStorage.getItem(LOCAL_STORAGE_KEY.UserData) || '';

        if (!data) {
            localStorage.setItem(LOCAL_STORAGE_KEY.UserData, JSON.stringify(InitialUserData));
        }

        this.userData = data ? JSON.parse(data) : InitialUserData;
    }

    private randomFiveStar = (): Item => {
        const fiveStarLuck = Math.random();
        const isEventCharacter = this.userData.banner !== BANNER_CODE.WANDERLUST && (fiveStarLuck >= CHANCES.FIVE_STAR_EVENT_CHARACTER || this.userData.eventFiveStarGuarantee);

        if (isEventCharacter) {
            this.userData.eventFiveStarCharacterPity = 0;
            this.userData.eventFiveStarGuarantee = false;
            return BANNERS.find(b => b.code === this.userData.banner)?.eventFiveStar as Character;
        } else {
            let fiveStars: Array<Item> = [...CHARACTERS.WANDERLUST_FIVE_STAR_CHARACTERS];

            if (this.userData.banner === BANNER_CODE.WANDERLUST) {
                fiveStars = [...fiveStars, ...WEAPONS.WANDERLUST_FIVE_STAR_WEAPONS];
            }

            const fiveStarIndex = Math.floor(Math.random() * (fiveStars.length));

            if (this.userData.banner !== BANNER_CODE.WANDERLUST) {
                this.userData.eventFiveStarCharacterPity = 0;
                this.userData.eventFiveStarGuarantee = true;
            } else {
                this.userData.wanderlustFiveStarPity = 0;
            }

            return fiveStars[fiveStarIndex];
        }
    }

    private randomFourStar = (): Item => {
        const fourStarLuck = Math.random();
        const isEventCharacter = this.userData.banner !== BANNER_CODE.WANDERLUST && (fourStarLuck >= CHANCES.FOUR_STAR_EVENT_CHARACTER || this.userData.eventFourStarGuarantee);
        const currentBanner = BANNERS.find(b => b.code === this.userData.banner);

        if (isEventCharacter) {
            const eventFourStarCharacters = currentBanner?.eventFourStars || [];
            
            const fourStarIndex = Math.floor(Math.random() * (eventFourStarCharacters.length));

            this.userData.eventFourStarCharacterPity = 0;
            this.userData.eventFourStarGuarantee = false;

            return eventFourStarCharacters[fourStarIndex];
        } else {
            const fourStarCharacters = currentBanner?.fourStars || [];

            const fourStarIndex = Math.floor(Math.random() * (fourStarCharacters.length));

            if (this.userData.banner !== BANNER_CODE.WANDERLUST) {
                this.userData.eventFourStarCharacterPity = 0;
                this.userData.eventFourStarGuarantee = true;
            } else {
                this.userData.wanderlustFourStarPity = 0;
            }

            return fourStarCharacters[fourStarIndex];
        }
    }

    private randomize = (): Item => {
        if (this.userData.banner !== BANNER_CODE.WANDERLUST) {
            this.userData.eventFiveStarCharacterPity += 1;
            this.userData.eventFourStarCharacterPity += 1;
        } else {
            this.userData.wanderlustFiveStarPity += 1;
            this.userData.wanderlustFourStarPity += 1;
        }

        const overall_luck = Math.random();
        const isFiveStar = overall_luck <= CHANCES.FIVE_STAR * 2 || this.userData.eventFiveStarGuarantee || 
            (this.userData.banner === BANNER_CODE.WANDERLUST && this.userData.wanderlustFiveStarPity >= 90) || 
            (this.userData.banner !== BANNER_CODE.WANDERLUST && this.userData.eventFiveStarCharacterPity >= 90);
        const isFourStar = (overall_luck <= CHANCES.FOUR_STAR * 2 && overall_luck > CHANCES.FIVE_STAR * 2) || 
            (this.userData.banner === BANNER_CODE.WANDERLUST && this.userData.wanderlustFourStarPity >= 10) || 
            (this.userData.banner !== BANNER_CODE.WANDERLUST && this.userData.eventFourStarCharacterPity >= 10);

        const threeStarIndex = Math.floor(Math.random() * WEAPONS.THREE_STAR_WEAPONS.length);

        this.userData.primogems -= 160;

        return isFiveStar ? this.randomFiveStar() :
            isFourStar ? this.randomFourStar() :
            WEAPONS.THREE_STAR_WEAPONS[threeStarIndex];
    }

    private saveUserDataToLocal = (): void => localStorage.setItem(LOCAL_STORAGE_KEY.UserData, JSON.stringify(this.userData));
}