import React, { useState } from 'react';
import BANNERS, { Banner, BANNER_CODE} from '../../constants/banners';
import PATHS from '../../constants/paths';
import { ACTION_TYPE } from '../../state-management/reducer';
import { useWishDispatch, useWishState } from '../../state-management/store';
import './banner-select-header.css';
import ScrollContainer from '../scroll-container/scroll-container';
import { useLayoutEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faBriefcase, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

interface BannerButtonProps {
    banner: Banner
}

const BannerHeader = () => {
    const [windowSize, setWindowSize] = useState([0, 0]); // [width, height]
    const wishState = useWishState();
    const wishDispatch = useWishDispatch();
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
        const background = banner.code ===  wishState.banner ? 'tab-active' : 'tab-inactive';

        return (
            <button
                className={`${background} banner-tab`}
                onClick={() => setBanner(banner.code)}>
                {name}
            </button>
        )
    }
    
    return (
        <header className='flex-row-responsive header-container'>
            <div className='flex-row'>
                <img src={`${PATHS.ASSETS}/star.png`} style={{height: '40px', width: '40px'}} alt='Star'/>
                <p className='wish-text'>Wish</p>
            </div>
            {
                windowSize[0] >= 650 ? (
                    <ScrollContainer className='flex-row'>
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
            <div id='info' className='flex-row' style={{justifyContent: 'space-between'}}>
                <div className='flex-row banner-header-primogems'>
                    <img src={`${PATHS.ITEMS}/item_primogem.png`} style={{height: '32px', width: '32px'}} alt='Primogem'/>
                    <p>{wishState.primogems}</p>
                </div>
                <Link to='/inventory'>
                    <FontAwesomeIcon icon={faBriefcase}/>
                </Link>
                <Link to='/inventory'>
                    <FontAwesomeIcon icon={faQuestionCircle}/>
                </Link>
            </div>
        </header>
    );
}

export default BannerHeader;