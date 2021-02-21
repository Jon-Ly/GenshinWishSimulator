import React, { useEffect } from 'react';
import './scroll-container.css';

interface ScrollContainerProps {
    children?: React.ReactNode,
    className?: string
    style?: React.CSSProperties,
}

type Direction = 'RIGHT' | 'LEFT';

const ScrollContainer = ({children, className, style}: ScrollContainerProps) => {

    const scrollItemsRef = React.createRef<HTMLDivElement>();

    useEffect(() => {
        console.log(scrollItemsRef);
    }, [])

    return (
        <div className={`${className} scroll-container`} style={style}>
            <div className='scroll-items' ref={scrollItemsRef}>
                {children}
            </div>
        </div>
    )
}

export default ScrollContainer;