import React, { useState } from 'react';
import HistorySelect from '../../components/history-select/history-select';
import HistoryTable from '../../components/history-table/history-table';
import Information from '../../components/information/information';
import HEXCODES from '../../constants/hexcodes';
import HISTORY_TYPE from '../../constants/history-type';
import LOCAL_STORAGE_KEY from '../../constants/local-storage-keys';

const BannerHistory = () => {
    const [historyType, setHistoryType] = useState<HISTORY_TYPE>(localStorage.getItem(LOCAL_STORAGE_KEY.HistoryType) as HISTORY_TYPE);

    return (
        <Information>
            <HistorySelect value={historyType} onChange={setHistoryType}/>
            <hr style={{margin: '10px 0'}}/>
            <article style={{backgroundColor: `${HEXCODES.DETAIL_BACKGROUND}`, color: `${HEXCODES.DETAIL_FONT_COLOR}`}}>
                <section style={{fontSize: '24px', marginBottom: '25px'}}>
                    * You can check the wishes you made as long as local storage persists. Wish records are updated about 1 second after the wish is made. If there is no record yet, something is wrong. The times displayed below are according to your current time. Please note any difference between the time zone of your location and your location. Server time zones: 天空岛 (UTC+8); 世界树 (UTC+8); TW, HK, MO (UTC+8); Asia (UTC+8); Europe (UTC+1); America (UTC-5)
                </section>
                <HistoryTable historyType={historyType}/>
            </article>
        </Information>
    )
}

export default BannerHistory;
