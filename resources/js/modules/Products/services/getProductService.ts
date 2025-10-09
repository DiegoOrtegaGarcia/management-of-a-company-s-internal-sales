import apiService from "@/core/services/apiServices";

export const getProductService = async (id: number) => {
  try {
    const response = await apiService.get(`products/${id}`);
    return response.data.product;
  } catch (err: any) {
    throw new Error(err.response?.data?.message || err.message || "Error cargando el producto");
  }
};
