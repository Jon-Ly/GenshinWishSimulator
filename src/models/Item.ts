import Character from "./Character";
import Weapon from "./Weapon";

export type Item = Character | Weapon;

export default class ItemBase {
    name: string;
    stars: number;
    chance: number;
    chancePretty: string;

    constructor(name: string, stars: number, chance: number) {
        this.name = name;
        this.stars = stars;
        this.chance = chance;

        this.chancePretty = `${chance*100}%`;
    }

    setChance = (newChance: number) => this.chance = newChance;
}