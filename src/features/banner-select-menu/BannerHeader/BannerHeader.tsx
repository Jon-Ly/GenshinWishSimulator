import { Button, Flex, Stack, Text, Image } from '@chakra-ui/react';
import React from 'react';
import BANNERS, { Banner } from '../../../constants/Banners';
import PATHS from '../../../constants/Paths';
import { ACTION_TYPE } from '../../../state-management/reducer';
import { useWishDispatch, useWishState } from '../../../state-management/store';

interface BannerButtonProps {
    banner: Banner
}

const BannerHeader = () => {
    const wishState = useWishState();
    const wishDispatch = useWishDispatch();

    const BANNERS_DATE_ASCENDING = BANNERS.sort((banner1: Banner, banner2: Banner) => {
        if (banner1.startDate < banner2.startDate) {
            return -1;
        } else if (banner1.startDate > banner2.startDate) {
            return 1;
        }

        return 0;
    });

    const MARGIN = '15px';

    function BannerButton(props: BannerButtonProps) {
        const { banner } = props;

        const name = banner.eventFiveStar?.name || 'Wanderlust';

        const enlarge = {backgroundColor: '#f7f3d8', color: '#000000'};

        return (
            <Button 
                backgroundColor='#4d6d96'
                style={banner.code ===  wishState.banner ? enlarge : {}}
                onClick={() => wishDispatch({type: ACTION_TYPE.SET_BANNER, payload: banner.code})}>
                {name}
            </Button>
        )
    }
    
    return (
        <Flex flex={2} height='150px' justifyContent='space-evenly'>
            <Stack direction='row' marginTop={MARGIN}>
                <Text>ICON HERE</Text>
                <Text>Wish</Text>
            </Stack>
            <Stack direction='row' marginTop={MARGIN}>
                {
                    BANNERS_DATE_ASCENDING.map(banner => {
                        return <BannerButton key={banner.code} banner={banner}/>
                    })
                }
            </Stack>
            <Stack direction='row' marginTop={MARGIN}>
                <Image path={`${PATHS.ITEMS}/item_primogem.png`} height='25px' width='25px'/>
                <Text>{wishState.primogems}</Text>
            </Stack>
        </Flex>
    );
}

export default BannerHeader;
