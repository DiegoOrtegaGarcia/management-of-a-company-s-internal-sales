import { useState } from "react";

export const useProductFormContainer = () => {
    const [error, setError] = useState<string | null>(null);
    const [errorTitle, setErrorTitle] = useState<string>("Error en el Formulario");

    const clearError = () => {
        setError(null);
    };

    return { error, setError, errorTitle, setErrorTitle, clearError };
};
