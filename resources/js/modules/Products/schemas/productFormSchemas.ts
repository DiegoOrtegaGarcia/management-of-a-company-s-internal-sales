
import { z } from 'zod';

const baseProductSchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(255, 'El nombre no puede tener más de 255 caracteres'),

  price: z
    .number()
    .min(1, 'El precio debe ser al menos 1 centavo')
    .max(1000000, 'El precio es demasiado alto'),
});

export const productCreateSchema = baseProductSchema.extend({
  url: z
    .instanceof(File, { message: 'La imagen es requerida' })
    .refine(file => file.size <= 2 * 1024 * 1024, 'La imagen debe ser menor a 2MB')
    .refine(file => ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'].includes(file.type),
            'Solo se permiten imágenes JPEG, PNG, GIF o WebP')
});

export const productUpdateSchema = baseProductSchema.extend({
  url: z.union([
    z.instanceof(File)
      .refine(file => file.size <= 2 * 1024 * 1024, 'La imagen debe ser menor a 2MB')
      .refine(file => ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'].includes(file.type),
              'Solo se permiten imágenes JPEG, PNG, GIF o WebP'),
    z.string().optional()
  ]).optional()
});


export const getProductFormSchema = (isEdit: boolean) => isEdit ? productUpdateSchema : productCreateSchema;
