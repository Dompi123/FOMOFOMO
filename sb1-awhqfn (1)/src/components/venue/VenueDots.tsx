import React from 'react';

interface VenueDotsProps {
  total: number;
  current: number;
  onChange: (index: number) => void;
}

export default function VenueDots({ total, current, onChange }: VenueDotsProps) {
  return (
    <div className="mt-4 flex justify-center space-x-2">
      {Array.from({ length: total }).map((_, idx) => (
        <button
          key={idx}
          className={`h-2 w-2 rounded-full transition-all duration-300 ${
            idx === current ? 'bg-white w-6' : 'bg-white/50'
          }`}
          onClick={() => onChange(idx)}
          aria-label={`Go to venue ${idx + 1}`}
        />
      ))}
    </div>
  );
}