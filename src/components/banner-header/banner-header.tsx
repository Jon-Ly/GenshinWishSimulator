import React, { useState } from 'react';
import BANNERS, { Banner, BANNER_CODE} from '../../constants/banners';
import PATHS from '../../constants/paths';
import { ACTION_TYPE } from '../../state-management/reducer';
import { useWishDispatch, useWishState } from '../../state-management/store';
import HEXCODES from '../../constants/hexcodes';
import './banner-header.css';
import ScrollContainer from '../scroll-container/scroll-container';
import { useLayoutEffect } from 'react';

interface BannerButtonProps {
    banner: Banner
}

const BannerHeader = () => {
    const [windowSize, setWindowSize] = useState([0, 0]); // [width, height]
    const wishState = useWishState();
    const wishDispatch = useWishDispatch();
    const MARGIN = '15px';
    const BANNERS_DATE_ASCENDING = BANNERS.sort((banner1: Banner, banner2: Banner) => {
        if (banner1.startDate < banner2.startDate) {
            return -1;
        } else if (banner1.startDate > banner2.startDate) {
            return 1;
        }

        return 0;
    });    

    useLayoutEffect(() => {
        setWindowSize([window.innerWidth, window.innerHeight])
        window.addEventListener('resize', () => setWindowSize([window.innerWidth, window.innerHeight]));
    }, [])

    const setBanner = (bannerCode: BANNER_CODE) => {
        if (wishState.banner !== bannerCode) {
            wishDispatch({type: ACTION_TYPE.SET_BANNER, payload: bannerCode});
        }
    }

    function BannerButton(props: BannerButtonProps) {
        const { banner } = props;

        const name = banner.eventFiveStar?.name || 'Wanderlust';

        const inactive = {backgroundColor: `${HEXCODES.BANNER_TAB_INACTIVE}`};
        const active = {backgroundColor: `${HEXCODES.BANNER_TAB_ACTIVE}`, color: '#000000'};

        return (
            <button
                className='banner-tab'
                style={banner.code ===  wishState.banner ? active : inactive}
                onClick={() => setBanner(banner.code)}>
                {name}
            </button>
        )
    }
    
    return (
        <header className='flex-row-responsive header-container'>
            <div className='flex-row' style={{marginTop: `${MARGIN}`}}>
                <img src={`${PATHS.ASSETS}/star.png`} style={{height: '40px', width: '40px'}}/>
                <p className='wish-text'>Wish</p>
            </div>
            {
                windowSize[0] >= 650 ? (
                    <ScrollContainer className='flex-row' style={{marginTop: `${MARGIN}`}}>
                        {
                            BANNERS_DATE_ASCENDING.map(banner => <BannerButton key={banner.code} banner={banner}/>)
                        }
                    </ScrollContainer>
                ) : 
                (
                    <select className='banner-select f2pselect' onChange={e => setBanner(e.target.value as BANNER_CODE)}>
                        {
                            BANNERS_DATE_ASCENDING.map(banner => 
                                <option key={banner.code} value={banner.code}>
                                    {banner.code === BANNER_CODE.WANDERLUST ? 'Wanderlust' : banner.eventFiveStar?.name}
                                </option>
                            )
                        }
                    </select>
                )
            }
            <div className='flex-row primogems' style={{marginTop: `${MARGIN}`}}>
                <img src={`${PATHS.ITEMS}/item_primogem.png`} style={{height: '32px', width: '32px'}}/>
                <p>{wishState.primogems}</p>
            </div>
        </header>
    );
}

export default BannerHeader;
