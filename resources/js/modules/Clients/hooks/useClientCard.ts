import { useState } from "react";
import { useClientCardProps } from "../types/clientsTypes";
import { deleteClientService } from "../services/deleteClientService";

export const useClientCard= ({reFetch,setError,setErrorTitle,id}:useClientCardProps) =>{
    const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async() => {
    try{
        await deleteClientService(id)
        reFetch()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch (err : any) {
        const errorMessage = err?.response?.data?.message || err?.message || "Error al Eliminar el Cliente";
        setErrorTitle("Error al Eliminar el Cliente")
        setError(errorMessage);
    }finally{
        setShowDeleteModal(false);
    }
  };
  return {handleDelete,showDeleteModal,setShowDeleteModal}
}
