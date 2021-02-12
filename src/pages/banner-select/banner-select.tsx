import { Box } from '@chakra-ui/react';
import React from 'react';
import PATHS from '../../constants/paths';
import BannerCenter from '../../components/banner-select-menu/banner-center/banner-center';
import BannerFooter from '../../components/banner-select-menu/banner-footer/banner-footer';
import BannerHeader from '../../components/banner-select-menu/banner-header/banner-header';

interface BannerSelectProps {
    setIsWishing: (isWishing: boolean) => void
}

/**
 * TODO:
 * Wish text w/ icon
 * Primogems button/display
 * Insufficent Primogems Dialog
 * Crystal to Primogems Dialog
 */
const BannerSelect = (props: BannerSelectProps) => {
    const { setIsWishing } = props;

    return (
        <Box textAlign='center' fontSize='xl' backgroundImage={`url("${PATHS.ASSETS}/wish_background.png")`} backgroundRepeat='no-repeat' backgroundSize='auto' minHeight='100vh'>
            <BannerHeader/>
            <BannerCenter/>
            <BannerFooter setIsWishing={setIsWishing}/>
        </Box>
    );
};

export default BannerSelect;
