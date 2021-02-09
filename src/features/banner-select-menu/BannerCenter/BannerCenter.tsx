import { Flex, Image } from '@chakra-ui/react';
import React from 'react';
import BANNERS, { BANNER_CODE } from '../../../constants/Banners';
import { useWishState } from '../../../state-management/store';
import './BannerCenter.css';

const BannerCenter = () => {
    const wishState = useWishState();

    const BannerImage = () => {
        const imagePath = BANNERS.find(b => b.code === wishState.banner)?.imagePath;

        const baseStyle = {width: '1080px', borderRadius: '8px'};
        const characterEventStyle = {height: '533px', ...baseStyle};
        const wanderlustStyle = {height: '590px', ...baseStyle};

        return <Image style={wishState.banner !== BANNER_CODE.WANDERLUST ? characterEventStyle : wanderlustStyle} className='banner' src={imagePath}/>
    }

    return (
        <Flex flex={4} direction='row' justifyContent='center' minHeight='600px'>
            <BannerImage/>
        </Flex>
    );
}

export default BannerCenter;
