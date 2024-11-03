export interface Venue {
  id: number;
  name: string;
  image: string;
  isPopular: boolean;
  isTrending: boolean;
  skipLineSpotsLeft: number;
  price: string;
  rating: number;
  queueTime: string;
}

export interface Drink {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
  isPopular: boolean;
  preparationTime: string;
  description: string;
}