import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HEXCODES from '../../constants/hexcodes'
import PATHS from '../../constants/paths'
import { ACTION_TYPE } from '../../state-management/reducer'
import { useWishDispatch, useWishState } from '../../state-management/store'
import ResetAlert from '../alerts/reset-alert';
import './banner-footer.css';

interface BannerFooterProps {
  isWishing: boolean;
  setIsWishing: (isWishing: boolean) => void
}

interface FooterButtonProps {
    children?: React.ReactNode,
    onClick?: () => void
}

interface WishButtonProps {
  primogems: number;
}

const BannerFooter = (props: BannerFooterProps) => {
    const [isResetConfirmationOpen, setIsOpen] = useState(false);
    const wishState = useWishState();
    const wishDispatch = useWishDispatch();
    const { isWishing, setIsWishing } = props;

    const FooterButton = ({children, onClick}: FooterButtonProps) => (
      <button onClick={onClick} className='footer-button' style={{backgroundColor: '#E2DED4', color: '#343434'}}>
          {children}
      </button>
    )
    
    const wishOne = () => {
      if (!isWishing) {
        wishDispatch({type: ACTION_TYPE.WISH, payload: 1});
        setIsWishing(true);
      }
    }
  
    const wishTen = () => {
      if (!isWishing) {
        wishDispatch({type: ACTION_TYPE.WISH, payload: 10});
        setIsWishing(true);
      }
    }

    const WishButton = ({primogems}: WishButtonProps) => {
      const currentPrimogems = wishState.primogems;
      const primoFontColor = currentPrimogems >= 1600 || (currentPrimogems >= 160 && primogems === 160) ? `${HEXCODES.WISH_BUTTON_TEXT}` : `${HEXCODES.ERROR}`
      return (
          <button
            className='wish-button'
            onClick={primogems === 160 ? wishOne : wishTen}
            style={{
              color: `${HEXCODES.WISH_BUTTON_TEXT}`,
              backgroundImage: `url("${PATHS.ASSETS}/wish_button_background.png")`
            }}>
            <p>Wish {primogems === 160 ? 1 : 10}</p>
            <div className='flex-row' style={{ justifyContent: 'center' }}>
              <img src={`${PATHS.ITEMS}/item_primogem.png`} height='32px' width='32px'/> 
              <span style={{color: primoFontColor}}>x {primogems}</span>
            </div>
          </button>
      )
    }
    
    return (
      <>
        <ResetAlert isOpen={isResetConfirmationOpen} setIsOpen={setIsOpen}/>
        <div className='flex-row flex-wrap footer-container'>
            <div className='flex-column'>
              <div className='flex-row' style={{marginBottom: '10px'}}>
                <div className='flex-row' style={{minWidth: '75px'}}>
                  <img src={`${PATHS.ITEMS}/item_masterless_starglitter.png`} style={{height: '32px', width: '32px'}}/>
                  <p key='starglitter_amount'>{wishState.starglitter}</p>
                </div>
                <div className='flex-row' style={{minWidth: '75px'}}>
                  <img src={`${PATHS.ITEMS}/item_masterless_stardust.png`} style={{height: '32px', width: '32px'}}/>
                  <p key='stardust_amount'>{wishState.stardust}</p>
                </div>
              </div>
              <div className='flex-row-responsive'>
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
            <div className='flex-row-responsive'>
              <WishButton primogems={160}/>
              <WishButton primogems={1600}/>
            </div>
        </div>
      </>
    );
}

export default BannerFooter;
