import React, { useEffect, useState } from "react";

const Timer = ({ time, onExpire }) => {
    const [seconds, setSeconds] = useState(time);

    useEffect(() => {
        setSeconds(time); // reset timer when `time` changes
    }, [time]);

    useEffect(() => {
        if (seconds <= 0) {
            onExpire();
            return; // stop countdown
        }
        const interval = setInterval(() => {
            setSeconds((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [seconds, onExpire]);

    return <div>Time Left: {seconds}s</div>;
};

export default Timer;
