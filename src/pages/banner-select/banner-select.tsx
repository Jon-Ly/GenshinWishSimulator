import React from 'react';
import BannerCenter from '../../components/banner-select-menu/banner-center/banner-center';
import BannerFooter from '../../components/banner-select-menu/banner-footer/banner-footer';
import BannerHeader from '../../components/banner-select-menu/banner-header/banner-header';
import PATHS from '../../constants/paths';
import './banner-select.css';

interface BannerSelectProps {
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
    const { setIsWishing } = props;

    return (
        <div className='select-menu' style={{backgroundImage: `url("${PATHS.ASSETS}/wish_background.png")`, color: '#FFFFFF'}}>
            <BannerHeader/>
            <BannerCenter/>
            <BannerFooter setIsWishing={setIsWishing}/>
        </div>
    );
};

export default BannerSelect;
