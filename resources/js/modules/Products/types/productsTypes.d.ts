// types/productsTypes.ts
export interface ProductFormData {
  name: string;
  price: number;
  url: File;
}

export interface ProductInterface {
  id: number;
  name: string;
  price: number;
  url?: string;
}

export interface ProductFormProps {
  id?: number;
  setError: (state: string | null) => void;
  setErrorTitle: (state: string) => void;
}

export interface ProductCardProps {
  product: ProductInterface;
  reFetch: () => void;
  setError: (state: string | null) => void;
  setErrorTitle: (state: string) => void;
}
