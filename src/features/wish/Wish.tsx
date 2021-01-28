import { Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Banners, {BANNER_CODE} from '../../constants/Banners';
import CHARACTERS from '../../constants/Characters';
import WEAPONS from '../../constants/Weapons';

const CHANCES = {
    FIVE_STAR: 0.003,
    FOUR_STAR: 0.0255,
    FIVE_STAR_EVENT_CHARACTER: 0.5,
    FOUR_STAR_EVENT_CHARACTER: 0.5, //TODO: four-star event character needs tweaking
    EVENT_WEAPON: 0.75
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

 interface Item {
     name: string,
     image: string
 }

const Wish = (props: any) => {
    const [results, setResults] = useState<Array<Item>>([]);
    // const dispatch = useDispatch();
    const bannerState = {banner: BANNER_CODE.NONE};
    let wishState = {
        wishes: 0,
        eventFiveStarCharacterPity: 0,
        eventFourStarCharacterPity: 0,
        wanderlustFiveStarPity: 0,
        wanderlustFourStarPity: 0,
        eventFiveStarGuarantee: false,
        eventFourStarGuarantee: false
    };
    
    useEffect(() => {
        const items: Array<Item> = [];
        for (let i = 0; i < wishState.wishes; i++)
            items.push(randomize());
        setResults(items);
        // dispatch(setState(wishState));
    }, []);

    const randomize = (): Item => {
        if (bannerState.banner !== BANNER_CODE.NONE) {
            wishState.eventFiveStarCharacterPity += 1;
            wishState.eventFourStarCharacterPity += 1;
        } else {
            wishState.wanderlustFiveStarPity += 1;
            wishState.wanderlustFourStarPity += 1;
        }

        const overall_luck = Math.random();
        const isFiveStar = overall_luck <= CHANCES.FIVE_STAR * 2 || wishState.eventFiveStarGuarantee || 
            wishState.wanderlustFiveStarPity >= 90 || wishState.eventFiveStarCharacterPity >= 90;
        const isFourStar = (overall_luck <= CHANCES.FOUR_STAR * 2 && overall_luck > CHANCES.FIVE_STAR * 2) || 
            wishState.wanderlustFourStarPity >= 10 || wishState.eventFourStarCharacterPity >= 10;

        if (isFiveStar) {
            return randomFiveStar();
        } else if (isFourStar) {
            return randomFourStar();
        } else {
            return {name: '3 star character', image: ''};
        }
    }

    const randomFiveStar = () => {
        const fiveStarLuck = Math.random();
        const isEventCharacter = bannerState.banner !== BANNER_CODE.NONE && (fiveStarLuck >= CHANCES.FIVE_STAR_EVENT_CHARACTER || wishState.eventFiveStarGuarantee);

        if (isEventCharacter) {
            const eventCharacter = Banners.find(b => b.code === bannerState.banner)?.eventFiveStar;
            wishState.eventFiveStarCharacterPity = 0;
            wishState.eventFiveStarGuarantee = false;
            return {name: eventCharacter?.name || '', image: `../genshin_assets/character_${eventCharacter?.name.toLowerCase()}.png`};
        } else {
            let fiveStars: Array<any> = [...CHARACTERS.WANDERLUST_FIVE_STAR_CHARACTERS];

            if (bannerState.banner === BANNER_CODE.NONE) {
                fiveStars = [...fiveStars, ...WEAPONS.WANDERLUST_FIVE_STAR_WEAPONS];
            }

            let fiveStarIndex = Math.floor(Math.random() * (fiveStars.length + 1));
            while (fiveStarIndex === fiveStars.length) {
                fiveStarIndex = Math.floor(Math.random() * (fiveStars.length + 1));
            }
            const item = fiveStars[fiveStarIndex];

            if (bannerState.banner !== BANNER_CODE.NONE) {
                wishState.eventFiveStarGuarantee = true;
            } else {
                wishState.wanderlustFiveStarPity = 0;
            }

            return {name: item.name, image:
                item.title ? `../genshin_assets/character_${fiveStars[fiveStarIndex].name.toLowerCase()}.png` : 'WEAPON.png'};
        }
    }

    const randomFourStar = () => {
        const fourStarLuck = Math.random();
        const isEventCharacter = bannerState.banner !== BANNER_CODE.NONE && (fourStarLuck >= CHANCES.FOUR_STAR_EVENT_CHARACTER || wishState.eventFourStarGuarantee);
        const banner = Banners.find(b => b.code === bannerState.banner);

        if (isEventCharacter) {
            // TODO: Give more weight to the 4 star characters for event banner
            // TODO: Include all other eligible 4 star characters
            const eventFourStarCharacters = banner?.eventFourStars || [];
            
            let fourStarIndex = Math.floor(Math.random() * (eventFourStarCharacters.length + 1));
            while (fourStarIndex === eventFourStarCharacters.length) {
                fourStarIndex = Math.floor(Math.random() * (eventFourStarCharacters.length + 1));
            }
            const fourStarCharacter = eventFourStarCharacters[fourStarIndex];
            // const eventFourStarCharacterNames = banner?.eventFourStars?.map((c: Character) => c.name);
            
            // wishState.eventFourStarGuarantee = eventFourStarCharacterNames?.indexOf(fourStarCharacter.name) !== -1;
            wishState.eventFourStarGuarantee = false;
            wishState.eventFourStarCharacterPity = 0;

            return {name: fourStarCharacter.name, image: `../genshin_assets/character_${fourStarCharacter.name.toLowerCase()}.png`};
        } else {
            const fourStarCharacters = [...banner?.eventFourStars || [], ...banner?.fourStars || []];

            let fourStarIndex = Math.floor(Math.random() * (fourStarCharacters.length + 1));
            while (fourStarIndex === fourStarCharacters.length) {
                fourStarIndex = Math.floor(Math.random() * (fourStarCharacters.length + 1));
            }
            const fourStarCharacter = fourStarCharacters[fourStarIndex];


            if (bannerState.banner !== BANNER_CODE.NONE) {
                wishState.eventFourStarGuarantee = true;
            } else {
                wishState.wanderlustFourStarPity = 0;
            }

            return {name: fourStarCharacter.name, image: `../genshin_assets/character_${fourStarCharacter.name.toLowerCase()}.png`};
        }
    }

    return (
        <>
            {
                results.map((result, index) => {
                    return (
                        <div key={result.name + index}>
                            <h1>{result.name}</h1>
                            <img src={result.image} alt={`IMAGE-${result.name}`}/>
                        </div>
                    )
                })
            }
            {/* <Button onClick={() => dispatch(toggleIsWishing(false))}>Go Back</Button> */}
        </>
    )
}

export default Wish;
