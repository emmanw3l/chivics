export interface CarImage {
  id: string;
  url: string;
  storagePath: string;
  order: number;
}

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: string; // Decimal comes over the wire as a string
  description: string;
  mileage?: number | null;
  transmission?: string | null;
  fuelType?: string | null;
  images: CarImage[];
}