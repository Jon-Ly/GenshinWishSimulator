import { Button, Image } from '@chakra-ui/react';
import React, { useState } from 'react';
import PATHS from '../../constants/Paths';
import { Item } from '../../models/Item';
import { useWishState } from '../../state-management/store';

interface WishProps {
    setIsWishing: (isWishing: boolean) => void
}

const Wish = (props: WishProps) => {
    const [hasVideoEnded, setHasVideoEnded] = useState(false);
    const state = useWishState();
    const { setIsWishing } = props;

    const getImageSource = (name: string): string => `${PATHS.CHARACTER_WISH_IMAGES}/character_${name.toLowerCase()}.png`;

    const getVideoPath = () => {
        const hasFiveStar = state.results.some((item: Item) => item.stars === 5);

        if (hasFiveStar)
            return `${PATHS.VIDEOS}/five_star.mp4`;
        
        const hasFourStar = state.results.some((item: Item) => item.stars === 4);

        if (hasFourStar)
            return `${PATHS.VIDEOS}/four_star.mp4`;
        
        return `${PATHS.VIDEOS}/three_star.mp4`;
    }

    return (
        <div style={{overflowY: 'hidden'}}>
            {
                !hasVideoEnded ?
                (
                    <video autoPlay={true} onEnded={() => setHasVideoEnded(true)}>
                        <source src={getVideoPath()}/>
                    </video>
                ) : null
            }
            {
                hasVideoEnded ? state.results.map((result, index) => {
                    return (
                        <div key={result.name + index}>
                            <h1>{result.name}</h1>
                            <Image src={getImageSource(result.name)} alt={`IMAGE-${result.name}`}/>
                        </div>
                    )
                }) : null
            }
            <Button onClick={() => setIsWishing(false)}>Go Back</Button>
        </div>
    );
}

export default Wish;
