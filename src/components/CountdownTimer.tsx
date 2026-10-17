'use client';

import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate?: string;
  themeColor?: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  targetDate,
  themeColor = '#D4AF37',
}) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    if (!targetDate) return;

    const calculate = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isPast: false,
      });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!targetDate) return null;

  if (timeLeft.isPast) {
    return (
      <div className="rounded-2xl border border-royal-gold/30 bg-royal-dark/60 p-4 text-center">
        <p className="font-serif text-sm tracking-wider text-royal-champagne uppercase">
          ✦ The celebration has commenced! ✦
        </p>
      </div>
    );
  }

  return (
    <section aria-label="Event countdown" className="my-6 px-1">
      <div className="grid grid-cols-4 gap-1.5 sm:gap-3 max-w-md mx-auto">
        {[
          { label: 'Days', value: timeLeft.days },
          { label: 'Hours', value: timeLeft.hours },
          { label: 'Mins', value: timeLeft.minutes },
          { label: 'Secs', value: timeLeft.seconds },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center rounded-xl border border-royal-gold/30 bg-royal-dark/80 py-2 sm:py-3.5 px-1 sm:px-3 shadow-md backdrop-blur-sm"
          >
            <span
              className="font-serif text-lg sm:text-2xl font-bold tracking-tight"
              style={{ color: themeColor }}
            >
              {String(item.value).padStart(2, '0')}
            </span>
            <span className="text-[9px] sm:text-xs uppercase tracking-wider text-gray-300 font-sans mt-0.5">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
