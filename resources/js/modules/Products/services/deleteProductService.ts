import apiService from "@/core/services/apiServices"

export const deleteProductService = async(id : number) => {
    try{
        await apiService.delete(`products/${id}`)
    }catch(error){
        console.log(error)
        throw new Error(error.message)
    }
}
