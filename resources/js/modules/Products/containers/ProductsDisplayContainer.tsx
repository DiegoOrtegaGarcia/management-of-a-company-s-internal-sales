import { LoadingSpiner } from "@/core/components/LoadingSpin"
import { Pagination } from "@/core/components/Paginator"
import { ProductCard } from "../components/ProductCard"
import { useProductDisplayContainer } from "../hooks/useProductDisplayContainer"
import { ProductInterface } from "../types/productsTypes"
import { ErrorAlert } from "@/core/components/ErrorAlert"
import { router } from "@inertiajs/react"

export const ProductDisplayContainer = () => {
    const {products,isLoading,paginator,getAllProducts,error,setError,errorTitle,setErrorTitle,clearError} = useProductDisplayContainer()

    if (isLoading) {
        return <LoadingSpiner type="productos" />
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <ErrorAlert error={error} clearError={clearError} title={errorTitle} urlBack="/products" fetchAgain={getAllProducts}/>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-10/12 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Productos</h1>
                    </div>
                    <button onClick={() => router.visit("/products/create")} className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Crear Producto
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                    {products.map((product : ProductInterface) => (
                        <ProductCard key={product.id} product={product} reFetch={getAllProducts} setError={setError} setErrorTitle={setErrorTitle}/>
                    ))}
                </div>
                <Pagination pagination={paginator} fetchAgain={getAllProducts} />
            </div>
        </div>
    )
}
