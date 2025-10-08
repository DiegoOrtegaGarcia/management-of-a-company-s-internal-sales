import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ClientFormData } from "../types/clientsTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientFormSchema } from "../schemas/clientForSchema";
import { getUserNameService } from "../services/getUserNameService";
import { editClientService } from "../services/editClientService";
import { createClientService } from "../services/createClientService";
import { router } from "@inertiajs/react";

export const useClientForm = (setError:(state:string)=>void,setErrorTitle:(state:string)=> void,id?:number) => {

  const [userName, setUserName] = useState<string | null>(null);
  const [loadingUserName, setLoadingUserName] = useState(false);

  const {register,handleSubmit,formState: { errors, isSubmitting, isValid },watch,reset,} = useForm<ClientFormData>({resolver: zodResolver(clientFormSchema),mode: 'onChange',defaultValues: {  name: '',},});

  const currentName = watch('name');

  const fetchUserName = async (id : number) => {
        setLoadingUserName(true);
        try {
          const name = await getUserNameService(id);
          setUserName(name);
          reset({ name });
        } catch (err) {
          setError(err.message)
          setErrorTitle("Error Buscando el Cliente")
        } finally {
          setLoadingUserName(false);
        }
      };

  useEffect(() => {
    if (id) {
      fetchUserName(id);
    }
  }, [id]);

  const handleFormSubmit = async (data: ClientFormData) => {
    try {
        const client = {...data,cash: 1000}
        if(id){
            await editClientService({...client,id})
        }
        await createClientService(client)
      router.visit("/clients")
    } catch (err) {
      setError(err.message)
      setErrorTitle("Error Enviando los datos")
    }
  };

  const handleReset = () => {
    reset({
      name: userName || '',
    });
  };

  return {handleReset,handleSubmit,handleFormSubmit,currentName,loadingUserName,register,errors, isSubmitting, isValid,userName}
}
