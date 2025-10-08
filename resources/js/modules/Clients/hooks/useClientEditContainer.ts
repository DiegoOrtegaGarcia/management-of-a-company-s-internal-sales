import { useState } from "react";

export const useClientEditContainer=()=>{
    const [error, setError] = useState<string | null>(null);
    const [errorTitle,setErrorTitle] = useState<string>("Error en el Formulario")

    const clearError = () => {
        setError(null);
    };
    return {error,setError,errorTitle,setErrorTitle,clearError}
}
