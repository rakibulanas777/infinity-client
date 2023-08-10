import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ endTime, onCountdownComplete }) => {
    const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

    function getTimeRemaining() {
        const now = new Date().getTime();
        const end = new Date(endTime).getTime();
        const timeRemaining = Math.max(end - now, 0);

        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
    }

    useEffect(() => {
        const timer = setInterval(() => {
            const remainingTime = getTimeRemaining();
            setTimeLeft(remainingTime);

            // Check if the countdown has reached zero
            if (
                remainingTime.days === 0 &&
                remainingTime.hours === 0 &&
                remainingTime.minutes === 0 &&
                remainingTime.seconds === 0
            ) {
                clearInterval(timer);
                onCountdownComplete(); // Trigger the callback function
            }
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div>
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </div>
    );
};

export default CountdownTimer;
