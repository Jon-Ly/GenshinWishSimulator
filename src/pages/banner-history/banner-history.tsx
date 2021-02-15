import React from 'react';
import HistorySelect from '../../components/history-select/history-select';
import HistoryTable from '../../components/history-table/history-table';
import Information from '../../components/information/information';
import HEXCODES from '../../constants/hexcodes';

const BannerHistory = () => (
    <Information>
        <HistorySelect/>
        <hr style={{margin: '10px 0'}}/>
        <article style={{backgroundColor: `${HEXCODES.DETAIL_BACKGROUND}`, color: `${HEXCODES.DETAIL_FONT_COLOR}`}}>
            <section style={{fontSize: '24px', marginBottom: '25px'}}>
                * You can check the wishes you made as long as local storage persists. Wish records are updated about 1 second after the wish is made. If there is no record yet, something is wrong. The times displayed below are according to your current time. Please note any difference between the time zone of your location and your location. Server time zones: 天空岛 (UTC+8); 世界树 (UTC+8); TW, HK, MO (UTC+8); Asia (UTC+8); Europe (UTC+1); America (UTC-5)
            </section>
            <HistoryTable/>
        </article>
    </Information>
)

export default BannerHistory;
