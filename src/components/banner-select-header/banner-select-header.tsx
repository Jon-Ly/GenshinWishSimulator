import React from 'react';
import BANNERS, { Banner, BANNER_CODE} from '../../constants/banners';
import PATHS from '../../constants/paths';
import { ACTION_TYPE } from '../../state-management/reducer';
import { useWishDispatch, useWishState } from '../../state-management/store';
import './banner-select-header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faBriefcase, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import Select from '../select/select';

const BannerHeader = () => {
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
    const selectListItems = BANNERS_DATE_ASCENDING.map(banner => {
            return {
                value: banner.code,
                label: banner.code === BANNER_CODE.WANDERLUST ? 'Wanderlust' : banner.eventFiveStar?.name
            }
        });

    const setBanner = (bannerCode: BANNER_CODE) => {
        if (wishState.banner !== bannerCode) {
            wishDispatch({type: ACTION_TYPE.SET_BANNER, payload: bannerCode});
        }
    }
    
    return (
        <header className='flex-row-responsive header-container'>
            <div className='flex-row'>
                <img src={`${PATHS.ASSETS}/star.png`} style={{height: '40px', width: '40px'}} alt='Star'/>
                <p className='wish-text'>Wish</p>
            </div>
            <Select value={wishState.banner} onChange={setBanner} listItems={selectListItems}/>
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
