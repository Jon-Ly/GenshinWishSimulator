import Character from "../models/character";
import ELEMENT from "./elements";

const WANDERLUST_CHARACTERS = [
    'Jean',
    'Qiqi',
    'Keqing',
    'Mona',
    'Diluc',
    'Sucrose',
    'Diona',
    'Chongyun',
    'Kaeya',
    'Fischl',
    'Beidou',
    'Razor',
    'Lisa',
    'Noelle',
    'Ningguang',
    'Xingqui',
    'Barbara',
    'Xingyan',
    'Bennett',
    'Xiangling',
    'Amber'
];

const EVENT_CHARACTERS = [
    'Sucrose',
    'Diona',
    'Chongyun',
    'Fischl',
    'Beidou',
    'Razor',
    'Noelle',
    'Ningguang',
    'Xingqui',
    'Barbara',
    'Xingyan',
    'Bennett',
    'Xiangling'
]

const PLAYABLE_CHARACTERS_ARRAY = [
    new Character('Albedo', 5, 0.5, 'Kreideprinz', ELEMENT.GEO, true),
    new Character('Amber', 4, 0.5, 'Gliding Champion', ELEMENT.PYRO),
    new Character('Barbara', 4, 0.5, 'Shining Idol', ELEMENT.HYDRO),
    new Character('Beidou', 4, 0.5, 'Uncrowned Lord of Ocean', ELEMENT.ELECTRO),
    new Character('Bennett', 4, 0.5, 'Trial by Fire', ELEMENT.PYRO),
    new Character('Chongyun', 4, 0.5, 'Frozen Ardor', ELEMENT.CRYO),
    new Character('Diluc', 5, 0.5, 'The Dark Side of Dawn', ELEMENT.PYRO),
    new Character('Diona', 4, 0.5, 'Kätzlein Cocktail', ELEMENT.CRYO),
    new Character('Fischl', 4, 0.5, 'Prinzessin der Veruteilung!', ELEMENT.ELECTRO),
    new Character('Ganyu', 5, 0.5, 'Plenilune Gaze', ELEMENT.CRYO, true),
    new Character('Jean', 5, 0.5, 'Dandelion Knight', ELEMENT.ANEMO),
    new Character('Kaeya', 4, 0.5, 'Frostwind Swordsman', ELEMENT.CRYO),
    new Character('Keqing', 5, 0.5, 'Driving Thunder', ELEMENT.ELECTRO),
    new Character('Klee', 5, 0.5, 'Fleeing Sunlight', ELEMENT.PYRO, true),
    new Character('Lisa', 4, 0.5, 'Witch of Purple Rose', ELEMENT.ELECTRO),
    new Character('Mona', 5, 0.5, 'Astral Reflection', ELEMENT.HYDRO),
    new Character('Ningguang', 4, 0.5, 'Eclipsing Star', ELEMENT.GEO),
    new Character('Noelle', 4, 0.5, 'Chivalric Blossom', ELEMENT.GEO),
    new Character('Qiqi', 5, 0.5, 'Icy Resurrection', ELEMENT.CRYO),
    new Character('Razor', 4, 0.5, 'Wolf Boy', ELEMENT.ELECTRO),
    new Character('Sucrose', 4, 0.5, 'Harmless Sweetie', ELEMENT.ANEMO),
    new Character('Tartaglia', 5, 0.5, 'Childe', ELEMENT.HYDRO, true),
    new Character('Venti', 5, 0.5, 'Windborne Bard', ELEMENT.ANEMO, true),
    new Character('Xiangling', 4, 0.5, 'Exquisite Delicacy', ELEMENT.PYRO),
    new Character('Xingqui', 4, 0.5, 'Juvenile Galant', ELEMENT.HYDRO),
    new Character('Xingyan', 4, 0.5, 'Blazing Riff', ELEMENT.PYRO),
    new Character('Xiao', 5, 0.5, 'Vigilant Yaksha', ELEMENT.ANEMO),
    new Character('Zhongli', 5, 0.5, 'Vago Mundo', ELEMENT.GEO, true)
];

const STARTING_CHARACTERS = {
    AMBER: new Character('Amber', 4, 0.5, 'Gliding Champion', ELEMENT.PYRO),
    BARBARA: new Character('Barbara', 4, 0.5, 'Shining Idol', ELEMENT.HYDRO),
    KAEYA: new Character('Kaeya', 4, 0.5, 'Frostwind Swordsman', ELEMENT.CRYO),
    LISA: new Character('Lisa', 4, 0.5, 'Witch of Purple Rose', ELEMENT.ELECTRO),
    NOELLE: new Character('Noelle', 4, 0.5, 'Chivalric Blossom', ELEMENT.GEO),
    XIANGLING: new Character('Xiangling', 4, 0.5, 'Exquisite Delicacy', ELEMENT.PYRO)
};

const FIVE_STAR_CHARACTERS = PLAYABLE_CHARACTERS_ARRAY.filter((c: Character) => c.stars === 5);
const FOUR_STAR_CHARACTERS = PLAYABLE_CHARACTERS_ARRAY.filter((c: Character) => c.stars === 4);

const PLAYABLE_CHARACTERS_TO_OBJ = () => {
    const result: {[index: string]: Character} = {};

    PLAYABLE_CHARACTERS_ARRAY.forEach((c: Character) => {
        result[c.name.toUpperCase()] = c;
    });
    return result;
}

const EVENT_FIVE_STAR_CHARACTERS = PLAYABLE_CHARACTERS_ARRAY.filter((c: Character) => c.isEventCharacter);
const EVENT_FOUR_STAR_CHARACTERS = PLAYABLE_CHARACTERS_ARRAY.filter((c: Character) => EVENT_CHARACTERS.indexOf(c.name) !== -1 && c.stars === 4);

const WANDERLUST_FIVE_STAR_CHARACTERS = PLAYABLE_CHARACTERS_ARRAY.filter((c: Character) => {
    return WANDERLUST_CHARACTERS.indexOf(c.name) !== -1 && c.stars === 5;
});

const WANDERLUST_FOUR_STAR_CHARACTERS = PLAYABLE_CHARACTERS_ARRAY.filter((c: Character) => {
    return WANDERLUST_CHARACTERS.indexOf(c.name) !== -1 && c.stars === 4;
});

const CHARACTERS = {
    EVENT_FIVE_STAR_CHARACTERS: EVENT_FIVE_STAR_CHARACTERS,
    EVENT_FOUR_STAR_CHARACTERS: EVENT_FOUR_STAR_CHARACTERS,
    FIVE_STAR_CHARACTERS: FIVE_STAR_CHARACTERS,
    FOUR_STAR_CHARACTERS: FOUR_STAR_CHARACTERS,
    PLAYABLE_CHARACTERS_ARRAY: PLAYABLE_CHARACTERS_ARRAY,
    PLAYABLE_CHARACTERS: PLAYABLE_CHARACTERS_TO_OBJ(),
    STARTING_CHARACTERS: STARTING_CHARACTERS,
    WANDERLUST_FIVE_STAR_CHARACTERS: WANDERLUST_FIVE_STAR_CHARACTERS,
    WANDERLUST_FOUR_STAR_CHARACTERS: WANDERLUST_FOUR_STAR_CHARACTERS
};

export default CHARACTERS;