import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import HEXCODES from '../../constants/hexcodes';

interface BannerDetailHeaderProps {
    backgroundColor?: string;
    color?: string;
    stars?: 3 | 4 | 5;
    title?: string;
    children?: React.ReactNode;
}

const BannerDetailHeader = (props: BannerDetailHeaderProps) => {
    const {backgroundColor, color, stars, children, title} = props;

    const CustomStarIcon = () => <FontAwesomeIcon color={HEXCODES.ITEM_BANNER_STAR} style={{marginRight: '5px'}} icon={faStar}/>;

    return (
        <header style={{backgroundColor: backgroundColor, color: color, margin: '35px 0', minHeight: '50px', paddingLeft: '18px', paddingTop: '10px'}}>
            <div className='flex-row' style={{lineHeight: '20px'}}>
                <div style={{minWidth: '160px', fontSize: '25px'}}>
                    <span style={{lineHeight: '25px'}}>{title}</span>
                    {
                        stars && stars >= 3 ? (
                            <>
                                <CustomStarIcon/>
                                <CustomStarIcon/>
                                <CustomStarIcon/>
                            </>
                        ) : null
                    }
                    {
                        stars && stars >= 4 ? <CustomStarIcon/> : null
                    }
                    {
                        stars && stars === 5 ? <CustomStarIcon/> : null
                    }
                </div>
                <span style={{fontSize: '22px', marginLeft: '25px', lineHeight: '30px'}}>{children}</span>
            </div>
        </header>
    )
}

export default BannerDetailHeader;
