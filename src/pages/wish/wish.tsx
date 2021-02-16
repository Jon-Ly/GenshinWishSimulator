import React, { useEffect, useState } from 'react';
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

    useEffect(() => {
        document.getElementsByTagName('body')[0].className = 'overflow-hidden';
    })

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

    const Image = () => <img className='item-img' src={getImageSource(state.results[itemIndex].name)} alt={`IMAGE-${state.results[itemIndex].name}`}/>

    return (
        <div onClick={incrementItemIndex}>
            {hasVideoEnded}
            {
                !hasVideoEnded ?
                (
                    <video autoPlay={true} onEnded={() => setHasVideoEnded(true)}>
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
