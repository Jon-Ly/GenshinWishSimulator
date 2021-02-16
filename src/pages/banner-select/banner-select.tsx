import React from 'react';
import BannerCenter from '../../components/banner-center/banner-center';
import BannerFooter from '../../components/banner-footer/banner-footer';
import BannerHeader from '../../components/banner-header/banner-header';
import PATHS from '../../constants/paths';
import './banner-select.css';

interface BannerSelectProps {
    isWishing: boolean,
    setIsWishing: (isWishing: boolean) => void
}

/**
 * TODO:
 * Wish text w/ icon
 * Primogems button/display
 * Insufficent Primogems Dialog
 * Crystal to Primogems Dialog
 */
const BannerSelect = (props: BannerSelectProps) => {
    const { isWishing, setIsWishing } = props;

    return (
        <div className='select-menu' style={{backgroundImage: `url("${PATHS.ASSETS}/wish_background.png")`, color: '#FFFFFF'}}>
            <BannerHeader/>
            <BannerCenter/>
            <BannerFooter setIsWishing={setIsWishing} isWishing={isWishing}/>
        </div>
    );
};

export default BannerSelect;
