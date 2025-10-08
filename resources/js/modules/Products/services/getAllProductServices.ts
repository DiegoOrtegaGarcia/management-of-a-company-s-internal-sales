import apiService from "@/core/services/apiServices"

export const getAllProductServices= async() => {
    try{
        const response = await apiService.get("/products")
        return {products: response.data.products.data,paginator:response.data.products.pagination};
    }catch(err){
        throw new Error(err.message);
    }
}
