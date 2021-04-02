import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
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
    setIsWishing: (isWishing: boolean) => void
}

const BannerSelect = (props: BannerSelectProps) => {
    const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
    const [isInsufficientDialogOpen, setIsInsufficientDialogOpen] = useState(false);
    const [isAppInformationOpen, setIsAppInformationOpen] = useState(false);
    const { isWishing, setIsWishing } = props;
    const wishDispatch = useWishDispatch();
    const wishState = useWishState();
    const history = useHistory();
    const audioRef = React.createRef<HTMLAudioElement>();
    const [isMuted, setIsMuted] = useState(localStorage.getItem('muted') === 'true');

    useEffect(() => {
      if (!localStorage.getItem('muted')) {
        localStorage.setItem('muted', 'true');
        setIsMuted(true);
      }
      const playPromise = audioRef.current?.play();
  
      if (playPromise) {
        playPromise.then().catch(error => {});
      }
    }, [audioRef])

    const toggleMute = (mute?: boolean) => {
      if (mute === true || mute === false) {
        localStorage.setItem('muted', `${mute}`);
        setIsMuted(mute);
      } else {
        localStorage.setItem('muted', `${!isMuted}`);
        setIsMuted(isMuted => !isMuted);
      }
    }

    const setResetDialogOpen = () => setIsResetDialogOpen(true);
    
    const wishOne = () => {
      if (!isWishing && wishState.primogems >= 160) {
        toggleMute(true);
        wishDispatch({type: ACTION_TYPE.WISH, payload: 1});
        setIsWishing(true);
        history.push('/wishing');
      } else {
        setIsInsufficientDialogOpen(true);
      }
    }
    
    const wishTen = () => {
      if (!isWishing && wishState.primogems >= 1600) {
        toggleMute(true);
        wishDispatch({type: ACTION_TYPE.WISH, payload: 10});
        setIsWishing(true);
        history.push('/wishing');
      } else {
        setIsInsufficientDialogOpen(true);
      }
    }

    return (
        <div className='select-menu flex-column' style={{backgroundImage: `url("${PATHS.ASSETS}/wish_background.webp")`}}>
            <audio style={{display: 'none'}} muted={isMuted} loop preload='auto' ref={audioRef}>
              <source src={`${PATHS.MUSIC}/statue_of_the_seven.ogg`} type="audio/ogg"/>
              <source src={`${PATHS.MUSIC}/statue_of_the_seven.wav`} type="audio/wav"/>
              <source src={`${PATHS.MUSIC}/statue_of_the_seven.mp3`} type="audio/mp3"/>
              Your browser does not support the audio element.
            </audio>
            <ResetAlert isOpen={isResetDialogOpen} setIsOpen={setIsResetDialogOpen}/>
            <InsufficientPrimogemsDialog isOpen={isInsufficientDialogOpen} setIsOpen={setIsInsufficientDialogOpen}/>
            <AppInformaiton isOpen={isAppInformationOpen} setIsOpen={setIsAppInformationOpen} title='Thanks for Visting!'>
              <p>
                  Welcome to the my Genshin Wishing Simulator. I'm an 
                  <a className='info-link' href='https://www.hoyolab.com/genshin/accountCenter/gameRecord?id=82647830' target="_blank"> active player </a>
                  and wanted to create a simulation of the dopamine hit we all get from 
                  wishing, without breaking the bank. I tried to get the experience as close as I could while allowing anyone to wish on previous banners.
                  For the best experience, enter full screen mode by hitting 
                  <span style={{fontWeight: 'bold'}}> F11</span>.
              </p>
              <hr style={{margin: '10px'}}/>
              <p>※Weapons Missing※ The weapon banners are missing because I've been too lazy to get the weapon assets.</p>
              <hr style={{margin: '10px'}}/>
              <p>※Disclaimer※ Most images were taken from 3rd-party sites or taken straight from the game through screenshots and the Kamera.</p>
              <hr style={{margin: '10px'}}/>
              <p>
                Public Repo: <a href='https://github.com/Jon-Ly/GenshinWishSimulator' className='info-link'>Github</a>
              </p>
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
