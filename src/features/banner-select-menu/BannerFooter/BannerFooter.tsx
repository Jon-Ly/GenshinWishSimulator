import { Flex, Stack, Text, Image, Box } from '@chakra-ui/react';
import React, { useState } from 'react';
import PATHS from '../../../constants/Paths';
import { ACTION_TYPE } from '../../../state-management/reducer';
import { useWishDispatch, useWishState } from '../../../state-management/store';
import FooterButton from './FooterButton';
import ResetAlert from './ResetAlert';

interface BannerFooterProps {
    setIsWishing: (isWishing: boolean) => void
}

interface WishButtonProps {
  primogems: number;
}

const BannerFooter = (props: BannerFooterProps) => {
    const [isResetConfirmationOpen, setIsOpen] = useState(false);
    const wishState = useWishState();
    const wishDispatch = useWishDispatch();
    const { setIsWishing } = props;
    
    const wishOne = () => {
      wishDispatch({type: ACTION_TYPE.WISH, payload: 1});
      setIsWishing(true);
    }
  
    const wishTen = () => {
      wishDispatch({type: ACTION_TYPE.WISH, payload: 10});
      setIsWishing(true);
    }

    const WishButton = ({primogems}: WishButtonProps) => (
      <Box 
        onClick={primogems === 160 ? wishOne : wishTen} 
        backgroundColor='#ffffff' 
        _hover={{cursor: 'pointer'}} 
        width='225px'
        borderRadius='25px'
        color={'#baa996'} 
        border='4px solid #d8c38b'>
        <p>Wish {primogems === 160 ? 1 : 10}</p>
        <Stack direction='row' justifyContent='center'>
          <Image src={`${PATHS.ITEMS}/item_primogem.png`} height='32px' width='32px'/> <span>x {primogems}</span>
        </Stack>
      </Box>
    )
    
    return (
      <>
        <ResetAlert isOpen={isResetConfirmationOpen} setIsOpen={setIsOpen}/>
        <Flex flex={1} justifyContent='space-between' padding='70px'>
            <Stack direction='column'>
              <Stack direction='row'>
                <Stack direction='row' minWidth='75px'>
                  <Image src={`${PATHS.ITEMS}/item_starglitter.png`} height='25px' width='25px'/>
                  <Text>{wishState.starglitter}</Text>
                </Stack>
                <Stack direction='row' minWidth='75px'>
                  <Image src={`${PATHS.ITEMS}/item_stardust.png`} height='25px' width='25px'/>
                  <Text>{wishState.stardust}</Text>
                </Stack>
              </Stack>
              <Stack direction='row'>
                <FooterButton>Shop</FooterButton>
                <FooterButton>Details</FooterButton>
                <FooterButton>History</FooterButton>
                <FooterButton onClick={() => setIsOpen(true)}>Reset</FooterButton>
              </Stack>
            </Stack>
            <Stack direction='row'>
              <WishButton primogems={160}/>
              <WishButton primogems={1600}/>
            </Stack>
        </Flex>
      </>
    );
}

export default BannerFooter;
