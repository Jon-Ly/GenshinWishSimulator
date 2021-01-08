import { Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {BANNER_CODES, Banners} from '../constants/Banners';
import WISH_TYPE from '../constants/WishType';
import Character from '../models/Character';

export interface WishProps {
    wishes: number;
    type: WISH_TYPE;
    banner: BANNER_CODES;
    toggleView: () => void;
}

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

const Wish = (props: WishProps) => {
    let allCharacters = new Array<Character>();
    let fourStarCharacters = new Array<Character>();
    let fiveStarCharacters = new Array<Character>();
    let bannerFiveStarCharacters = new Array<Character>();

    const [results, setResults] = useState([]);
    const [character, setCharacter] = useState(''); // Temporary
    const [image, setImage] = useState(''); // Temporary

    useEffect(() => {
        fetch('./characters.json')
        .then(response => response.json())
        .then((result: {characters: Array<Character>}) => {
            allCharacters = result.characters;
            fourStarCharacters = result.characters.filter((c: Character) => c.stars === 4);
            fiveStarCharacters = result.characters.filter((c: Character) => c.stars === 5 && !c.hasBanner);
            bannerFiveStarCharacters = result.characters.filter((c: Character) => c.stars === 5 && c.hasBanner);
            randomize();
        });
    }, []);

    const randomize = () => {
        const overall_luck = Math.random();
        // TODO: Ensure at 90 rolls, 5 star is given
        if (overall_luck >= 0.97) { // 5 star character
            const five_star_luck = Math.random()
            // TODO: needs to be 50 percent only if haven't gotten advertised yet
            if (props.banner != BANNER_CODES.NONE && five_star_luck >= 0.5) { // 5 star advertised
                const five_star_character = Banners.find(b => b.code === props.banner);
                setCharacter(five_star_character?.fiveStar || '');
                setImage(`../genshin_assets/character_${five_star_character?.fiveStar.toLowerCase()}.png` || '');
            } else { // 5 star 
                let five_star_index = Math.floor(Math.random() * (fiveStarCharacters.length + 1));
                while (five_star_index === fiveStarCharacters.length) {
                    five_star_index = Math.floor(Math.random() * (fiveStarCharacters.length + 1));
                }
                setCharacter(fiveStarCharacters[five_star_index].name);
                setImage(`../genshin_assets/character_${fiveStarCharacters[five_star_index].name.toLowerCase()}.png`);
            }

        } else if (overall_luck < 0.97 && overall_luck >= 0.94) { // 5 star weapon
            setCharacter('5 star weapon');
            // TODO: Ensure at 10 rolls, 4 star is given
        } else if (overall_luck < 0.94 && overall_luck >= 0.9145) { // 4 star character
            setCharacter('4 star character');
        } else if (overall_luck > 0.9145 && overall_luck >= 0.889) { // 4 star weapon
            setCharacter('4 star weapon');
        } else { // 3 star
            setCharacter('3 star wepaon');
        }
    }

    return (
        <div>
            <h1>{character}</h1>
            <img src={image} alt=''/>
            <Button onClick={() => props.toggleView()}>Go Back</Button>
        </div>
    )
}

export default Wish;
