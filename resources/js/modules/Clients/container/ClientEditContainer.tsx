import { ClientForm } from "../components/ClientForm"
import { ErrorAlert } from "@/core/components/ErrorAlert";
import { useClientEditContainer } from "../hooks/useClientEditContainer";

export const ClientEditContainer=({id}: {id:number}) => {
    const {error,setError,errorTitle,setErrorTitle,clearError} = useClientEditContainer()
    if (error) {
            return (
                <div className="min-h-screen bg-gray-50 py-8">
                    <ErrorAlert error={error} clearError={clearError} title={errorTitle} urlBack=""/>
                </div>
            );
        }
    return(
        <ClientForm id={id} setError={setError} setErrorTitle={setErrorTitle}/>
    )
}
