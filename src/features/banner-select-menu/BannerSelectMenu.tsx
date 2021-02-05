import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import BannerCenter from './BannerCenter';
import BannerFooter from './BannerFooter';
import BannerHeader from './BannerHeader';

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
        <Box textAlign='center' fontSize='xl'>
            <Flex direction='column'>
                <BannerHeader/>
                <BannerCenter/>
                <BannerFooter setIsWishing={setIsWishing}/>
            </Flex>
        </Box>
    )
};

export default BannerSelectMenu;
