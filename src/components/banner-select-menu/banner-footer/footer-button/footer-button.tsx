import React from 'react';
import HEXCODES from '../../../../constants/hexcodes';
import './footer-button.css';

interface FooterButtonProps {
    children?: React.ReactNode,
    onClick?: () => void
}

const FooterButton = (props: FooterButtonProps) => {
    const { children, onClick } = props;

    return (
        <button onClick={onClick} className='footer-button' style={{backgroundColor: `${HEXCODES.SHOP_DETAIL_HISTORY}`, color: `${HEXCODES.SHOP_DETAIL_HISTORY_TEXT}`}}>
            {children}
        </button>
    )
}

export default FooterButton;
