import { Flex } from '@chakra-ui/react';
import React from 'react';
import BANNERS from '../../constants/Banners';
import { useWishState } from '../../state-management/store';

const BannerCenter = () => {
    const wishState = useWishState();

    const getBannerImage = () => {
        return BANNERS.find(b => b.code === wishState.banner)?.imagePath;
    }

    return ( // TODO: Fade image in from right
        <Flex flex={4} direction='row' justifyContent='center'>
            <img style={{height: '100%', borderRadius: '8px'}} src={getBannerImage()}/>
        </Flex>
    )
}

export default BannerCenter;
