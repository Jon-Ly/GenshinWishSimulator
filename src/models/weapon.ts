import ItemBase from "./item";

export default class Weapon extends ItemBase { 
    constructor(name: string, stars: number, chance: number, style?: {}) {
        super(name, stars, chance, 'Weapon', style);
    }
}
