export interface Property {
  _id?: string;
  title: string;
  price: number;
  location: string;
  sector: string;
  description: string;
  type: 'Residential' | 'Commercial';
  images: string[];
  updatedAt: Date;
}