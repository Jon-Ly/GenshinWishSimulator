import { Box, Container } from '@chakra-ui/react';
import React from 'react';
import HEXCODES from '../../constants/hexcodes';
import InformationNavbar from './information-navbar';

interface InformationProps {
    children?: React.ReactNode
}

const Information = ({children}: InformationProps) => {
    return (
        <Box backgroundColor={`${HEXCODES.DETAIL_BACKGROUND}`} color={`${HEXCODES.DETAIL_FONT_COLOR}`}>
            <InformationNavbar/>
            <hr style={{marginBottom: '75px'}}/>
            <Container maxW='100em'>
                {children}
            </Container>
            <hr style={{marginTop: '75px'}}/>
        </Box>
    )
}

export default Information;
