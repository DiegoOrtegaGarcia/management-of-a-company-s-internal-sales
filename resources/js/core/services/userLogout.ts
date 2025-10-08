// resources/js/core/services/userLogout.ts
import apiService from "./apiServices"
import { removeAuthCookies } from "../utils/userCookies"
import { useAuthStore } from "../stores/authStore"
import { router } from '@inertiajs/react';

export const userLogout = async () => {
    try {
        await apiService.post("logout")
    } catch{
        console.log("Logout API call failed, but continuing with client-side logout")
    } finally {
        removeAuthCookies()
        useAuthStore.getState().setIsNotAuthenticated()
        router.visit('/login');
    }
}
