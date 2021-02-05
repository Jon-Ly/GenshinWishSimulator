import { Flex, Button, Stack, Text, Image } from '@chakra-ui/react';
import React from 'react';
import PATHS from '../../../constants/Paths';
import { ACTION_TYPE } from '../../../state-management/reducer';
import { useWishDispatch, useWishState } from '../../../state-management/store';

interface BannerFooterProps {
    setIsWishing: (isWishing: boolean) => void
}

const BannerFooter = (props: BannerFooterProps) => {
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
    
    return (
        <Flex flex={1} justifyContent='space-between' height='250px' padding='75px'>
            <Stack direction='row'>
              <Stack direction='row' minWidth='100px'>
                <Image src={`${PATHS.ITEMS}/item_starglitter.png`} height='25px' width='25px'/>
                <Text>{wishState.starglitter}</Text>
              </Stack>
              <Stack direction='row' minWidth='100px'>
                <Image src={`${PATHS.ITEMS}/item_stardust.png`} height='25px' width='25px'/>
                <Text>{wishState.stardust}</Text>
              </Stack>
              <Button>Shop Button</Button>
              <Button>Details Button</Button>
              <Button>History Button</Button>
            </Stack>
            <Stack direction='row'>
              <Button onClick={wishOne}>Wish 1</Button>
              <Button onClick={wishTen}>Wish 10</Button>
              <Button onClick={() => wishDispatch({type: ACTION_TYPE.RESET})}>Reset</Button>
            </Stack>
        </Flex>
    );
}

export default BannerFooter;
