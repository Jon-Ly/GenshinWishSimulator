import { Flex, Stack, Text, Image, Box } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HEXCODES from '../../../constants/hexcodes';
import PATHS from '../../../constants/paths';
import { ACTION_TYPE } from '../../../state-management/reducer';
import { useWishDispatch, useWishState } from '../../../state-management/store';
import FooterButton from './footer-button';
import ResetAlert from './reset-alert';

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
        _hover={{cursor: 'pointer'}} 
        width='315px'
        color={`${HEXCODES.WISH_BUTTON_TEXT}`}
        backgroundImage={`url("${PATHS.ASSETS}/wish_button_background.png")`}
        backgroundRepeat='no-repeat'
        backgroundSize='contain'
        paddingTop='5px'
        >
        <p>Wish {primogems === 160 ? 1 : 10}</p>
        <Stack direction='row' justifyContent='center'>
          <Image src={`${PATHS.ITEMS}/item_primogem.png`} height='32px' width='32px'/> <span>x {primogems}</span>
        </Stack>
      </Box>
    )
    
    return (
      <>
        <ResetAlert isOpen={isResetConfirmationOpen} setIsOpen={setIsOpen}/>
        <Stack direction='row' justifyContent='space-between' padding='70px'>
            <Stack direction='column'>
              <Stack direction='row'>
                <Stack direction='row' minWidth='75px'>
                  <Image src={`${PATHS.ITEMS}/item_masterless_starglitter.png`} height='32px' width='32px'/>
                  <Text key='starglitter_amount'>{wishState.starglitter}</Text>
                </Stack>
                <Stack direction='row' minWidth='75px'>
                  <Image src={`${PATHS.ITEMS}/item_masterless_stardust.png`} height='32px' width='32px'/>
                  <Text key='stardust_amount'>{wishState.stardust}</Text>
                </Stack>
              </Stack>
              <Stack direction={['column', 'row']}>
                <Link to='/shop'>
                  <FooterButton>Shop</FooterButton>
                </Link>
                <Link to='/details'>
                  <FooterButton>Details</FooterButton>
                </Link>
                <Link to='/history'>
                  <FooterButton>History</FooterButton>
                </Link>
                <FooterButton onClick={() => setIsOpen(true)}>Reset</FooterButton>
              </Stack>
            </Stack>
            <Stack direction={['column', 'row']}>
              <WishButton key='wish_160' primogems={160}/>
              <WishButton key='wish_1600' primogems={1600}/>
            </Stack>
        </Stack>
      </>
    );
}

export default BannerFooter;
