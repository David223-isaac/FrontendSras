// import './App.css';
// import Router from './Router';

// function App() {
//   return (
//     <Router/>
//   );
// }

// export default App;


import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Router from './Router';


const useActivityDetector = (timeout = 15 * 1000) => {
    const [lastActivityTime, setLastActivityTime] = useState(Date.now());

    const resetActivityTimer = useCallback(() => {
        setLastActivityTime(Date.now());
    }, []);

    useEffect(() => {
        const events = ['mousemove', 'keydown', 'mousedown', 'touchstart'];

        const handleActivity = () => {
            resetActivityTimer();
        };

        events.forEach((event) => {
            window.addEventListener(event, handleActivity);
        });

        return () => {
            events.forEach((event) => {
                window.removeEventListener(event, handleActivity);
            });
        };
    }, [resetActivityTimer]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (Date.now() - lastActivityTime < timeout) {
                // Detected activity, refresh token
                axios.post('http://localhost:8000/login/refreshToken', {}, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }).then((response) => {
                    const { token } = response.data;
                    localStorage.setItem('token', token);
                    console.log('Token renovado:', token);
                }).catch((error) => {
                    console.error('Error al renovar el token', error);
                });
            }
        }, timeout / 2); // Refresh token before it expires

        return () => clearInterval(interval);
    }, [lastActivityTime, timeout]);

    return lastActivityTime;
};

const App = () => {
    useActivityDetector();

    return (
      <Router/>
    );
};

export default App;
