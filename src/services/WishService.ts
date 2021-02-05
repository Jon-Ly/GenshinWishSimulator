import BANNERS, { BANNER_CODE } from "../constants/Banners";
import CHARACTERS from "../constants/Characters";
import InitialUserData, { UserData } from "../constants/UserData";
import WEAPONS from "../constants/Weapons";
import Character from "../models/Character";
import { Item } from "../models/Item"
import Weapon from "../models/Weapon";

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
    CHANCES = {
        FIVE_STAR: 0.003,
        FOUR_STAR: 0.0255,
        FIVE_STAR_EVENT_CHARACTER: 0.5,
        FOUR_STAR_EVENT_CHARACTER: 0.5, //TODO: four-star event character needs tweaking
        EVENT_WEAPON: 0.75
    }

    constructor() {
        this.setUserData();
    }

    fetchUserData = (): UserData => {
        let data = localStorage.getItem(this.LOCAL_STORAGE_KEY) || '';

        if (!data) {
            this.setUserData();
            data = localStorage.getItem(this.LOCAL_STORAGE_KEY) || '';
        }

        return JSON.parse(data) as UserData;
    }

    randomFiveStar = (): Item => {
        const fiveStarLuck = Math.random();
        const isEventCharacter = this.userData.banner !== BANNER_CODE.WANDERLUST && (fiveStarLuck >= this.CHANCES.FIVE_STAR_EVENT_CHARACTER || this.userData.eventFiveStarGuarantee);

        if (isEventCharacter) {
            this.userData.eventFiveStarCharacterPity = 0;
            this.userData.eventFiveStarGuarantee = false;
            return BANNERS.find(b => b.code === this.userData.banner)?.eventFiveStar as Character;
        } else {
            let fiveStars: Array<Item> = [...CHARACTERS.WANDERLUST_FIVE_STAR_CHARACTERS];

            if (this.userData.banner === BANNER_CODE.WANDERLUST) {
                fiveStars = [...fiveStars, ...WEAPONS.WANDERLUST_FIVE_STAR_WEAPONS];
            }

            let fiveStarIndex = Math.floor(Math.random() * (fiveStars.length + 1));
            while (fiveStarIndex === fiveStars.length) {
                fiveStarIndex = Math.floor(Math.random() * (fiveStars.length + 1));
            }

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
        const isEventCharacter = this.userData.banner !== BANNER_CODE.WANDERLUST && (fourStarLuck >= this.CHANCES.FOUR_STAR_EVENT_CHARACTER || this.userData.eventFourStarGuarantee);
        const currentBanner = BANNERS.find(b => b.code === this.userData.banner);

        if (isEventCharacter) {
            // TODO: Give more weight to the 4 star characters for event banner
            // TODO: Include all other eligible 4 star characters
            const eventFourStarCharacters = currentBanner?.eventFourStars || [];
            
            let fourStarIndex = Math.floor(Math.random() * (eventFourStarCharacters.length + 1));
            while (fourStarIndex === eventFourStarCharacters.length) {
                fourStarIndex = Math.floor(Math.random() * (eventFourStarCharacters.length + 1));
            }
            // const eventFourStarCharacterNames = banner?.eventFourStars?.map((c: Character) => c.name);
            
            // this.userData.eventFourStarGuarantee = eventFourStarCharacterNames?.indexOf(fourStarCharacter.name) !== -1;
            this.userData.eventFourStarCharacterPity = 0;
            this.userData.eventFourStarGuarantee = false;

            return eventFourStarCharacters[fourStarIndex];
        } else {
            const fourStarCharacters = [...currentBanner?.eventFourStars || [], ...currentBanner?.fourStars || []];

            let fourStarIndex = Math.floor(Math.random() * (fourStarCharacters.length + 1));
            while (fourStarIndex === fourStarCharacters.length) {
                fourStarIndex = Math.floor(Math.random() * (fourStarCharacters.length + 1));
            }

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
        const isFiveStar = overall_luck <= this.CHANCES.FIVE_STAR * 2 || this.userData.eventFiveStarGuarantee || 
            (this.userData.banner === BANNER_CODE.WANDERLUST && this.userData.wanderlustFiveStarPity >= 90) || 
            (this.userData.banner !== BANNER_CODE.WANDERLUST && this.userData.eventFiveStarCharacterPity >= 90);
        const isFourStar = (overall_luck <= this.CHANCES.FOUR_STAR * 2 && overall_luck > this.CHANCES.FIVE_STAR * 2) || 
            (this.userData.banner === BANNER_CODE.WANDERLUST && this.userData.wanderlustFourStarPity >= 10) || 
            (this.userData.banner !== BANNER_CODE.WANDERLUST && this.userData.eventFourStarCharacterPity >= 10);

        return isFiveStar ? this.randomFiveStar() :
            isFourStar ? this.randomFourStar() :
            new Weapon('3 star weapon', 3, 0);
    }

    reset = () => localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(InitialUserData));

    setBanner = (newBanner: BANNER_CODE) => {
        this.userData.banner = newBanner;
        this.saveUserData();
    }

    wish = (wishes: number): Array<Item> => {
        const results = new Array<Item>();

        for (let i = 0; i < wishes; i++) {
            results.push(this.randomize());
        }

        this.addItemsToUser(results);
        this.saveUserData();

        return results;
    }

    private addItemsToUser = (results: Array<Item>): void => {
        results.forEach((result: Item) => {
            const itemsLength = this.userData.items.length;
            let isMatching = false;

            for (let i = 0; i < itemsLength; i++) {
                const item = this.userData.items[i];
                if (item.name === result.name) {
                    item.count += 1;
                    isMatching = true;
                    break;
                }
            }

            if (!isMatching) {
                this.userData.items.push({
                    name: result.name,
                    stars: result.stars,
                    count: 1
                });
            }
        });
    }

    private saveUserData = (): void => localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.userData));

    private setUserData = (): void => {
        const data = localStorage.getItem(this.LOCAL_STORAGE_KEY) || '';

        if (!data) {
            localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(InitialUserData));
        }

        this.userData = data ? JSON.parse(data) : InitialUserData;
    }
}