export interface PricingPlan {
  id: string;
  name: string;
  tag?: string;
  originalPrice: string;
  currentPrice: string;
  isPopular?: boolean;
  benefits: string[];
  buttonText: string;
  checkoutUrl: string;
  badge?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  handle: string;
  role: string;
  avatar: string;
  comment: string;
  rating: number;
  chipsWon: string;
  winRate: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
