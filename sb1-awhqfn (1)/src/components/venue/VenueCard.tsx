import React from 'react';
import { Share2, Trophy, Flame, Users } from 'lucide-react';
import CountdownTimer from './CountdownTimer';
import VenueRating from './VenueRating';
import { type Venue } from '../../types/venue';

interface VenueCardProps {
  venue: Venue;
  onSkipLine: () => void;
}

export default function VenueCard({ venue, onSkipLine }: VenueCardProps) {
  return (
    <div className="venue-card overflow-hidden rounded-2xl bg-black/20 backdrop-blur-md shadow-2xl">
      <div className="relative">
        <img
          src={venue.image}
          alt={venue.name}
          className="h-[400px] w-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        <div className="absolute top-4 right-4 flex space-x-2">
          <button className="bg-white/10 backdrop-blur-md p-2 rounded-full hover:bg-white/20 transition-all">
            <Share2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="relative -mt-24 space-y-4 p-6">
        <div className="flex justify-between items-start">
          <h2 className="text-3xl font-bold">{venue.name}</h2>
          <VenueRating rating={venue.rating} />
        </div>

        <div className="flex flex-wrap gap-2">
          {venue.isPopular && (
            <span className="badge flex items-center space-x-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 text-xs font-semibold">
              <Trophy className="h-3 w-3" />
              <span>Most Popular</span>
            </span>
          )}
          {venue.isTrending && (
            <span className="badge flex items-center space-x-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-3 py-1 text-xs font-semibold">
              <Flame className="h-3 w-3" />
              <span>Trending Now</span>
            </span>
          )}
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-300">Regular Queue: {venue.queueTime}</span>
          <span className="text-gray-300">Entry: {venue.price}</span>
        </div>

        <button
          onClick={onSkipLine}
          className="w-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4 text-lg font-bold text-white transition-all duration-300 hover:from-purple-600 hover:to-pink-600 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 group"
        >
          Skip the Line Now
          {venue.skipLineSpotsLeft > 0 && (
            <div className="mt-1 text-sm font-normal text-white/90 flex items-center justify-center group-hover:animate-pulse">
              <Users className="mr-1 h-4 w-4" />
              Only {venue.skipLineSpotsLeft} spots remaining!
            </div>
          )}
        </button>

        <CountdownTimer />
      </div>
    </div>
  );
}