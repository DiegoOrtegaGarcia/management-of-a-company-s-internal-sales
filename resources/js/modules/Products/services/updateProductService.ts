import apiService from "@/core/services/apiServices";
import { ProductFormData } from "../types/productsTypes";

export const updateProductService = async (id: number, formData:ProductFormData) => {
  try {
    console.log(formData)
    const response = await apiService.put(`products/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (err: any) {
    console.log(err)
    throw new Error(err.response?.data?.message || err.message || "Error actualizando el producto");
  }
};
