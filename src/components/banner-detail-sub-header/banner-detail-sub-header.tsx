import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import '../../styles/banner-detail.css';

interface BannerDetailHeaderProps {
    backgroundColor?: string;
    color?: string;
    stars?: 3 | 4 | 5;
    title?: string;
    children?: React.ReactNode;
}

const BannerDetailSubHeader = (props: BannerDetailHeaderProps) => {
    const {backgroundColor, color, stars, children, title} = props;

    const CustomStarIcon = () => <FontAwesomeIcon color='#FFCC33' style={{marginRight: '5px'}} icon={faStar}/>;

    return (
        <header className='banner-detail-sub-header' style={{backgroundColor: backgroundColor, color: color}}>
            <div className='flex-row' style={{lineHeight: '20px'}}>
                <div className='sub-header-stars'>
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
                <span className='sub-header-text'>{children}</span>
            </div>
        </header>
    )
}

export default BannerDetailSubHeader;
