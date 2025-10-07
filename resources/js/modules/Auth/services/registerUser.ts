import apiService from "@/core/services/apiServices"
import { RegisterFormData } from "../types/authTypes"

export const registerUser = async(data:RegisterFormData) => {
    try{
        await apiService.post("register",data)
    }catch(error){
        throw new Error(error.response.data.message)
    }
}
