import { GeneralLayout } from "@/core/layout/GeneralLayout";
import ClientsContainer from "@/modules/Clients/container/ClientsContainer";

export default function ClientsPage(){
    return(
       <GeneralLayout page="/clients">
            <ClientsContainer></ClientsContainer>
       </GeneralLayout>
    )
}
