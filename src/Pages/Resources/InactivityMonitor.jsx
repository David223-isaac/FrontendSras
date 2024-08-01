import React, { useEffect } from 'react';

const InactivityMonitor = ({ children, onInactive }) => {
    useEffect(() => {
        let inactivityTimer;

        const resetTimer = () => {
            clearTimeout(inactivityTimer);
            inactivityTimer = setTimeout(() => {
                onInactive();
            }, 2400000);
        };

   
        const events = ['mousemove', 'mousedown', 'keydown', 'touchstart'];
        events.forEach(event => {
            document.addEventListener(event, resetTimer);
        });


        resetTimer();

        return () => {
            events.forEach(event => {
                document.removeEventListener(event, resetTimer);
            });
            clearTimeout(inactivityTimer);
        };
    }, [onInactive]);

    return <>{children}</>;
};

export default InactivityMonitor;