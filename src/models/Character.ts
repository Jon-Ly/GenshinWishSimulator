import ItemBase from "./ItemBase";

export default class Character extends ItemBase{
    title: string;
    isEventCharacter: boolean;

    constructor(name: string, stars: number, chance: number, title?: string, isEventCharacter?: boolean) {
        super(name, stars, chance);
        this.title = title || '';
        this.isEventCharacter = !!isEventCharacter;
    }
}
