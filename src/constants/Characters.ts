import Character from "../models/Character";

const STARTING_CHARACTERS = {
    AMBER: new Character('Amber', 4, 0.5, 'Gliding Champion'),
    BARBARA: new Character('Barbara', 4, 0.5, 'Shining Idol'),
    KAEYA: new Character('Kaeya', 4, 0.5, 'Frostwind Swordsman'),
    LISA: new Character('Lisa', 4, 0.5, 'Witch of Purple Rose'),
    NOELLE: new Character('Noelle', 4, 0.5, 'Chivalric Blossom'),
    XIANGLING: new Character('Xiangling', 4, 0.5, 'Exquisite Delicacy'),
};

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
    new Character('Albedo', 5, 0.5, 'Kreideprinz', true),
    new Character('Amber', 4, 0.5, 'Gliding Champion'),
    new Character('Barbara', 4, 0.5, 'Shining Idol'),
    new Character('Beidou', 4, 0.5, 'Uncrowned Lord of Ocean'),
    new Character('Bennett', 4, 0.5, 'Trial by Fire'),
    new Character('Chongyun', 4, 0.5, 'Frozen Ardor'),
    new Character('Diluc', 5, 0.5, 'The Dark Side of Dawn'),
    new Character('Diona', 4, 0.5, 'Kätzlein Cocktail'),
    new Character('Fischl', 4, 0.5, 'Prinzessin der Veruteilung!'),
    new Character('Ganyu', 5, 0.5, 'Plenilune Gaze', true),
    new Character('Jean', 5, 0.5, 'Dandelion Knight'),
    new Character('Kaeya', 4, 0.5, 'Frostwind Swordsman'),
    new Character('Keqing', 5, 0.5, 'Driving Thunder'),
    new Character('Klee', 5, 0.5, 'Fleeing Sunlight', true),
    new Character('Lisa', 4, 0.5, 'Witch of Purple Rose'),
    new Character('Mona', 5, 0.5, 'Astral Reflection'),
    new Character('Ningguang', 4, 0.5, 'Eclipsing Star'),
    new Character('Noelle', 4, 0.5, 'Chivalric Blossom'),
    new Character('Qiqi', 5, 0.5, 'Icy Resurrection'),
    new Character('Razor', 4, 0.5, 'Wolf Boy'),
    new Character('Sucrose', 4, 0.5, 'Harmless Sweetie'),
    new Character('Tartaglia', 5, 0.5, 'Childe', true),
    new Character('Venti', 5, 0.5, 'Windborne Bard', true),
    new Character('Xiangling', 4, 0.5, 'Exquisite Delicacy'),
    new Character('Xingqui', 4, 0.5, 'Juvenile Galant'),
    new Character('Xingyan', 4, 0.5, 'Blazing Riff'),
    new Character('Xiao', 5, 0.5, 'Vigilant Yaksha'),
    new Character('Zhongli', 5, 0.5, 'Vago Mundo', true)
];

const FIVE_STAR_CHARACTERS = PLAYABLE_CHARACTERS_ARRAY.filter((c: Character) => c.stars === 5);
const FOUR_STAR_CHARACTERS = PLAYABLE_CHARACTERS_ARRAY.filter((c: Character) => c.stars === 4);

const PLAYABLE_CHARACTERS_TO_OBJ = (): {[index: string]: Character} => {
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