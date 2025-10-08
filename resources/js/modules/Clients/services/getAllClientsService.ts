import apiService from "@/core/services/apiServices"

export const getAllClientsService = async (page:number) => {
    try{
        const response = await apiService.get(`/clients?page=${page}`);
        return {clients:response.data.data,pagination:response.data.pagination};
    }catch(error){
        throw new Error(error.message);
    }
}
