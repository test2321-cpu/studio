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

    const timerComponents = Object.entries(timeLeft).map(([interval, value]) => {
        if (value > 0 || (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds >= 0)) {
             return (
                <div key={interval} className="flex flex-col items-center">
                    <span className="font-semibold text-xs">{String(value).padStart(2, '0')}</span>
                    <span className="text-muted-foreground uppercase" style={{ fontSize: '0.5rem' }}>{interval}</span>
                </div>
            );
        }
        return null;
    }).filter(Boolean);

    return timerComponents.length > 0 ? (
        <div className={`flex items-start justify-center gap-2 md:gap-3 text-center ${className}`}>
            {timerComponents}
        </div>
    ) : null;
}
