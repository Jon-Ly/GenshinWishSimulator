import React from 'react';
import BANNERS from '../../constants/banners';
import COLORS from '../../constants/colors';
import WEAPONS from '../../constants/weapons';
import { Item } from '../../models/item';
import { useWishState } from '../../state-management/store';
import PATHS from '../../constants/paths';
import '../../styles/item-table.css';
import BannerDetailSubHeader from '../banner-detail-sub-header/banner-detail-sub-header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import Character from '../../models/character';

interface ItemTableProps {
    items: Array<Item>
}

const ItemsToWishForSection = () => {
    const wishState = useWishState();
    const currentBanner = BANNERS.find(b => b.code === wishState.banner) || BANNERS[0];
    const UpArrow = () => <FontAwesomeIcon icon={faArrowUp} color='#99cc00'/>

    const ItemTable = ({items}: ItemTableProps) => {
        const itemIndexes = [];

        // TODO: There's got to be a better way to make this table then generating this array of numbers
        for (let i = 0; i < items.length; i++) {
            if (i % 2 === 0) {
                itemIndexes.push(i);
            }
        }

        const isUpItem = (item: Item): boolean => {
            return currentBanner.eventFiveStar?.name === item.name || currentBanner.eventFourStars.some((c: Character) => c.name === item.name);
        }

        return (
            <table>
                <thead>
                    <tr>
                        <th style={{width: '25%'}}>Item Type</th>
                        <th style={{width: '25%'}}>Item Name</th>
                        <th style={{width: '25%'}}>Item Type</th>
                        <th style={{width: '25%'}}>Item Name</th>
                    </tr>
                </thead>
                <tbody style={{color: '#AD8E67'}}>
                    {itemIndexes?.map((i) => (
                        <tr key={`${items[i].name}${i}`}>
                            <td>{items[i].chance === 0.5 ? 'Character' : 'Weapon'}</td>
                            <td>
                                {isUpItem(items[i]) && <UpArrow/>}
                                {items[i].name}
                            </td>
                            {
                                i + 1 < items.length ? (
                                    <>
                                        <td>{items[i + 1].chance === 0.5 ? 'Character' : 'Weapon'}</td>
                                        <td>
                                            {isUpItem(items[i + 1]) && <UpArrow/>}
                                            {items[i + 1].name}
                                        </td>
                                    </>
                                ) : null
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }

    return (
        <section className='detail-section'>
            <div className='flex-row'>
                <img src={`${PATHS.ITEMS}/item_primogem.png`} style={{width:'35px', height:'35px'}} alt='Primogem'/>
                <h1 style={{color: '#A68458', lineHeight: '33px'}}>
                    Items to wish for:
                </h1>
            </div>
            <BannerDetailSubHeader backgroundColor={COLORS.FIVE_STAR_CHANCE_BANNER} stars={5}>
                Base Probability for 5-Star Item Drops: 0.600% (Incl. guarantee: 1.600%)
            </BannerDetailSubHeader>
            <ItemTable items={currentBanner?.fiveStars}/>
            <BannerDetailSubHeader backgroundColor={COLORS.FOUR_STAR_CHANCE_BANNER} stars={4}>
                Base Probability for 4-Star Item Drops: 5.100% (Incl. guarantee: 13.000%)
            </BannerDetailSubHeader>
            <ItemTable items={currentBanner?.fourStars}/>
            <BannerDetailSubHeader backgroundColor='#A5BACC' stars={3}>
                Base Probability for 3-Star Item Drops: 94.300% (Incl. guarantee: 85.400%)
            </BannerDetailSubHeader>
            <ItemTable items={WEAPONS.THREE_STAR_WEAPONS}/>
        </section>
    )
}

export default ItemsToWishForSection;
