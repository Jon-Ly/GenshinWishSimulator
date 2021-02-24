import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import BannerDetailSubHeader from '../../components/banner-detail-sub-header/banner-detail-sub-header';
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
            <img className='character-image' src={`${PATHS.CHARACTER_THUMBNAILS}/${name}.png`} alt={`${name}`}/>
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

    const GetSortedItems = (items: Array<ItemDataWithCount>) => {
        return items.sort((item1, item2) => {
                return item1.name > item2.name ? -1 : item1.name < item2.name ? 1 : 0;
            })
            .sort((item1, item2) => {
                return item1.type === 'Character' ? -1 : item1.type === 'Weapon' ? 1 : 0;
            });
    }

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

        const fiveStars = GetSortedItems(itemsGrouped.filter(i => i.stars === 5));
        const fourStars = GetSortedItems(itemsGrouped.filter(i => i.stars === 4));

        setFiveStarItems(fiveStars);
        setFourStarItems(fourStars);
        setThreeStarItems(itemsGrouped.filter(i => i.stars === 3));
    }, [wishState.items])

    const InventoryItemContainer = ({children}: any) => (
        <div className='flex-row flex-wrap inventory-item-container'>
            {children}
        </div>
    )

    return (
        <InformationContainer className='flex-column flex-wrap inventory-container'>
            <div className='flex-row flex-wrap inventory-currency'>
                <div className='flex-row'>
                    <img src={`${PATHS.ITEMS}/item_primogem.png`} alt='Primogems'/>
                    <p>{wishState.primogems}</p>
                </div>
                <div className='flex-row'>
                    <img src={`${PATHS.ITEMS}/item_masterless_stardust.png`} alt='Stardust'/>
                    <p>{wishState.stardust}</p>
                </div>
                <div className='flex-row'>
                    <img src={`${PATHS.ITEMS}/item_masterless_starglitter.png`} alt='Starglitter'/>
                    <p>{wishState.starglitter}</p>
                </div>
                <div className='flex-row'>
                    <p>Spent: ${wishState.moneySpent.toFixed(2)}</p>
                </div>
            </div>
            <h1>Inventory</h1>
            <BannerDetailSubHeader backgroundColor={HEXCODES.FIVE_STAR_CHANCE_BANNER} stars={5}/>
            <InventoryItemContainer>
                {
                    fiveStarItems.map((item: ItemDataWithCount) => <InventoryItem item={item}/>)
                }
            </InventoryItemContainer>
            <BannerDetailSubHeader backgroundColor={HEXCODES.FOUR_STAR_CHANCE_BANNER} stars={4}/>
            <InventoryItemContainer>
                {
                    fourStarItems.map((item: ItemDataWithCount) => <InventoryItem item={item}/>)
                }
            </InventoryItemContainer>
            <BannerDetailSubHeader backgroundColor='#A5BACC' stars={3}/>
            <InventoryItemContainer>
                {
                    threeStarItems.map((item: ItemDataWithCount) => <InventoryItem item={item}/>)
                }
            </InventoryItemContainer>
        </InformationContainer>
    )
}

export default Inventory;
