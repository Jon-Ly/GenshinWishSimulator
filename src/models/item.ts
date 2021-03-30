import Character from "./character";
import Weapon from "./weapon";

export type Item = Character | Weapon;

export default class ItemBase {
    name: string;
    stars: number;
    chance: number;
    chancePretty: string;
    type: 'Character' | 'Weapon';
    style?: {};

    constructor(name: string, stars: number, chance: number, type: 'Character' | 'Weapon', style?: {}) {
        this.name = name;
        this.stars = stars;
        this.chance = chance;
        this.type = type;
        this.style = style;

        this.chancePretty = `${chance*100}%`;
    }

    setChance = (newChance: number) => this.chance = newChance;
}