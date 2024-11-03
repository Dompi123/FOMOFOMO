import React from 'react';
import { GlassWater, Coffee, Wine, Star, Clock, Plus, Sparkles } from 'lucide-react';
import { type Drink } from '../../types/venue';

interface DrinkMenuProps {
  onClose: () => void;
}

const drinks: Drink[] = [
  {
    id: 1,
    name: 'Signature Mojito',
    price: '$12',
    image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&q=80',
    category: 'Cocktail',
    isPopular: true,
    preparationTime: '4 min',
    description: 'Fresh mint, lime juice, rum, simple syrup',
  },
  {
    id: 2,
    name: 'Classic Martini',
    price: '$14',
    image: 'https://images.unsplash.com/photo-1575023782549-62ca0d244b39?auto=format&fit=crop&q=80',
    category: 'Cocktail',
    isPopular: true,
    preparationTime: '3 min',
    description: 'Gin, dry vermouth, olive garnish',
  },
  {
    id: 3,
    name: 'Espresso Martini',
    price: '$13',
    image: 'https://images.unsplash.com/photo-1545418950-8d3d76219c45?auto=format&fit=crop&q=80',
    category: 'Coffee',
    isPopular: false,
    preparationTime: '5 min',
    description: 'Vodka, coffee liqueur, fresh espresso',
  },
  {
    id: 4,
    name: 'House Red Wine',
    price: '$10',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80',
    category: 'Wine',
    isPopular: false,
    preparationTime: '1 min',
    description: 'Premium California red blend',
  },
];

const categories = [
  { icon: GlassWater, label: 'Cocktails' },
  { icon: Coffee, label: 'Coffee' },
  { icon: Wine, label: 'Wine' },
];

export default function DrinkMenu({ onClose }: DrinkMenuProps) {
  const [selectedCategory, setSelectedCategory] = React.useState('Cocktail');
  const [cart, setCart] = React.useState<{ id: number; quantity: number }[]>([]);
  const [addedItems, setAddedItems] = React.useState<Set<number>>(new Set());

  const filteredDrinks = drinks.filter(drink => drink.category === selectedCategory);
  const popularDrinks = drinks.filter(drink => drink.isPopular);

  const addToCart = (drinkId: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === drinkId);
      if (existing) {
        return prev.map(item =>
          item.id === drinkId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { id: drinkId, quantity: 1 }];
    });

    // Show animation for newly added items
    setAddedItems(prev => new Set([...prev, drinkId]));
    setTimeout(() => {
      setAddedItems(prev => {
        const next = new Set(prev);
        next.delete(drinkId);
        return next;
      });
    }, 1500);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => {
    const drink = drinks.find(d => d.id === item.id);
    return sum + (parseInt(drink?.price.slice(1) || '0') * item.quantity);
  }, 0);

  const discountProgress = Math.min((totalItems / 3) * 100, 100);
  const itemsToDiscount = Math.max(3 - totalItems, 0);

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 overflow-y-auto animate-in slide-in-from-bottom">
      <div className="min-h-screen max-w-md mx-auto bg-gray-900 text-white">
        <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
          <div className="flex justify-between items-center p-4">
            <h2 className="text-2xl font-bold">Drink Menu</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Progress Bar */}
          <div className="px-4 pb-4">
            <div className="bg-gray-800 rounded-full h-2 mb-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${discountProgress}%` }}
              />
            </div>
            {itemsToDiscount > 0 ? (
              <p className="text-sm text-gray-400 text-center">
                Add {itemsToDiscount} more {itemsToDiscount === 1 ? 'drink' : 'drinks'} for 15% off!
              </p>
            ) : (
              <p className="text-sm text-purple-400 text-center flex items-center justify-center">
                <Sparkles className="h-4 w-4 mr-1" />
                15% discount unlocked!
              </p>
            )}
          </div>

          <div className="flex space-x-4 p-4 overflow-x-auto">
            {categories.map(({ icon: Icon, label }) => (
              <button
                key={label}
                onClick={() => setSelectedCategory(label)}
                className={`flex flex-col items-center px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === label
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                <Icon className="h-6 w-6 mb-1" />
                <span className="text-sm">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 space-y-6">
          {popularDrinks.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <Star className="h-5 w-5 text-yellow-400 mr-2" />
                Popular Drinks
              </h3>
              <div className="flex space-x-4 overflow-x-auto pb-4">
                {popularDrinks.map(drink => (
                  <div
                    key={drink.id}
                    className={`flex-shrink-0 w-48 bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 ${
                      addedItems.has(drink.id) ? 'scale-105' : ''
                    }`}
                  >
                    <div className="relative">
                      <img
                        src={drink.image}
                        alt={drink.name}
                        className="h-32 w-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
                          Popular
                        </span>
                      </div>
                    </div>
                    <div className="p-3 space-y-2">
                      <h4 className="font-medium">{drink.name}</h4>
                      <p className="text-sm text-gray-400">{drink.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-purple-400">
                          {drink.price}
                        </span>
                        <button
                          onClick={() => addToCart(drink.id)}
                          className={`p-2 rounded-full transition-all duration-300 ${
                            addedItems.has(drink.id)
                              ? 'bg-green-500'
                              : 'bg-purple-500 hover:bg-purple-600'
                          }`}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section>
            <h3 className="text-lg font-semibold mb-3">{selectedCategory}</h3>
            <div className="grid gap-4">
              {filteredDrinks.map(drink => (
                <div
                  key={drink.id}
                  className={`flex bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 ${
                    addedItems.has(drink.id) ? 'scale-[1.02]' : ''
                  }`}
                >
                  <img
                    src={drink.image}
                    alt={drink.name}
                    className="h-24 w-24 object-cover"
                  />
                  <div className="flex-1 p-3 flex flex-col justify-between">
                    <div>
                      <h4 className="font-medium">{drink.name}</h4>
                      <p className="text-sm text-gray-400">{drink.description}</p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center text-sm text-gray-400">
                        <Clock className="h-4 w-4 mr-1" />
                        {drink.preparationTime}
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="font-bold text-purple-400">
                          {drink.price}
                        </span>
                        <button
                          onClick={() => addToCart(drink.id)}
                          className={`p-2 rounded-full transition-all duration-300 ${
                            addedItems.has(drink.id)
                              ? 'bg-green-500'
                              : 'bg-purple-500 hover:bg-purple-600'
                          }`}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {totalItems > 0 && (
          <div className="sticky bottom-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-800 p-4">
            <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg py-3 flex items-center justify-between px-6 hover:from-purple-600 hover:to-pink-600 transition-colors">
              <span className="font-semibold">View Order</span>
              <div className="flex items-center space-x-2">
                <span>${totalPrice}</span>
                <span className="bg-white/20 px-2 py-1 rounded-full text-sm">
                  {totalItems} items
                </span>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}