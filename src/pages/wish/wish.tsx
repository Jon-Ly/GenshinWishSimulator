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
        if (hasVideoEnded) {
            document.getElementsByTagName('body')[0].className = '';
            setItemIndex(itemIndex < state.results.length ? itemIndex + 1 : itemIndex);
            if (itemIndex === state.results.length || state.results.length === 1) {
                setIsWishing(false);
            }
        }
    }

    const Image = () => {
        const resultItem = state.results[itemIndex];
        return <img className='item-img' src={getImageSource(resultItem.name)} alt={`IMAGE-${resultItem.name}`}/>
    }

    return (
        <div onClick={incrementItemIndex}>
            {
                !hasVideoEnded ? (
                    <button className='skip-button'>
                        SKIP
                    </button>
                 ) : null
            }
            {
                !hasVideoEnded ?
                (
                    <video className='wish-video' autoPlay={true} onEnded={() => setHasVideoEnded(true)}>
                        <source src={getVideoPath()}/>
                    </video>
                ) : 
                itemIndex < state.results.length ? <Image/> :
                (
                    state.results.map((item, index) => <p key={`${item.name}${index}`}>{item.name}</p>)
                )
            }
        </div>
    );
}

export default Wish;
