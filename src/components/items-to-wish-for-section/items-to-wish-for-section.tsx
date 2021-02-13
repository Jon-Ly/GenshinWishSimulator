import React from 'react';
import { Image, Stack } from '@chakra-ui/react';
import BANNERS from '../../constants/banners';
import HEXCODES from '../../constants/hexcodes';
import WEAPONS from '../../constants/weapons';
import { Item } from '../../models/item';
import { useWishState } from '../../state-management/store';
import '../../styles/item-table.css';
import BannerDetailHeader from '../banner-detail/banner-detail-header';
import PATHS from '../../constants/paths';

interface ItemTableProps {
    items: Array<Item>
}

const ItemsToWishForSection = () => {
    const wishState = useWishState();
    const currentBanner = BANNERS.find(b => b.code === wishState.banner) || BANNERS[0]; // TODO: need a way to enforce this or throw an error?

    const ItemTable = ({items}: ItemTableProps) => {
        const itemIndexes = [];

        // TODO: There's got to be a better way to make this table then generating this array of numbers
        for (let i = 0; i < items.length; i++) {
            if (i % 2 === 0) {
                itemIndexes.push(i);
            }
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
                <tbody style={{color: HEXCODES.ITEM_BANNER_TEXT_COLOR}}>
                    {itemIndexes?.map((i) => (
                        <tr key={`${items[i].name}${i}`}>
                            <td>{items[i].chance === 0.5 ? 'Character' : 'Weapon'}</td>
                            <td>{items[i].name}</td>
                            {
                                i + 1 < items.length ? (
                                    <>
                                        <td>{items[i + 1].chance === 0.5 ? 'Character' : 'Weapon'}</td>
                                        <td>{items[i + 1].name}</td>
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
        <section>
            <Stack direction='row'>
                <Image src={`${PATHS.ITEMS}/item_primogem.png`} width='35px' height='35px'/>
                <h1 style={{color: '#A68458', lineHeight: '33px'}}>
                    Items to wish for:
                </h1>
            </Stack>
            {/* TODO: Refactor toThreePrecision function to be reusable from BannerDetail */}
            <BannerDetailHeader backgroundColor={HEXCODES.FIVE_STAR_CHANCE_BANNER} stars={5}>
                Base Probability for 5-Star Item Drops: 0.600% (Incl. guarantee: 1.600%)
            </BannerDetailHeader>
            <ItemTable items={currentBanner?.fiveStars}/>
            <BannerDetailHeader backgroundColor={HEXCODES.FOUR_STAR_CHANCE_BANNER} stars={4}>
                Base Probability for 4-Star Item Drops: 5.100% (Incl. guarantee: 13.000%)
            </BannerDetailHeader>
            <ItemTable items={currentBanner?.fourStars}/>
            <BannerDetailHeader backgroundColor={HEXCODES.THREE_STAR_CHANCE_BANNER} stars={3}>
                Base Probability for 3-Star Item Drops: 94.300% (Incl. guarantee: 85.400%)
            </BannerDetailHeader>
            <ItemTable items={WEAPONS.THREE_STAR_WEAPONS}/>
        </section>
    )
}

export default ItemsToWishForSection;
