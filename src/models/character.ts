import ItemBase from "./item";

export default class Character extends ItemBase {
    elementType: string;
    isEventCharacter: boolean;
    title: string;

    constructor(name: string, stars: number, chance: number, title: string, elementType: string, isEventCharacter?: boolean, style?: {}) {
        super(name, stars, chance, 'Character', style);
        this.elementType = elementType;
        this.isEventCharacter = !!isEventCharacter;
        this.title = title || '';
    }
}
