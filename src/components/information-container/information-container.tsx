import { faReply } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

interface InformationProps {
    children?: React.ReactNode,
    style?: React.CSSProperties,
    className?: string
}

const InformationContainer = ({children, style, className}: InformationProps) => {
    
    const InformationNavbar = () => (
        <nav style={{height: '50px', width: '100%', backgroundColor: 'black'}}>
            <Link to='/' style={{fontSize: '34px', marginLeft: '35px'}}>
                <button className='back-button'>
                    <FontAwesomeIcon icon={faReply}/>
                </button>
            </Link>
        </nav>
    );

    return (
        <div style={{backgroundColor: '#EBEBEB', color: '#727272', minHeight: '100vh'}}>
            <InformationNavbar/>
            <hr style={{marginBottom: '75px'}}/>
            <div className={`container ${className}`} style={style}>
                {children}
            </div>
            <hr style={{marginTop: '75px'}}/>
        </div>
    )
}

export default InformationContainer;
