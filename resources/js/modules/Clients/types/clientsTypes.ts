import z from "zod"
import { clientFormSchema } from "../schemas/clientForSchema"

export interface ClientCardProps{
    client:Client
    reFetch:()=> void
    setErrorTitle:(title:string) =>void
    setError: (state:string | null)=> void
}


export type ClientCardPropsWithoutClient = Omit<ClientCardProps, 'client'>;
export interface Client{
    id:number
    name:string
}

export interface useClientCardProps{
    id:number
    reFetch:() => void
    setErrorTitle: (state:string) => void
    setError:(state:string) => void
}

export type ClientFormData = z.infer<typeof clientFormSchema>;

export interface ClientFormProps {
  id?: number;
  setError:(state : string|null) => void,
  setErrorTitle:(state: string) => void
}

export interface clientFormData{
    name:string,
    cash:number,
    id?:number
}
