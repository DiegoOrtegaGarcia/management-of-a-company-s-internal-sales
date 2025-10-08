import apiService from "@/core/services/apiServices"

export const deleteClientService = async(id:number) => {
    try{
        await apiService.delete(`clients/${id}`)
    }catch(error){
        throw new Error(error.message)
    }
}
