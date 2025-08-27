'use client';

import { useState, useEffect } from 'react';

const calculateTimeLeft = (targetDate: string) => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    };

    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    }

    return timeLeft;
};

interface CountdownTimerProps {
  targetDate: string;
  className?: string;
}

export function CountdownTimer({ targetDate, className }: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft(targetDate));
        }, 1000);

        return () => clearTimeout(timer);
    });

    if (!isClient) {
        return null;
    }
    
    const parts = [];
    if (timeLeft.days > 0) {
        parts.push(`${timeLeft.days} days`);
    }
    if (timeLeft.hours > 0) {
        parts.push(`${timeLeft.hours} hours`);
    }
    if (timeLeft.minutes > 0) {
        parts.push(`${timeLeft.minutes} min`);
    }

    if (parts.length === 0 && timeLeft.seconds > 0) {
       return (
         <div className={`text-center text-xs text-muted-foreground ${className}`}>
            Starting soon...
        </div>
       )
    }
    
    if (parts.length === 0) {
        return null;
    }

    return (
         <div className={`text-center text-xs text-muted-foreground font-semibold ${className}`}>
            {parts.join(' ')}
        </div>
    );
}
