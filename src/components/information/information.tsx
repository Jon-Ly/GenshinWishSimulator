import React from 'react';
import HEXCODES from '../../constants/hexcodes';
import InformationNavbar from './information-navbar';

interface InformationProps {
    children?: React.ReactNode
}

const Information = ({children}: InformationProps) => {
    return (
        <div style={{backgroundColor: `${HEXCODES.DETAIL_BACKGROUND}`, color: `${HEXCODES.DETAIL_FONT_COLOR}`}}>
            <InformationNavbar/>
            <hr style={{marginBottom: '75px'}}/>
            <div className='container'>
                {children}
            </div>
            <hr style={{marginTop: '75px'}}/>
        </div>
    )
}

export default Information;
