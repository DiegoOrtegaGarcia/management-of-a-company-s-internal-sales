import { LoadingSpiner } from '@/core/components/LoadingSpin';
import { useClientForm } from '../hooks/useClientForm';
import { ClientFormProps } from '../types/clientsTypes';

export const ClientForm = ({ id,setError,setErrorTitle}: ClientFormProps) => {
  const {handleReset,handleSubmit,handleFormSubmit,currentName,loadingUserName,register,errors, isSubmitting, isValid,userName} = useClientForm(setError,setErrorTitle,id)

  if (id && loadingUserName) {
    return (
      <LoadingSpiner type="Formulario"/>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 mt-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {id ? `Editar Cliente ${userName}` : 'Crear Nuevo Cliente'}
        </h2>
        <p className="text-gray-600 mt-2">
          {id
            ? 'Actualiza la información del cliente'
            : 'Completa la información para crear un nuevo cliente'
          }
        </p>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Nombre del Cliente
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
              placeholder="Ingresa el nombre del cliente"
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
                  <svg className="animate-spin -ml-1  h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Guardando...
                </>
              ) : (
                <>
                  <svg className="lg:w-4 lg:h-4 w-1 h-1 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {id ? 'Actualizar Cliente' : 'Crear Cliente'}
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
