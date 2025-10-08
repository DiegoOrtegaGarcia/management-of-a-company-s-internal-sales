import { ReactNode } from "react"
export interface NavLinkProps{
    page: string,
    children:ReactNode
}

export interface PaginationProps{
    pagination: pagination,
    fetchAgain: (page: number)=> void
}
export interface pagination{
    currentPage: number
    ,lastPage: number,
    perPage: number,
    total: number
}

export interface PaginationStatsProps{
    pagination : pagination,
    search : {name: string, total:number}
}

export interface ErrorAlertProps{
    title:string,
    error: string | null,
    fetchAgain?: () => void,
    clearError : () => void,
    urlBack?: string
}

export interface DeleteConfirmationModalProps{
    deleteObject:deleteObject,
    setShowDeleteModal:(state:boolean)=>void,
    handleDelete: () => void,
    showDeleteModal: boolean
}

export interface deleteObject{
    type: string,
    name:string,
    id:number
}

export interface GeneralLayoutProps{
    children: ReactNode
    page: string
}

export interface ClientEditPageProps {
    id: string;
}
