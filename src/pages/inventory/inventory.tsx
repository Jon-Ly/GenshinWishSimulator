import React, { useEffect, useState } from 'react';
import BannerDetailHeader from '../../components/banner-detail/banner-detail-header';
import InformationContainer from '../../components/information-container/information-container';
import HEXCODES from '../../constants/hexcodes';
import PATHS from '../../constants/paths';
import { ItemData } from '../../constants/user-data';
import { useWishState } from '../../state-management/store';
import './inventory.css'

interface ItemDataWithCount extends ItemData {
    count: number
}

const Inventory = () => {
    const wishState = useWishState();
    const [fiveStarItems, setFiveStarItems] = useState<Array<ItemDataWithCount>>([]);
    const [fourStarItems, setFourStarItems] = useState<Array<ItemDataWithCount>>([]);
    const [threeStarItems, setThreeStarItems] = useState<Array<ItemDataWithCount>>([]);

    const CharacterImage = ({name}: any) =>{
        return (
            <img className='character-image' src={`${PATHS.CHARACTER_THUMBNAILS}/${name}.png`}/>
        )
    }

    const InventoryItem = ({item}: any) => (
        <div className='inventory-item flex-row'>
            <CharacterImage name={item.name}/>
            <p className='item-name'>{item.name}</p>
            <div className='counter'>
                {item.count}
            </div>
        </div>
    )

    useEffect(() => {
        const itemsGrouped = new Array<ItemDataWithCount>();

        for(const item of wishState.items) {
            const existingItem = itemsGrouped.find(i => i.name === item.name);

            if (existingItem) {
                existingItem.count += 1;
            } else {
                itemsGrouped.push({...item, count: 1});
            }
        }

        setFiveStarItems(itemsGrouped.filter(i => i.stars === 5));
        setFourStarItems(itemsGrouped.filter(i => i.stars === 4));
        setThreeStarItems(itemsGrouped.filter(i => i.stars === 3));
    }, [])

    const InventoryItemContainer = ({children}: any) => (
        <div className='flex-row flex-wrap'>
            {children}
        </div>
    )

    return (
        <InformationContainer className='flex-column flex-wrap inventory-container' style={{justifyContent: 'center'}}>
            <h1>Inventory</h1>
            <BannerDetailHeader backgroundColor={HEXCODES.FIVE_STAR_CHANCE_BANNER} stars={5}/>
            <InventoryItemContainer>
                {
                    fiveStarItems.map((item: ItemDataWithCount) => <InventoryItem item={item}/>)
                }
            </InventoryItemContainer>
            <BannerDetailHeader backgroundColor={HEXCODES.FOUR_STAR_CHANCE_BANNER} stars={4}/>
            <InventoryItemContainer>
                {
                    fourStarItems.map((item: ItemDataWithCount) => <InventoryItem item={item}/>)
                }
            </InventoryItemContainer>
            <BannerDetailHeader backgroundColor='#A5BACC' stars={3}/>
            <InventoryItemContainer>
                {
                    threeStarItems.map((item: ItemDataWithCount) => <InventoryItem item={item}/>)
                }
            </InventoryItemContainer>
        </InformationContainer>
    )
}

export default Inventory;
