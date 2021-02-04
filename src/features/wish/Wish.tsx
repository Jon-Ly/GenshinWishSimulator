import { Button } from '@chakra-ui/react';
import React from 'react';
import { useWishState } from '../../state-management/store';

interface WishProps {
    setIsWishing: (isWishing: boolean) => void
}

const Wish = (props: WishProps) => {
    const state = useWishState();
    const { setIsWishing } = props;

    const getImage = (name: string): string => `../genshin_assets/character_${name.toLowerCase()}.png`;

    return (
        <>
            {
                state.results.map((result, index) => {
                    return (
                        <div key={result.name + index}>
                            <h1>{result.name}</h1>
                            <img src={getImage(result.name)} alt={`IMAGE-${result.name}`}/>
                        </div>
                    )
                })
            }
            <Button onClick={() => setIsWishing(false)}>Go Back</Button>
        </>
    )
}

export default Wish;
