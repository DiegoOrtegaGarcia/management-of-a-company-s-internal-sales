import apiService from "@/core/services/apiServices";
import { ProductFormData } from "../types/productsTypes";

export const createProductService = async (formData: ProductFormData) => {
  try {
    const response = await apiService.post("products", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || err.message || "Error creando el producto");
  }
};

