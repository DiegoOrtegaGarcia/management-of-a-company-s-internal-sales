export type ProductFormData = z.core.output<z.ZodObject<{url: z.ZodOptional<z.ZodUnion<readonly [z.ZodCustom<File, File>, z.ZodOptional<z.ZodString>]>>;}, z.core.$strip> | z.ZodObject<{name: z.ZodString;price: z.ZodNumber;url: z.ZodCustom<File, File>;}, z.core.$strip>>

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

