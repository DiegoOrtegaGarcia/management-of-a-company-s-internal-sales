// resources/js/core/services/userLogout.ts
import apiService from "./apiServices"
import { removeAuthCookies } from "../utils/userCookies"
import { useAuthStore } from "../stores/authStore"

export const userLogout = async () => {
    try {
        await apiService.post("logout")
    } catch{
        console.log("Logout API call failed, but continuing with client-side logout")
    } finally {
        removeAuthCookies()
        useAuthStore.getState().setIsNotAuthenticated()
        window.location.href = '/login'
    }
}
