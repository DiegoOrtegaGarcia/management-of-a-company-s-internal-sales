import apiService from "@/core/services/apiServices";
import { LoginFormData } from "../types/authTypes";
import { setAuthCookies } from "@/core/utils/userCookies";

export const loginUser = async(data:LoginFormData) => {
    try{
        const response = await apiService.post("login",data)
        setAuthCookies(response.data.token);
    }catch(error){
        throw new Error(error.response.data.message)
    }

}
