import React, { useState } from 'react';
import PATHS from '../../constants/paths';
import { Item } from '../../models/item';
import { useWishState } from '../../state-management/store';
import './wish.css';

interface WishProps {
    setIsWishing: (isWishing: boolean) => void
}

const Wish = (props: WishProps) => {
    const [hasVideoEnded, setHasVideoEnded] = useState(false);
    const [itemIndex, setItemIndex] = useState(0);
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

    const incrementItemIndex = () => {
        setItemIndex(itemIndex < state.results.length ? itemIndex + 1 : itemIndex);
        if (itemIndex === state.results.length) {
            setIsWishing(false);
        }
    }

    const Image = () => <img className='item-img' src={getImageSource(state.results[itemIndex].name)} alt={`IMAGE-${state.results[itemIndex].name}`}/>

    return (
        <div onClick={incrementItemIndex}>
            {
                !hasVideoEnded ?
                (
                    <video autoPlay={true} onEnded={() => setHasVideoEnded(true)}>
                        <source src={getVideoPath()}/>
                    </video>
                ) : null
            }
            {
                itemIndex < state.results.length ? <Image/> : 
                (
                    state.results.map(i => <p>{i.name}</p>)
                )
            }
        </div>
    );
}

export default Wish;
