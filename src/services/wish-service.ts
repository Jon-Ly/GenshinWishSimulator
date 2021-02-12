import BANNERS, { BANNER_CODE } from "../constants/banners";
import CHANCES from "../constants/chances";
import CHARACTERS from "../constants/characters";
import InitialUserData, { UserData } from "../constants/user-data";
import WEAPONS from "../constants/weapons";
import Character from "../models/character";
import { Item } from "../models/item"
import { WishState } from "../state-management/store";

export default class WishService {

    userData!: UserData;
    LOCAL_STORAGE_KEY = 'p2w'

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

    fetchUserData = (): UserData => {
        let data = localStorage.getItem(this.LOCAL_STORAGE_KEY) || '';

        if (!data) {
            this.initializeUserData();
            data = localStorage.getItem(this.LOCAL_STORAGE_KEY) || '';
        }

        return JSON.parse(data) as UserData;
    }

    randomFiveStar = (): Item => {
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

    randomFourStar = (): Item => {
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

    randomize = (): Item => {
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

    reset = (): UserData => {
        this.userData = {...InitialUserData, banner: this.userData.banner};
        this.saveUserDataToLocal();
        return this.userData;
    }

    setBanner = (newBanner: BANNER_CODE) => {
        this.userData.banner = newBanner;
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
        results.forEach((result: Item) => {
            const itemsLength = this.userData.items.length;
            let isMatchingItem = false;

            for (let i = 0; i < itemsLength; i++) {
                const item = this.userData.items[i];
                if (item.name === result.name) {
                    item.count += 1;
                    isMatchingItem = true;
                    break;
                }
            }

            if (!isMatchingItem) {
                this.userData.items.push({
                    name: result.name,
                    stars: result.stars,
                    count: 1
                });
            }
        });
    }

    private initializeUserData = (): void => {
        const data = localStorage.getItem(this.LOCAL_STORAGE_KEY) || '';

        if (!data) {
            localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(InitialUserData));
        }

        this.userData = data ? JSON.parse(data) : InitialUserData;
    }

    private saveUserDataToLocal = (): void => localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.userData));
}