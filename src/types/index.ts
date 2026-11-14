export type MenuCategory = 'ESPRESSO' | 'FILTER' | 'SIGNATURE' | 'COLD';

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  description: string;
  price: string;
  origin?: string;
  notes: string[];
  temperature: 'Hot' | 'Iced' | 'Choice';
  roastLevel: 'Light' | 'Medium' | 'Medium-Dark' | 'Dark';
  accentColor: string;
}

export interface BeanToCupStage {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  metric: string;
  metricLabel: string;
  details: string[];
}

export interface StoryMilestone {
  year: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  favoriteOrder: string;
}

export interface CafeInfo {
  name: string;
  tagline: string;
  address: string;
  neighborhood: string;
  hoursWeekday: string;
  hoursWeekend: string;
  phone: string;
  email: string;
  linkedin?: string;
}
