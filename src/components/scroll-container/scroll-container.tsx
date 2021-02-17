import { faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './scroll-container.css';

interface ScrollContainerProps {
    children?: React.ReactNode,
    className?: string
    style?: React.CSSProperties,
}

type Direction = 'RIGHT' | 'LEFT';

const ScrollContainer = ({children, className, style}: ScrollContainerProps) => {

    const scrollItemsRef = React.createRef<HTMLDivElement>();

    const scroll = (direction: Direction) => {
        if (scrollItemsRef && scrollItemsRef.current) {
            const scrollDistance = 160;

            if (direction === 'LEFT') {
                scrollItemsRef.current.scrollLeft = scrollItemsRef.current.scrollLeft - scrollDistance;
            } else {
                scrollItemsRef.current.scrollLeft = scrollItemsRef.current.scrollLeft + scrollDistance;
            }
        }
    }

    return (
        <div className={`${className} scroll-container`} style={style}>
            <button className='scroll-button scroll-button-left' onClick={() => scroll('LEFT')}>
                <FontAwesomeIcon icon={faAngleDoubleLeft}/>
            </button>
            <div className='scroll-items' ref={scrollItemsRef}>
                {children}
            </div>
            <button className='scroll-button scroll-button-right' onClick={() => scroll('RIGHT')}>
                <FontAwesomeIcon icon={faAngleDoubleRight}/>
            </button>
        </div>
    )
}

export default ScrollContainer;