import apiService from "@/core/services/apiServices"
import { clientFormData } from "../types/clientsTypes"

export const createClientService= async(data:clientFormData) => {
    try{
        await apiService.post("clients",data)
    }catch(err){
        throw new Error(err.message)
    }
}
