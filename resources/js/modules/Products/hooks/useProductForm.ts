import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductFormData, ProductInterface } from "../types/productsTypes";
import { getProductService } from "../services/getProductService";
import { createProductService } from "../services/createProductService";
import { updateProductService } from "../services/updateProductService";
import { router } from "@inertiajs/react";
import { productFormSchema } from "../schemas/productFormSchemas";

export const useProductForm = (setError: (state: string) => void, setErrorTitle: (state: string) => void, id?: number) => {
  const [product, setProduct] = useState<ProductInterface | null>(null);
  const [loadingProduct, setLoadingProduct] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {register,handleSubmit,formState: { errors, isSubmitting, isValid },watch,reset,setValue,trigger,} = useForm<ProductFormData>({resolver: zodResolver(productFormSchema),mode: 'onChange',defaultValues: {  name: '',  price: 0}});

  const currentImage = watch('url');
  const currentName = watch('name');
  const currentPrice = watch('price');

  const fetchProduct = async (productId: number) => {
    setLoadingProduct(true);
    try {
      const productData = await getProductService(productId);
      setProduct(productData);
      reset({name: productData.name,price: productData.price});
      if (productData.url) {
        setImagePreview(`.././storage/${productData.url}`);
      }
    } catch (err: any) {
      setError(err.message);
      setErrorTitle("Error cargando el producto");
    } finally {
      setLoadingProduct(false);
    }
  };

  const handleFormSubmit = async (data: ProductFormData) => {
    try {
      if (id) {
        await updateProductService(id, data);
      } else {
        await createProductService(data);
      }
      router.visit("/products");
    } catch (err: any) {
      setError(err.message);
      setErrorTitle(id ? "Error actualizando el producto" : "Error creando el producto");
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue('url', file, { shouldValidate: true });
    }
  };

  const handleRemoveImage = () => {
    reset({url: undefined})
    setImagePreview(null);
    trigger('url');
  };

  const handleReset = () => {
    reset({
      name: product?.name || '',
      price: product?.price || 0,
    });
    const image = product?.url ? `.././storage/${product.url}` : null
    setImagePreview(image);
  };

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  useEffect(() => {
    if (currentImage && currentImage instanceof File) {
      const objectUrl = URL.createObjectURL(currentImage);
      setImagePreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [currentImage]);

  return {handleReset,handleSubmit,handleFormSubmit,handleImageChange,handleRemoveImage,register,errors,isSubmitting,isValid,loadingProduct,product,imagePreview,currentName,currentPrice,};
};
