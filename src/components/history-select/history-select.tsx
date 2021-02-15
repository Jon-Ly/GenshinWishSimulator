import React from 'react';
import { BANNER_CODE } from '../../constants/banners';
import './history-select.css';

const HistorySelect = () => {
    return (
        <div className='flex-row'>
            <label>Select Wish Type:</label>
            <select className='history-select'>
                <option value={BANNER_CODE.WANDERLUST}>Permanent Wish</option>
                <option value={BANNER_CODE.ALBEDO}>Character Event Wish</option>
            </select>
        </div>
    )
}

export default HistorySelect;
