import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { BANNER_CODE } from '../../constants/banners';
import HISTORY_TYPE from '../../constants/history-type';
import { ItemData } from '../../constants/user-data';
import { useWishState } from '../../state-management/store';
import '../../styles/item-table.css';
import './history-table.css';

interface RowDataProps {
    item: ItemData
}

interface HistoryTableProps {
    historyType: HISTORY_TYPE
}

const HistoryTable = ({historyType}: HistoryTableProps) => {
    const [page, setPage] = useState(1);
    const [tableData, setTableData] = useState<Array<ItemData>>([]);
    const wishState = useWishState();
    const [validItems, setValidItems] = useState<Array<ItemData>>([]);

    const updateTableData = () => {
        const start = (page - 1) * 6;
        const end = (page) * 6;

        setValidItems(() => {
            const items = wishState.items.filter(item => {
                const isWanderlust = historyType === HISTORY_TYPE.WANDERLUST && item.banner === BANNER_CODE.WANDERLUST;
                const isCharacterEvent = historyType !== HISTORY_TYPE.WANDERLUST && item.banner !== BANNER_CODE.WANDERLUST;
                return !!item.timestamp && (isWanderlust || isCharacterEvent);
            });

            setTableData(items.slice(start, end));
            return items;
        });
    }

    useEffect(updateTableData, [page]);

    useEffect(() => {
        if (page === 1) {
            updateTableData();
        } else {
            setPage(1);
        }
    }, [historyType]);

    const decrementPage = () => setPage(page === 1 ? page : page - 1);

    const incrementPage = () => setPage(6 * page >= validItems.length ? page : page + 1);

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

    const Row = ({item}: RowDataProps) => {
        const itemColor = item.stars === 4 ? '#A45AE1' : item.stars === 5 ? '#BF6D38' : '';
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
                            tableData.length > 0 ?
                            (
                                tableData.map((item, index) => <Row key={`${item.name}-${index}`} item={item}/>)
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
