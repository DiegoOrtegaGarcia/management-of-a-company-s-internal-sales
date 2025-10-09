import { LoadingSpiner } from '@/core/components/LoadingSpin';
import { useProductForm } from '../hooks/useProductForm';
import { ProductFormProps } from '../types/productsTypes';
import { router } from '@inertiajs/react';

export const ProductForm = ({ id, setError, setErrorTitle }: ProductFormProps) => {
  const {handleReset,handleSubmit,handleFormSubmit,handleImageChange,handleRemoveImage,register,errors,isSubmitting,isValid,loadingProduct,product,imagePreview,currentName,currentPrice,} = useProductForm(setError, setErrorTitle, id);

  if (id && loadingProduct) {
    return <LoadingSpiner type="formulario de producto" />;
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 mt-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {id ? `Editar Producto: ${product?.name}` : 'Crear Nuevo Producto'}
        </h2>
        <p className="text-gray-600 mt-2">
          {id
            ? 'Actualiza la información del producto'
            : 'Completa la información para crear un nuevo producto'
          }
        </p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Imagen del Producto
          </label>

          {imagePreview && (
            <div className="mb-4 flex flex-col items-start">
              <img
                src={imagePreview}
                alt="Preview"
                className="h-32 w-32 object-cover rounded-lg border border-gray-300 mb-2"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="text-sm text-red-600 hover:text-red-800 flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Eliminar imagen
              </button>
            </div>
          )}

          {!imagePreview && (
            <div className="flex items-center justify-center">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click para subir</span> o arrastra y suelta
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF, WebP (MAX. 2MB)</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          )}

          {errors.url && (
            <p className="mt-2 text-sm text-red-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.url.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Nombre del Producto *
          </label>
          <div className="relative">
            <input
              {...register('name')}
              type="text"
              id="name"
              className={`
                block w-full px-4 py-3 border rounded-lg shadow-sm placeholder-gray-400
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200
                ${errors.name
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300'
                }
              `}
              placeholder="Ingresa el nombre del producto"
            />
            {errors.name && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          {errors.name ? (
            <p className="mt-2 text-sm text-red-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.name.message}
            </p>
          ) : (
            currentName && (
              <p className="mt-1 text-xs text-green-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                ✓ Nombre válido
              </p>
            )
          )}
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
            Precio (en centavos) *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              {...register('price', { valueAsNumber: true })}
              type="number"
              id="price"
              min="0"
              step="1"
              className={`
                block w-full pl-8 pr-4 py-3 border rounded-lg shadow-sm placeholder-gray-400
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200
                ${errors.price
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300'
                }
              `}
              placeholder="1000 = $10.00"
            />
            {errors.price && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          {errors.price ? (
            <p className="mt-2 text-sm text-red-600 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.price.message}
            </p>
          ) : (
            currentPrice > 0 && (
              <p className="mt-1 text-xs text-green-600 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                ✓ Precio válido: ${(currentPrice / 100).toFixed(2)}
              </p>
            )
          )}
          <p className="mt-1 text-xs text-gray-500">
            El precio se almacena en centavos. 1000 = $10.00
          </p>
        </div>

        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
          >
            Restablecer
          </button>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => router.visit("/products")}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className={`
                px-6 py-2 bg-blue-500 text-white rounded-lg font-medium transition-all duration-200
                flex items-center
                ${isSubmitting || !isValid
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-blue-600 shadow-sm hover:shadow-md'
                }
              `}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {id ? 'Actualizando...' : 'Creando...'}
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {id ? 'Actualizar Producto' : 'Crear Producto'}
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
