import React, { useEffect } from 'react';
import BANNERS from '../../constants/banners';
import { useWishState } from '../../state-management/store';
import './banner-select-center.css';

const BannerCenter = () => {
    const wishState = useWishState();
    const currentBanner = BANNERS.find(b => b.code === wishState.banner);
    const imageRef = React.createRef<HTMLImageElement>();

    useEffect(() => {
        const addImageAnimation = () => {
            if (imageRef && imageRef.current) {
                imageRef.current.classList.add('banner-image');
            }
        }

        imageRef.current?.addEventListener('load', addImageAnimation);
    }, [imageRef]);

    return (
        <div className='flex-row banner-select-center'>
            <img
                key={currentBanner?.imagePath}
                alt={`${currentBanner?.code}`}
                ref={imageRef}
                src={currentBanner?.imagePath}/>
        </div>
    );
}

export default BannerCenter;
