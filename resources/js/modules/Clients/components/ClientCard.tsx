import { ClientCardProps } from "../types/clientsTypes";
import { DeleteConfirmationModal } from "@/core/components/DeleteConfirmationModal";
import { router } from "@inertiajs/react";
import { useClientCard } from "../hooks/useClientCard";

export const ClientCard = ({ client,reFetch,setError,setErrorTitle}: ClientCardProps) => {

  const {handleDelete,showDeleteModal,setShowDeleteModal} = useClientCard({reFetch:reFetch,setError:setError,setErrorTitle:setErrorTitle,id:client.id})
  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">
                {client.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{client.name}</h3>
            </div>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => router.visit(`/client/${client.id}`)}
            className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-md active:scale-95 group"
          >
            <svg
              className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit
          </button>

          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex-1 flex items-center justify-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-md active:scale-95 group"
          >
            <svg
              className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Delete
          </button>
        </div>
      </div>

      <DeleteConfirmationModal deleteObject={{type:"client",name:client.name,id:client.id}} showDeleteModal={showDeleteModal} handleDelete={handleDelete} setShowDeleteModal={setShowDeleteModal}/>
    </>
  );
};
