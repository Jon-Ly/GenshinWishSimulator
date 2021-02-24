import React, { useState } from 'react';
import BannerSelectCenter from '../../components/banner-select-center/banner-select-center';
import BannerSelectFooter from '../../components/banner-select-footer/banner-select-footer';
import BannerSelectHeader from '../../components/banner-select-header/banner-select-header';
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
    const { isWishing, setIsWishing } = props;
    const wishDispatch = useWishDispatch();
    const wishState = useWishState();

    const setResetDialogOpen = () => setIsResetDialogOpen(true);
    
    const wishOne = () => {
      if (!isWishing && wishState.primogems >= 160) {
        wishDispatch({type: ACTION_TYPE.WISH, payload: 1});
        setIsWishing(true);
      } else {
        setIsInsufficientDialogOpen(true);
      }
    }
    
    const wishTen = () => {
      if (!isWishing && wishState.primogems >= 1600) {
        wishDispatch({type: ACTION_TYPE.WISH, payload: 10});
        setIsWishing(true);
      } else {
        setIsInsufficientDialogOpen(true);
      }
    }

    return (
        <div className='select-menu' style={{backgroundImage: `url("${PATHS.ASSETS}/wish_background.png")`}}>
            <ResetAlert isOpen={isResetDialogOpen} setIsOpen={setIsResetDialogOpen}/>
            <InsufficientPrimogemsDialog isOpen={isInsufficientDialogOpen} setIsOpen={setIsInsufficientDialogOpen}/>
            <BannerSelectHeader/>
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
