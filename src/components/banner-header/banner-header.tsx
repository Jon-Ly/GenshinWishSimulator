import { Button, Stack, Text, Image } from '@chakra-ui/react';
import React from 'react';
import BANNERS, { Banner} from '../../constants/banners';
import PATHS from '../../constants/paths';
import { ACTION_TYPE } from '../../state-management/reducer';
import { useWishDispatch, useWishState } from '../../state-management/store';
import HEXCODES from '../../constants/hexcodes';

interface BannerButtonProps {
    banner: Banner
}

const BannerHeader = () => {
    const wishState = useWishState();
    const wishDispatch = useWishDispatch();
    const MARGIN = '15px';
    const BANNERS_DATE_ASCENDING = BANNERS.sort((banner1: Banner, banner2: Banner) => {
        if (banner1.startDate < banner2.startDate) {
            return -1;
        } else if (banner1.startDate > banner2.startDate) {
            return 1;
        }

        return 0;
    });

    function BannerButton(props: BannerButtonProps) {
        const { banner } = props;

        const name = banner.eventFiveStar?.name || 'Wanderlust';

        const enlarge = {backgroundColor: `${HEXCODES.BANNER_TAB_ACTIVE}`, color: '#000000'};

        return (
            <Button 
                backgroundColor={`${HEXCODES.BANNER_TAB_INACTIVE}`}
                style={banner.code ===  wishState.banner ? enlarge : {}}
                onClick={() => wishDispatch({type: ACTION_TYPE.SET_BANNER, payload: banner.code})}>
                {name}
            </Button>
        )
    }
    
    return (
        <Stack direction='row' padding= '25px 70px 0 70px' minHeight='100px' justifyContent='space-between'>
            <Stack direction='row' marginTop={MARGIN}>
                <Image src={`${PATHS.ASSETS}/star.png`} width='40px' height='40px'/>
                <Text style={{fontWeight: 'bold', lineHeight: '35px', marginLeft: '40px', textShadow: '#121212 0 0 4px'}}>Wish</Text>
            </Stack>
            <Stack direction='row' marginTop={MARGIN}>
                {
                    BANNERS_DATE_ASCENDING.map(banner => <BannerButton key={banner.code} banner={banner}/>)
                }
            </Stack>
            <Stack 
                direction='row'
                marginTop={MARGIN} 
                minWidth='75px' 
                textAlign='right' 
                backgroundColor='rgba(15, 15, 15, 0.35)'
                padding='0 20px 0 5px'
                height='31px' 
                borderRadius='50px'>
                <Image src={`${PATHS.ITEMS}/item_primogem.png`} height='32px' width='32px'/>
                <Text>{wishState.primogems}</Text>
            </Stack>
        </Stack>
    );
}

export default BannerHeader;
