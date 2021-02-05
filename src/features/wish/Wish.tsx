import { Button } from '@chakra-ui/react';
import React from 'react';
import PATHS from '../../constants/Paths';
import { useWishState } from '../../state-management/store';

interface WishProps {
    setIsWishing: (isWishing: boolean) => void
}

const Wish = (props: WishProps) => {
    const state = useWishState();
    const { setIsWishing } = props;

    const getImageSource = (name: string): string => `${PATHS.CHARACTER_WISH_IMAGES}/character_${name.toLowerCase()}.png`;

    return (
        <>
            {
                state.results.map((result, index) => {
                    return (
                        <div key={result.name + index}>
                            <h1>{result.name}</h1>
                            <img src={getImageSource(result.name)} alt={`IMAGE-${result.name}`}/>
                        </div>
                    )
                })
            }
            <Button onClick={() => setIsWishing(false)}>Go Back</Button>
        </>
    )
}

export default Wish;
