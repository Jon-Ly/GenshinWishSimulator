import React, { useState } from 'react';
import BannerSelectCenter from '../../components/banner-select-center/banner-select-center';
import BannerSelectFooter from '../../components/banner-select-footer/banner-select-footer';
import BannerSelectHeader from '../../components/banner-select-header/banner-select-header';
import AppInformaiton from '../../components/dialogs/app-information/app-information';
import InsufficientPrimogemsDialog from '../../components/dialogs/insufficient-primogems-dialog/insufficient-primogems-dialog';
import ResetAlert from '../../components/dialogs/reset-dialog/reset-dialog';
import PATHS from '../../constants/paths';
import { ACTION_TYPE } from '../../state-management/reducer';
import { useWishDispatch, useWishState } from '../../state-management/store';
import './banner-select.css';

interface BannerSelectProps {
    isWishing: boolean,
    setIsWishing: (isWishing: boolean) => void,
    toggleMute: (mute?: boolean) => void,
    isMuted: boolean
}

const BannerSelect = (props: BannerSelectProps) => {
    const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
    const [isInsufficientDialogOpen, setIsInsufficientDialogOpen] = useState(false);
    const [isAppInformationOpen, setIsAppInformationOpen] = useState(false);
    const { isWishing, setIsWishing, toggleMute, isMuted } = props;
    const wishDispatch = useWishDispatch();
    const wishState = useWishState();

    const setResetDialogOpen = () => setIsResetDialogOpen(true);
    
    const wishOne = () => {
      if (!isWishing && wishState.primogems >= 160) {
        toggleMute(true);
        wishDispatch({type: ACTION_TYPE.WISH, payload: 1});
        setIsWishing(true);
      } else {
        setIsInsufficientDialogOpen(true);
      }
    }
    
    const wishTen = () => {
      if (!isWishing && wishState.primogems >= 1600) {
        toggleMute(true);
        wishDispatch({type: ACTION_TYPE.WISH, payload: 10});
        setIsWishing(true);
      } else {
        setIsInsufficientDialogOpen(true);
      }
    }

    return (
        <div className='select-menu flex-column' style={{backgroundImage: `url("${PATHS.ASSETS}/wish_background.webp")`}}>
            <ResetAlert isOpen={isResetDialogOpen} setIsOpen={setIsResetDialogOpen}/>
            <InsufficientPrimogemsDialog isOpen={isInsufficientDialogOpen} setIsOpen={setIsInsufficientDialogOpen}/>
            <AppInformaiton isOpen={isAppInformationOpen} setIsOpen={setIsAppInformationOpen} title='Thanks for Visting!'>
              <p>
                  Welcome to the my fanmade Genshin Wishing Simulator. I am an active player and just wanted to create a simulation of the dopamine we all get from 
                  wishing without breaking the bank. I tried to get the experience as close as I could while allowing for anyone to wish on previous banners.
              </p>
              <hr style={{margin: '10px'}}/>
              Public Repo: <a href='https://github.com/Jon-Ly/GenshinWishSimulator' style={{color: '#4a7fd4'}}>Github</a>
              <hr style={{margin: '10px'}}/>
              <p>※Disclaimer※ Most images were taken from 3rd-party sites or taken straight from the game through screenshots and the Kamera.</p>
            </AppInformaiton>
            <BannerSelectHeader isMuted={isMuted} setAppInformationOpen={setIsAppInformationOpen} toggleMute={toggleMute}/>
            <BannerSelectCenter/>
            <BannerSelectFooter
              isWishing={isWishing}
              setIsWishing={setIsWishing}
              setResetDialogOpen={setResetDialogOpen}
              wishOne={wishOne}
              wishTen={wishTen}/>
        </div>
    );
};

export default BannerSelect;
