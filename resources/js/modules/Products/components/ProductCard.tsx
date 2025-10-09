import { DeleteConfirmationModal } from "@/core/components/DeleteConfirmationModal"
import { ProductCardProps } from "../types/productsTypes"
import { useState } from "react";
import { deleteProductService } from "../services/deleteProductService";
import { router } from "@inertiajs/react";

export const ProductCard = ({product,reFetch,setError,setErrorTitle}:ProductCardProps) =>{
    const [showDeleteModal, setShowDeleteModal] = useState(false);

  const deleteProduct = async() => {
      try{
          await deleteProductService(product.id)
          reFetch()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }catch (err : any) {
          const errorMessage = err?.response?.data?.message || err?.message || "Error al Eliminar el Producto";
          setErrorTitle("Error al Eliminar el Producto")
          setError(errorMessage);
      }finally{
          setShowDeleteModal(false);
      }
    };

    return(
        <>
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        {product.url ? (
          <img
            src={`./storage/${product.url}`}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2">
          {product.name}
        </h3>

        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-blue-600">
            ${(product.price / 100).toFixed(2)}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => router.visit(`/products/${product.id}`)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              Editar
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
            <DeleteConfirmationModal deleteObject={{type:"product",name:product.name,id:product.id}} showDeleteModal={showDeleteModal} handleDelete={deleteProduct} setShowDeleteModal={setShowDeleteModal}/>
        </>
    )
}
