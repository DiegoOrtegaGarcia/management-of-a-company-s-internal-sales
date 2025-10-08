import apiService from "@/core/services/apiServices";
import { clientFormData } from "../types/clientsTypes";

export const editClientService= async(data:clientFormData) =>{
    try{
        await apiService.put(`clients/${data.id}`,{name:data.name,cash:data.cash})
    }catch(err){
        console.log(err)
    }
}
