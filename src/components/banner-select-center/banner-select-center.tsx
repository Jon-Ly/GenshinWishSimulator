import React from 'react';
import BANNERS from '../../constants/banners';
import { useWishState } from '../../state-management/store';
import './banner-select-center.css';

const BannerCenter = () => {
    const wishState = useWishState();
    const currentBanner = BANNERS.find(b => b.code === wishState.banner);

    return (
        <div className='flex-row banner-select-center'>
            <img
            key={currentBanner?.imagePath}
            alt={`${currentBanner?.code}`}
            style={{borderRadius: '8px', maxWidth: '100%', objectFit: 'contain'}}
            className='banner-image'
            src={currentBanner?.imagePath}/>
        </div>
    );
}

export default BannerCenter;
