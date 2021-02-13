import { Link } from 'react-router-dom';
import { faReply } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const InformationNavbar = () => (
    <nav style={{height: '50px', width: '100%', backgroundColor: 'black'}}>
        <Link to='/' style={{fontSize: '34px', marginLeft: '35px'}}>
            <button>
                <FontAwesomeIcon icon={faReply}/>
            </button>
        </Link>
    </nav>
);

export default InformationNavbar;
