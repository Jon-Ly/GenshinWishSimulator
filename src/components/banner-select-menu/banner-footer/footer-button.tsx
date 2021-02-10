import { Button } from '@chakra-ui/react';
import React from 'react';
import HEXCODES from '../../../constants/hexcodes';

interface FooterButtonProps {
    children?: React.ReactNode,
    onClick?: () => void
}

const FooterButton = (props: FooterButtonProps) => {
    const { children, onClick } = props;

    return (
        <Button 
            onClick={onClick} 
            borderRadius='50px' 
            height='35px' 
            width='135px' 
            padding='15px' 
            fontSize='18px' 
            backgroundColor={`${HEXCODES.SHOP_DETAIL_HISTORY}`}
            color={`${HEXCODES.SHOP_DETAIL_HISTORY_TEXT}`}
            _hover={{bg: `${HEXCODES.SHOP_DETAIL_HISTORY}`}}
            _active={{bg: `${HEXCODES.SHOP_DETAIL_HISTORY}`}}>
            {children}
        </Button>
    )
}

export default FooterButton;
