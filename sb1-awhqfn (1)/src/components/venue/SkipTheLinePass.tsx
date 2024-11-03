import React, { useState } from 'react';
import { AppleIcon } from './icons/AppleIcon';
import DrinkMenu from './DrinkMenu';
import { type Venue } from '../../types/venue';

interface SkipTheLinePassProps {
  isOpen: boolean;
  onClose: () => void;
  venue: Venue;
}

export default function SkipTheLinePass({ isOpen, onClose, venue }: SkipTheLinePassProps) {
  const [step, setStep] = useState<'purchase' | 'wallet' | 'menu'>('purchase');
  
  const handlePurchase = () => {
    setStep('wallet');
  };

  const handleAddToWallet = () => {
    setStep('menu');
  };

  if (!isOpen) return null;

  return (
    <>
      {step !== 'menu' && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white text-black rounded-2xl max-w-md w-full p-6 space-y-4">
            {step === 'purchase' && (
              <>
                <h2 className="text-2xl font-bold">Skip the Line Pass</h2>
                <p className="text-gray-600">Get immediate entry to {venue.name}</p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Pass Price</span>
                    <span className="font-bold">$20</span>
                  </div>
                  <button
                    onClick={handlePurchase}
                    className="w-full bg-black text-white rounded-full py-3 font-semibold hover:bg-gray-800 transition-colors"
                  >
                    Purchase Pass
                  </button>
                </div>
              </>
            )}

            {step === 'wallet' && (
              <div className="text-center space-y-4">
                <AppleIcon className="w-12 h-12 mx-auto" />
                <h2 className="text-2xl font-bold">Add to Apple Wallet</h2>
                <p className="text-gray-600">
                  Add your Skip the Line Pass to Apple Wallet for easy access
                </p>
                <button
                  onClick={handleAddToWallet}
                  className="w-full bg-black text-white rounded-full py-3 font-semibold hover:bg-gray-800 transition-colors"
                >
                  Add to Apple Wallet
                </button>
              </div>
            )}

            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {step === 'menu' && <DrinkMenu onClose={onClose} />}
    </>
  );
}