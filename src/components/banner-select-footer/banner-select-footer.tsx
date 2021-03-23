import React from 'react';
import { Link } from 'react-router-dom';
import PATHS from '../../constants/paths';
import { useWishState } from '../../state-management/store';
import './banner-select-footer.css';

interface BannerFooterProps {
  isWishing: boolean,
  setIsWishing: (isWishing: boolean) => void,
  wishOne: () => void,
  wishTen: () => void,
  setResetDialogOpen: () => void
}

interface FooterButtonProps {
    children?: React.ReactNode,
    onClick?: () => void
}

const BannerFooter = (props: BannerFooterProps) => {
    const wishState = useWishState();
    const { wishOne, wishTen, setResetDialogOpen } = props;

    const FooterButton = ({children, onClick}: FooterButtonProps) => (
      <button onClick={onClick} className='footer-button' style={{backgroundColor: '#E2DED4', color: '#343434'}}>
          {children}
      </button>
    )
    
    return (
      <div className='flex-row flex-wrap footer-container'>
          <div className='flex-column'>
            <div className='flex-row' style={{marginBottom: '10px'}}>
              <div className='flex-row' style={{minWidth: '75px'}}>
                <img src={`${PATHS.ITEMS}/item_masterless_starglitter.png`} style={{height: '32px', width: '32px'}} alt='Starglitter'/>
                <p key='starglitter_amount'>{wishState.starglitter}</p>
              </div>
              <div className='flex-row' style={{minWidth: '75px'}}>
                <img src={`${PATHS.ITEMS}/item_masterless_stardust.png`} style={{height: '32px', width: '32px'}} alt='Stardust'/>
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
              <Link to='/inventory'>
                <FooterButton>Inventory</FooterButton>
              </Link>
              <FooterButton onClick={setResetDialogOpen}>Reset</FooterButton>
            </div>
          </div>
          <div className='flex-row-responsive'>
            <button
              className='wish-button'
              onClick={wishOne}
              style={{
                color: '#BAA996',
                backgroundImage: `url("${PATHS.ASSETS}/wish_button_background.webp")`
              }}>
              <p>Wish 1</p>
              <div className='flex-row' style={{ justifyContent: 'center' }}>
                <img src={`${PATHS.ITEMS}/item_primogem.png`} height='32px' width='32px' alt='Wish Button Primogem'/> 
                <span style={{color: wishState.primogems >= 160 ? '#BAA996' : '#FF5F40'}}>x 160</span>
              </div>
            </button>
            <button
              className='wish-button'
              onClick={wishTen}
              style={{
                color: '#BAA996',
                backgroundImage: `url("${PATHS.ASSETS}/wish_button_background.webp")`
              }}>
              <p>Wish 10</p>
              <div className='flex-row' style={{ justifyContent: 'center' }}>
                <img src={`${PATHS.ITEMS}/item_primogem.png`} height='32px' width='32px' alt='Wish Button Primogem'/> 
                <span style={{color: wishState.primogems >= 1600 ? '#BAA996' : '#FF5F40'}}>x 1600</span>
              </div>
            </button>
          </div>
      </div>
    );
}

export default BannerFooter;
