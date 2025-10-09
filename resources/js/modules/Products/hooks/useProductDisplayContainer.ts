import { useEffect, useState } from "react"
import { getAllProductServices } from "../services/getAllProductServices"

export const useProductDisplayContainer=()=>{
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [paginator, setPaginator] = useState({ currentPage: 1, lastPage: 1, perPage: 10, total: 0 })
    const [error, setError] = useState<string | null>(null);
    const [errorTitle,setErrorTitle] = useState<string>("Error con lo productos")

    const clearError = () => {
        setError(null);
    };

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
    return{
        products,isLoading,paginator,getAllProducts,error,setError,errorTitle,setErrorTitle,clearError
    }
}
