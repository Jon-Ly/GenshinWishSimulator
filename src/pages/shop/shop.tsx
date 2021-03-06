import React, { useState } from 'react';
import PayDialog from '../../components/dialogs/pay-dialog/pay-dialog';
import InformationContainer from '../../components/information-container/information-container';
import PATHS from '../../constants/paths';
import PrimoTopUp, { IPrimoTopUp } from '../../constants/primo-top-ups';
import { useWishState } from '../../state-management/store';
import './shop.css';

interface TopUpOptionProps {
    topUp: IPrimoTopUp,
    firstTimeBonus: boolean
}

const Shop = () => {
    const [isPayDialogOpen, setPayDialogOpen] = useState<boolean>(false);
    const [topUpSelected, setTopUpSelected] = useState<IPrimoTopUp>({cost: 0, primogems: 0, bonus: 0});
    const wishState = useWishState();

    const setPayDialogOpenTrue = (topUp: IPrimoTopUp) => {
        setTopUpSelected(topUp);
        setPayDialogOpen(true);
    }

    const TopUpOption = React.memo(({topUp, firstTimeBonus}: TopUpOptionProps) => {
        const bonus = firstTimeBonus ? topUp.primogems : topUp.bonus;
        return (
            <div className='flex-column top-up-option' onClick={() => setPayDialogOpenTrue(topUp)}>
                <div className='bonus' style={{backgroundImage: `url("${PATHS.ASSETS}/bonus_star.webp")`}}>
                    <p>Bonus!</p>
                    <p>+{bonus}</p>
                </div>
                <div className='top-up-option-image' style={{backgroundImage: `url("${PATHS.SHOP}/${topUp.primogems}_primogems.webp")`}}>
                    <div className='top-up-option-primogems'>
                        {topUp.primogems} Primogems
                    </div>
                </div>
                <div className='top-up-option-cost'>
                    ${topUp.cost}
                </div>
            </div>
        )
    }, (prevProps, nextProps) => prevProps.firstTimeBonus === nextProps.firstTimeBonus);

    return (
        <>
            <PayDialog topUp={topUpSelected} setIsOpen={setPayDialogOpen} isOpen={isPayDialogOpen}/>
            <InformationContainer className='flex-row flex-wrap'>
                <div className='flex-row shop-currency'>
                    <div className='flex-row'>
                        <img src={`${PATHS.ITEMS}/item_primogem.png`} style={{width: '32px', height: '32px'}} alt='Primogems'/>
                        <p>{wishState.primogems}</p>
                    </div>
                    <p>Spent: ${wishState.moneySpent.toFixed(2)}</p>
                </div>
                <h1 id='shop-title'>Primogem Top Ups</h1>
                {
                    PrimoTopUp.map((ptu, index) => <TopUpOption key={ptu.primogems} topUp={ptu} firstTimeBonus={wishState.firstTimeBonus[index]}/>)
                }
            </InformationContainer>
        </>
    )
}

export default Shop;
