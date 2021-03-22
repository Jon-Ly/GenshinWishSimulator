import React from 'react';
import PATHS from '../../constants/paths';
import Character from '../../models/character';
import { Item } from '../../models/item';
import './item-showcase.css';

interface ItemShowcaseProps {
    items: Array<Item>
}

interface ImageProps {
    item: Item
}

const ItemShowcase = (props: ItemShowcaseProps) => {
    const {items} = props;

    const threeStarBoxShadow = '1px 0px 10px 3px #9ba3e7';
    const fourStarBoxShadow = '0px -10px 15px 10px #dec5ff, 0px 10px 15px 10px #dec5ff';
    const fiveStarBoxShadow = '0px -12px 20px 10px #fffc93, 0px 12px 20px 10px #fffc93';

    const Image = (props: ImageProps) => {
        const {item} = props;
        const itemFileName = item.name.replaceAll(' ', '_').replaceAll('\'', '').toLowerCase();
        const imageSrc = (item as Character).elementType ? 
            `${PATHS.CHARACTER_WISH_IMAGES}/character_${itemFileName}.png` : 
            `${PATHS.WEAPONS}/${itemFileName}.webp`;

        return <img src={imageSrc} alt={`${item.name}`} className={item.type === 'Character' ? 'item-character' : 'item-weapon'}/>
    }

    return (
       <div className='flex-row item-showcase'>
           {
               items.map((item, index) => {
                const shadow = item.stars === 3 ? threeStarBoxShadow : item.stars === 4 ? fourStarBoxShadow : fiveStarBoxShadow;
                   return (
                        <div key={index} style={{boxShadow: shadow}} className='item-container'>
                            <Image item={item}/>
                        </div>
                   )
               })
           }
       </div> 
    )
}

export default ItemShowcase;
