import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import BANNERS, { BANNER_CODE } from '../../constants/banners';
import './select.css';

export interface ListItem {
    value: any,
    label: any
}

interface SelectProps {
    listItems: Array<ListItem>,
    value: any,
    onChange: (event: BANNER_CODE) => void
}

const Select = (props: SelectProps) => {
    const { listItems, value, onChange } = props;
    const [showSelection, setShowSelection] = React.useState<boolean>(false);
    const inputLabel = BANNERS.find(b => b.code === value)?.label;

    const toggleShowSelection = () => setShowSelection(showSelection => !showSelection);
    const toggleShowSelectionFalse = () => setShowSelection(false);

    return (
        <div className='select-outer-wrapper'>
            <div className='select-inner-wrapper' onClick={toggleShowSelection} onBlur={toggleShowSelectionFalse} tabIndex={0}>
                <input value={inputLabel} style={{width: '100%'}} readOnly/>
                {
                    showSelection ?
                    <FontAwesomeIcon icon={faSortUp} className='dropdown-arrow-up'/> :
                    <FontAwesomeIcon icon={faSortDown} className='dropdown-arrow-down'/>
                }
                {
                    showSelection && (
                        <ul className='select'>
                            {
                                listItems.map(listItem => {
                                    return (
                                        <li key={listItem.value} className={listItem.value === value ? 'item-active' : ''} onClick={() => onChange(listItem.value)}>
                                            {listItem.label}
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    )
                }
            </div>
        </div>
    )
}

export default Select;
