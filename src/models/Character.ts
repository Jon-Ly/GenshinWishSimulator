export default class Character {
    name: string;
    stars: number;
    chance: number;
    hasBanner: boolean;
    chancePretty: string;

    constructor(name: string, stars: number, chance: number, hasBanner: boolean) {
        this.name = name;
        this.stars = stars;
        this.chance = chance;
        this.hasBanner = hasBanner;

        this.chancePretty = `${chance*100}%`;
    }

    setChance = (newChance: number) => this.chance = newChance;
}