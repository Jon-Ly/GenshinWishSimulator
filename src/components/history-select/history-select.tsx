import React from 'react';
import HISTORY_TYPE from '../../constants/history-type';
import HistoryType from '../../constants/history-type';
import './history-select.css';

interface HistorySelectProps {
    value: HistoryType,
    onChange: (banner: HISTORY_TYPE) => void
}

const HistorySelect = ({value, onChange}: HistorySelectProps) => {
    return (
        <div className='flex-row'>
            <label>Select Wish Type:</label>
            <select className='history-select' value={value} onChange={e => onChange(e.target.value as HISTORY_TYPE)}>
                <option value={HISTORY_TYPE.WANDERLUST}>Permanent Wish</option>
                <option value={HISTORY_TYPE.CHARACTER_EVENT}>Character Event Wish</option>
            </select>
        </div>
    )
}

export default HistorySelect;
