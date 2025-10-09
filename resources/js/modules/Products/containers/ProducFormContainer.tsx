import { ErrorAlert } from "@/core/components/ErrorAlert";
import { useProductFormContainer } from "../hooks/useProductFormContainer";
import { ProductForm } from "../components/ProductForm";

export const ProductFormContainer = ({ id }: { id?: number }) => {
    const { error, setError, errorTitle, setErrorTitle, clearError } = useProductFormContainer()

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <ErrorAlert error={error} clearError={clearError} title={errorTitle} urlBack="/products"/>
            </div>
        );
    }

    return (
        <ProductForm id={id} setError={setError} setErrorTitle={setErrorTitle} />
    )
}
