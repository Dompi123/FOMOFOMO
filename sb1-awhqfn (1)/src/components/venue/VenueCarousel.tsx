import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import VenueCard from './VenueCard';
import VenueDots from './VenueDots';
import { type Venue } from '../../types/venue';

interface VenueCarouselProps {
  venues: Venue[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  onSkipLine: () => void;
}

export default function VenueCarousel({
  venues,
  currentIndex,
  setCurrentIndex,
  onSkipLine,
}: VenueCarouselProps) {
  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? venues.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === venues.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full backdrop-blur-md hover:bg-black/75 transition-all duration-300"
        aria-label="Previous venue"
      >
        <ArrowLeft className="h-6 w-6" />
      </button>

      <VenueCard venue={venues[currentIndex]} onSkipLine={onSkipLine} />

      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full backdrop-blur-md hover:bg-black/75 transition-all duration-300"
        aria-label="Next venue"
      >
        <ArrowRight className="h-6 w-6" />
      </button>

      <VenueDots
        total={venues.length}
        current={currentIndex}
        onChange={setCurrentIndex}
      />
    </>
  );
}