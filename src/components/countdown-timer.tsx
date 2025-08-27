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
        if (value > 0) {
            return (
                <div key={interval} className="flex flex-col items-center">
                    <span className="font-bold text-lg">{String(value).padStart(2, '0')}</span>
                    <span className="text-xs uppercase">{interval}</span>
                </div>
            );
        }
        return null;
    }).filter(Boolean);

    return timerComponents.length > 0 ? (
        <div className={`flex items-center justify-center gap-3 md:gap-4 text-center ${className}`}>
            {timerComponents}
        </div>
    ) : null;
}
