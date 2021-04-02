import React, { useEffect, useState } from 'react';
import ItemShowcase from '../../components/item-showcase/item-showcase';
import PATHS from '../../constants/paths';
import Character from '../../models/character';
import { Item } from '../../models/item';
import { useWishState } from '../../state-management/store';
import { useHistory } from "react-router-dom";
import './wish.css';

interface WishProps {
    setIsWishing: (isWishing: boolean) => void,
    isWishing: boolean
}

interface ItemImageProps {
    index: number
}

const ItemImage = (props: ItemImageProps) => {
    const wishState = useWishState();
    const {index} = props;
    const resultItem = wishState.results[index];
    const itemFileName = resultItem.name.replaceAll(' ', '_').replaceAll('\'', '').toLowerCase();
    const imageSrc = (resultItem as Character).elementType ? 
        `${PATHS.CHARACTER_WISH_IMAGES}/character_${itemFileName}.png` : 
        `${PATHS.WEAPONS}/${itemFileName}.webp`;
    const classString = `${resultItem.type === 'Weapon' ? 'item-img-weapon' : 'item-img-character'}`;

    return (
        <img key={resultItem.name + index} src={imageSrc} className={classString} alt={resultItem.name}/>
    )
}

const Wish = (props: WishProps) => {
    const [hasVideoEnded, setHasVideoEnded] = useState(false);
    const [itemIndex, setItemIndex] = useState(0);
    const history = useHistory();
    const wishState = useWishState();
    const { setIsWishing, isWishing } = props;
    const videoRef = React.createRef<HTMLVideoElement>();
    
    const fiveStarVideo = <source src={`${PATHS.VIDEOS}/five_star.mp4`}/>;
    const fourStarVideo = <source src={`${PATHS.VIDEOS}/four_star.mp4`}/>;
    const threeStarVideo = <source src={`${PATHS.VIDEOS}/three_star.mp4`}/>;

    useEffect(() => {
        if (!isWishing) {
            history.push('/');
        }
        wishState.results.forEach((result, i) => {
            const preloadImg = new Image();
            const itemFileName = result.name.replaceAll(' ', '_').replaceAll('\'', '').toLowerCase();
            const imageSrc = (result as Character).elementType ? 
                `${PATHS.CHARACTER_WISH_IMAGES}/character_${itemFileName}.png` : 
                `${PATHS.WEAPONS}/${itemFileName}.webp`;
            preloadImg.src = imageSrc;
        });

        return () => {
            setIsWishing(false);
        }
    }, [wishState.results, setIsWishing, history, isWishing])

    const WishVideoSource = () => {
        const hasFiveStar = wishState.results.some((item: Item) => item.stars === 5);

        if (hasFiveStar) {
            return fiveStarVideo;
        }
        
        const hasFourStar = wishState.results.some((item: Item) => item.stars === 4);

        if (hasFourStar) {
            return fourStarVideo;
        }
        
        return threeStarVideo;
    }

    const incrementItemIndex = () => {
        if (hasVideoEnded) {
            document.getElementsByTagName('body')[0].className = '';
            setItemIndex(itemIndex < wishState.results.length ? itemIndex + 1 : itemIndex);
            if (itemIndex === wishState.results.length || wishState.results.length === 1) {
                setIsWishing(false);
            }
        }
    }

    const orderByImportance = (items: Array<Item>) => {
        // 5 Star Character, 5 Star Weapon, 4 Star Character, 4 Star Weapon, 3 Star

        const fiveStarCharacters = items.filter(i => i.stars === 5 && i.type === 'Character');
        const fiveStarWeapons = items.filter(i => i.stars === 5 && i.type === 'Weapon');
        const fourStarCharacters = items.filter(i => i.stars === 4 && i.type === 'Character');
        const fourStarWeapons = items.filter(i => i.stars === 4 && i.type === 'Weapon');
        const threeStarWeapons = items.filter(i => i.stars === 3);

        return [...fiveStarCharacters, ...fiveStarWeapons, ...fourStarCharacters, ...fourStarWeapons, ...threeStarWeapons];
    }

    const skipVideo = () => {
        if (videoRef && videoRef.current) {
            videoRef.current.currentTime = videoRef.current.currentTime + 15;
        }
    }

    const setVideoEnded = () => setHasVideoEnded(true);

    return (
        <div onClick={incrementItemIndex} className='flex-row wish-container' style={{backgroundImage: `url("${PATHS.ASSETS}/item_showcase_background.webp")`}}>
            {
                !hasVideoEnded ? (
                    <button className='skip-button' onClick={skipVideo}>
                        SKIP
                    </button>
                 ) : null
            }
            {
                !hasVideoEnded ?
                (
                    <video ref={videoRef} className='wish-video' autoPlay={true} onEnded={setVideoEnded}>
                        <WishVideoSource/>
                    </video>
                ) : 
                itemIndex < wishState.results.length ? <ItemImage index={itemIndex}/>:
                (
                    <ItemShowcase items={orderByImportance(wishState.results)}/>
                )
            }
        </div>
    );
}

export default Wish;
