import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import PATHS from '../../constants/paths';
import BannerCenter from './banner-center/banner-center';
import BannerFooter from './banner-footer/banner-footer';
import BannerHeader from './banner-header/banner-header';

interface BannerSelectMenuProps {
    setIsWishing: (isWishing: boolean) => void
}

/**
 * TODO:
 * Wish text w/ icon
 * Primogems button/display
 * Fate (wishes) display
 * Starglitter display
 * Stardust display
 * Shop button
 * Details button
 * History button
 * Insufficent Primogems Dialog
 * Crystal to Primogems Dialog
 */
const BannerSelectMenu = (props: BannerSelectMenuProps) => {
    const { setIsWishing } = props;

    return (
        <Box textAlign='center' fontSize='xl' backgroundImage={`url("${PATHS.ASSETS}/wish_background.png")`} backgroundRepeat='no-repeat' backgroundSize='cover'>
            <Flex direction='column' justifyContent='space-between' height='100vh'>
                <BannerHeader/>
                <BannerCenter/>
                <BannerFooter setIsWishing={setIsWishing}/>
            </Flex>
        </Box>
    );
};

export default BannerSelectMenu;
