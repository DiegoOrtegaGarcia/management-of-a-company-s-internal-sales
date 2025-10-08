import { useEffect, useState } from "react"
import { getAllProductServices } from "../services/getAllProductServices"
import { LoadingSpiner } from "@/core/components/LoadingSpin"
import { Pagination } from "@/core/components/Paginator"

export const ProductDisplayContainer = () => {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [paginator, setPaginator] = useState({ currentPage: 1, lastPage: 1, perPage: 10, total: 0 })

    const getAllProducts = async () => {
        setIsLoading(true)
        try {
            const { products, paginator } = await getAllProductServices()
            setProducts(products)
            setPaginator(paginator)
        } catch {
            console.log("Error")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getAllProducts()
    }, [])

    if (isLoading) {
        return <LoadingSpiner type="productos" />
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-10/12 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={product.url}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                            </div>

                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2">
                                    {product.name}
                                </h3>

                                <div className="flex items-center justify-between mt-4">
                                    <span className="text-2xl font-bold text-blue-600">
                                        ${product.price}
                                    </span>
                                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium">
                                        Ver Detalles
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Paginación */}
                <Pagination pagination={paginator} fetchAgain={getAllProducts} />
            </div>
        </div>
    )
}
