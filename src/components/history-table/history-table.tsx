import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import HEXCODES from '../../constants/hexcodes';
import { ItemData } from '../../constants/user-data';
import { useWishState } from '../../state-management/store';
import '../../styles/item-table.css';
import './history-table.css';

interface RowDataProps {
    item: ItemData
}

const HistoryTable = () => {
    const [page, setPage] = useState(1);
    const [tableData, setTableData] = useState<Array<ItemData>>([]);
    const wishState = useWishState();
    const items = wishState.items.filter(item => !!item.timestamp);

    useEffect(() => {
        const start = (page - 1) * 6;
        const end = (page) * 6;
        setTableData(items.slice(start, end));
    }, [page]);

    const decrementPage = () => setPage(page === 1 ? page : page - 1);
    const incrementPage = () => setPage(6 * page >= items.length ? page : page + 1);

    const Pagination = () => (
        <div className='flex-row' id='pagination'>
            <button className='square pagination-button' onClick={decrementPage}>
                <FontAwesomeIcon icon={faChevronLeft}/>
            </button>
            <span id='page' className='square' style={{backgroundColor: '#918981', color: '#FFFFFF'}}>
                {page}
            </span>
            <button className='square pagination-button' onClick={incrementPage}>
                <FontAwesomeIcon icon={faChevronRight}/>                
            </button>
        </div>
    )

    const RowData = ({item}: RowDataProps) => {
        const itemColor = item.stars === 4 ? HEXCODES.FOUR_STAR_HISTORY_COLOR : item.stars === 5 ? HEXCODES.FIVE_STAR_HISTORY_COLOR : ''
        return (
            <tr>
                <td>{item.type}</td>
                <td style={{color: itemColor}}>
                    {item.name} {item.stars >= 4 ? `(${item.stars}-star)` : null}
                </td>
                <td>{item.timestamp}</td>
            </tr>
        )
    }

    return (
        <>
            <div style={{minHeight: '408px'}}>
                <table>
                    <thead>
                        <tr>
                            <th style={{width: '33.33%'}}>Item Type</th>
                            <th style={{width: '33.33%'}}>Item Name</th>
                            <th style={{width: '33.33%'}}>Time Received</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // Redo the quick work on Text color
                            tableData.length > 0 ?
                            (
                                tableData.map((item, index) => <RowData key={`${item.name}-${index}`} item={item}/>)
                            ) :
                            (
                            <tr>
                                <td colSpan={3}>No Record</td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            { tableData.length > 0 ? 
            (
                <Pagination/> 
            ) : null }
        </>
    )
}

export default HistoryTable;
