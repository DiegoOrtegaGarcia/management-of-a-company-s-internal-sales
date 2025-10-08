export const LoadingSpiner=({type}: {type:string})=>{
    return(
        <div className="max-w-4xl mx-auto p-6">
                <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Cargando {type}...</p>
                </div>
        </div>
    )
}
