import React, { useEffect } from 'react';
import './scroll-container.css';

interface ScrollContainerProps {
    children?: React.ReactNode,
    className?: string
    style?: React.CSSProperties,
}

const ScrollContainer = ({children, className, style}: ScrollContainerProps) => {

    const scrollItemsRef = React.createRef<HTMLDivElement>();

    useEffect(() => {
        const children = Array.from(scrollItemsRef.current ? scrollItemsRef.current.children : []);

        if (children) {
            children.forEach(c => {
                if (c.classList.contains('tab-active')) {
                    c.scrollIntoView();
                }
            });
        }
    }, [scrollItemsRef])

    return (
        <div className={`${className} scroll-container`} style={style}>
            <div className='scroll-items' ref={scrollItemsRef}>
                {children}
            </div>
        </div>
    )
}

export default ScrollContainer;