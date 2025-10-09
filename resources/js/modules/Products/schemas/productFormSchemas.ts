import { z } from 'zod';

export const productFormSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(255, 'El nombre no puede tener más de 255 caracteres'),

  price: z
    .number()
    .min(0, 'El precio no puede ser negativo')
    .max(1000000, 'El precio es demasiado alto'),

  url: z
    .instanceof(File)
    .refine(file => !file || file.size <= 2 * 1024 * 1024, 'La imagen debe ser menor a 2MB')
    .refine(file => !file || ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'].includes(file.type), 'Solo se permiten imágenes JPEG, PNG, GIF o WebP')
});
