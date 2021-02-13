import React from 'react';
import { BANNER_CODE } from '../../constants/banners';
import './history-select.css';

const HistorySelect = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <h1>Select Wish Type:</h1>
            <select>
                <option value={BANNER_CODE.WANDERLUST}>Permanent Wish</option>
                <option value={BANNER_CODE.ALBEDO}>Event Character Wish</option>
            </select>
        </div>
    )
}

export default HistorySelect;
