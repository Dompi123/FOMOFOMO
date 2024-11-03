import React, { useState } from 'react';
import VenueCarousel from './venue/VenueCarousel';
import SkipTheLinePass from './venue/SkipTheLinePass';
import { venues } from '../data/venues';

export default function VenueScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPassModal, setShowPassModal] = useState(false);

  const handleSkipLine = () => {
    setShowPassModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white flex items-center justify-center p-4">
      <div className="venue-carousel relative w-full max-w-md">
        <VenueCarousel
          venues={venues}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          onSkipLine={handleSkipLine}
        />
        <SkipTheLinePass
          isOpen={showPassModal}
          onClose={() => setShowPassModal(false)}
          venue={venues[currentIndex]}
        />
      </div>
    </div>
  );
}