import { GeneralLayout } from "@/core/layout/GeneralLayout";
import { ProductDisplayContainer } from "@/modules/Products/containers/ProductsDisplayContainer";


export default function ProductsPage(){
    return (
        <GeneralLayout page="/products">
         <ProductDisplayContainer />
        </GeneralLayout>
    )
}
