import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerId = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex items-center justify-center space-x-2 text-sm font-medium text-white bg-black/40 rounded-full px-4 py-2 backdrop-blur-sm">
      <Clock className="h-4 w-4 text-pink-500" />
      <span>
        Offer ends in {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </span>
    </div>
  );
}