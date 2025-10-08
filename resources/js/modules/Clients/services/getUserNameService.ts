import apiService from "@/core/services/apiServices"

export const getUserNameService = async(id:number) => {
    try{
        const respose = await apiService.get(`clients/${id}`)
        return respose.data.data.name
    }catch(err){
        throw new Error(err.message)
    }
}
