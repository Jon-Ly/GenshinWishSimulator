import React, { useEffect, useState } from 'react';
import HEXCODES from '../../constants/hexcodes';
import { ItemData } from '../../constants/user-data';
import { useWishState } from '../../state-management/store';
import '../../styles/item-table.css';

const HistoryTable = () => {
    const [page, setPage] = useState(1);
    const [tableData, setTableData] = useState<Array<ItemData>>([]);
    const wishState = useWishState();
    const items = wishState.items.filter(item => !!item.timestamp);

    useEffect(() => {
        const start = (page - 1) * 6;
        const end = (page) * 6;
        setTableData(items.splice(start, end));
    }, [page]);

    const Pagination = () => (
        <>
            <button onClick={() => setPage(page === 1 ? page : page - 1)}>left</button>
            {page}
            <button onClick={() => setPage(6 * page >= items.length ? page : page + 1)}>right</button>
        </>
    )

    return (
        <>
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
                        tableData.map((item, index) => (
                            <tr key={`${item.name}-${index}`}>
                                <td>{item.type}</td>
                                <td style={{color: item.stars === 4 ? HEXCODES.FOUR_STAR_HISTORY_COLOR : item.stars === 5 ? HEXCODES.FIVE_STAR_HISTORY_COLOR : ''}}>
                                    {item.name} {item.stars >= 4 ? `(${item.stars}-star)` : null}
                                </td>
                                <td>{item.timestamp}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <Pagination/>
        </>
    )
}

export default HistoryTable;
