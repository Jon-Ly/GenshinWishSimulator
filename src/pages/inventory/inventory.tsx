import React, { useEffect, useState } from 'react';
import InformationContainer from '../../components/information-container/information-container';
import { ItemData } from '../../constants/user-data';
import { useWishState } from '../../state-management/store';
import './inventory.css'

interface ItemDataWithCount extends ItemData {
    count: number
}

const Inventory = () => {
    const wishState = useWishState();
    const [inventoryItems, setInventoryItems] = useState<Array<ItemDataWithCount>>([]);

    const orderItemsByRating = (items: Array<ItemDataWithCount>): Array<ItemDataWithCount> => {
        const sortedItems = items.sort((item1, item2) => {
            return item1.stars > item2.stars ? -1 : item1.stars < item2.stars ? 1 : 0;
        });

        return sortedItems;
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

        orderItemsByRating(itemsGrouped);

        setInventoryItems(itemsGrouped);
    }, [])

    return (
        <InformationContainer className='flex-row flex-wrap inventory-container' style={{justifyContent: 'center'}}>
            {
                inventoryItems.map((item: ItemDataWithCount) => {
                    return (
                        <div className='inventory-item flex-row'>
                            <p>{item.name}</p>
                            <div className='counter'>
                                {item.count}
                            </div>
                        </div>
                    )
                })
            }
        </InformationContainer>
    )
}

export default Inventory;
