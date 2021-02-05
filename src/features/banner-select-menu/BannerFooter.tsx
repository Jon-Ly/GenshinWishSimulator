import { Flex, Button } from '@chakra-ui/react';
import React from 'react';
import { ACTION_TYPE } from '../../state-management/reducer';
import { useWishDispatch } from '../../state-management/store';

interface BannerFooterProps {
    setIsWishing: (isWishing: boolean) => void
}

const BannerFooter = (props: BannerFooterProps) => {
    const dispatch = useWishDispatch();
    const { setIsWishing } = props;
    
    const wishOne = () => {
      dispatch({type: ACTION_TYPE.WISH, payload: 1});
      setIsWishing(true);
    }
  
    const wishTen = () => {
      dispatch({type: ACTION_TYPE.WISH, payload: 10});
      setIsWishing(true);
    }
    
    return (
        <Flex flex={1}>
            <Button onClick={wishOne}>Wish 1</Button>
            <Button onClick={wishTen}>Wish 10</Button>
            <Button onClick={() => dispatch({type: ACTION_TYPE.RESET})}>Reset</Button>
        </Flex>
    )
}

export default BannerFooter;
