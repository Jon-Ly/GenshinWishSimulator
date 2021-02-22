import React from 'react';
import InformationContainer from '../../components/information-container/information-container';
import PrimoTopUp, { IPrimoTopUp } from '../../constants/primo-top-ups';
import { useWishState } from '../../state-management/store';
import './shop.css';

interface TopUpOptionProps {
    topUp: IPrimoTopUp,
    index: number
}

const Shop = () => {
    const wishState = useWishState();

    const TopUpOption = ({topUp, index}: TopUpOptionProps) => {
        const hasFirstTimeBonus = wishState.firstTimeBonus[index];
        const bonus = hasFirstTimeBonus ? topUp.primogems : topUp.bonus;

        return (
            <div className='top-up-option'>
                {topUp.primogems}
                {topUp.cost}
                {bonus}
            </div>
        )
    }

    return (
        <InformationContainer className='flex-row flex-wrap'>
            <h1>Primogem Top Ups</h1>
            {PrimoTopUp.map((ptu, index) => <TopUpOption topUp={ptu} index={index}/>)}
        </InformationContainer>
    )
}

export default Shop;
