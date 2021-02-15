import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HEXCODES from '../../../constants/hexcodes';
import PATHS from '../../../constants/paths';
import { ACTION_TYPE } from '../../../state-management/reducer';
import { useWishDispatch, useWishState } from '../../../state-management/store';
import FooterButton from './footer-button/footer-button';
import ResetAlert from './reset-alert';

interface BannerFooterProps {
    setIsWishing: (isWishing: boolean) => void
}

interface WishButtonProps {
  primogems: number;
}

const BannerFooter = (props: BannerFooterProps) => {
    const [isResetConfirmationOpen, setIsOpen] = useState(false);
    const wishState = useWishState();
    const wishDispatch = useWishDispatch();
    const { setIsWishing } = props;
    
    const wishOne = () => {
      wishDispatch({type: ACTION_TYPE.WISH, payload: 1});
      setIsWishing(true);
    }
  
    const wishTen = () => {
      wishDispatch({type: ACTION_TYPE.WISH, payload: 10});
      setIsWishing(true);
    }

    const WishButton = ({primogems}: WishButtonProps) => (
        <div
          className='wish-button'
          onClick={primogems === 160 ? wishOne : wishTen}
          style={{
            color: `${HEXCODES.WISH_BUTTON_TEXT}`,
            backgroundImage: `url("${PATHS.ASSETS}/wish_button_background.png")`
          }}>
          <p>Wish {primogems === 160 ? 1 : 10}</p>
          <div className='flex-row' style={{ justifyContent: 'center' }}>
            <img src={`${PATHS.ITEMS}/item_primogem.png`} height='32px' width='32px'/> <span>x {primogems}</span>
          </div>
        </div>
    )
    
    return (
      <>
        <ResetAlert isOpen={isResetConfirmationOpen} setIsOpen={setIsOpen}/>
        <div className='flex-row' style={{justifyContent:'space-between', padding:'70px'}}>
            <div className='flex-column'>
              <div className='flex-row'>
                <div className='flex-row' style={{minWidth: '75px'}}>
                  <img src={`${PATHS.ITEMS}/item_masterless_starglitter.png`} style={{height: '32px', width: '32px'}}/>
                  <p key='starglitter_amount'>{wishState.starglitter}</p>
                </div>
                <div className='flex-row' style={{minWidth: '75px'}}>
                  <img src={`${PATHS.ITEMS}/item_masterless_stardust.png`} style={{height: '32px', width: '32px'}}/>
                  <p key='stardust_amount'>{wishState.stardust}</p>
                </div>
              </div>
              <div className='flex-row'>
                <Link to='/shop'>
                  <FooterButton>Shop</FooterButton>
                </Link>
                <Link to='/details'>
                  <FooterButton>Details</FooterButton>
                </Link>
                <Link to='/history'>
                  <FooterButton>History</FooterButton>
                </Link>
                <FooterButton onClick={() => setIsOpen(true)}>Reset</FooterButton>
              </div>
            </div>
            <div className='flex-row'>
              <WishButton primogems={160}/>
              <WishButton primogems={1600}/>
            </div>
        </div>
      </>
    );
}

export default BannerFooter;
