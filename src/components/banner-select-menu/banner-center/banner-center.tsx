import { Image, Stack } from '@chakra-ui/react';
import React from 'react';
import BANNERS, { BANNER_CODE } from '../../../constants/banners';
import { useWishState } from '../../../state-management/store';
import './banner-center.css';

const BannerCenter = () => {
    const wishState = useWishState();
    const currentBanner = BANNERS.find(b => b.code === wishState.banner);

    const BannerImage = () => {
        const imagePath = currentBanner?.imagePath;
        const altText = `${currentBanner?.code}-banner`;

        const baseStyle = {borderRadius: '8px', maxWidth: '100%'};
        const wanderlustStyle = {...baseStyle, maxHeight: '590px'};

        return <Image
            alt={altText}
            style={wishState.banner !== BANNER_CODE.WANDERLUST ? baseStyle : wanderlustStyle} 
            className='banner'
            src={imagePath}
            objectFit='contain'/>
    }

    return (
        <Stack direction='row' justifyContent='center' marginTop='30px' minHeight='600px'>
            <BannerImage/>
        </Stack>
    );
}

export default BannerCenter;
