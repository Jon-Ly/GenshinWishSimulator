import { Button } from '@chakra-ui/react';
import React from 'react';

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
            backgroundColor='#e2ded4' 
            color='#343434'
            _hover={{bg: '#e2ded4'}}
            _active={{bg: '#e2ded4'}}>
            {children}
        </Button>
    )
}

export default FooterButton;
