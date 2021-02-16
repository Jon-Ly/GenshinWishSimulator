import { faReply } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import HEXCODES from '../../constants/hexcodes';

interface InformationProps {
    children?: React.ReactNode
}

const Information = ({children}: InformationProps) => {
    
    const InformationNavbar = () => (
        <nav style={{height: '50px', width: '100%', backgroundColor: 'black'}}>
            <Link to='/' style={{fontSize: '34px', marginLeft: '35px'}}>
                <button>
                    <FontAwesomeIcon icon={faReply}/>
                </button>
            </Link>
        </nav>
    );

    return (
        <div style={{backgroundColor: `${HEXCODES.DETAIL_BACKGROUND}`, color: `${HEXCODES.DETAIL_FONT_COLOR}`}}>
            <InformationNavbar/>
            <hr style={{marginBottom: '75px'}}/>
            <div className='container'>
                {children}
            </div>
            <hr style={{marginTop: '75px'}}/>
        </div>
    )
}

export default Information;
