import React from 'react';
import { Trophy } from 'lucide-react';

interface VenueRatingProps {
  rating: number;
}

export default function VenueRating({ rating }: VenueRatingProps) {
  return (
    <div className="flex items-center space-x-1">
      <Trophy className="h-4 w-4 text-yellow-400" />
      <span className="text-yellow-400 font-semibold">{rating}</span>
    </div>
  );
}