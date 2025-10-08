import { useEffect, useState } from "react";
import { Client } from '../types/clientsTypes';
import { pagination } from '@/core/types/types';
import { getAllClientsService } from "../services/getAllClientsService";

export const useClientsContainer =() => {
    const [clients, setClients] = useState<Client[]>([]);
    const [pagination, setPagination] = useState<pagination>({currentPage: 1,lastPage: 1,perPage: 10,total: 0});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [errorTitle,setErrorTitle] = useState<string>("")

      const fetchClients = async (page = 1) => {
        setLoading(true);
        setError(null);
        try {
            const {clients,pagination} = await getAllClientsService(page)
            setClients(clients);
            setPagination(pagination);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err : any) {
            const errorMessage = err?.response?.data?.message || err?.message || "Error al cargar los clientes";
            setErrorTitle("Error al cargar los clientes")
            setError(errorMessage);
        }finally{
            setLoading(false);
        }
      };

    const clearError = () => {
        setError(null);
    };

      useEffect(() => {
        fetchClients();
      }, []);

      return {
        fetchClients,clients,loading,pagination,error,clearError,setError,errorTitle,setErrorTitle
      }
}
