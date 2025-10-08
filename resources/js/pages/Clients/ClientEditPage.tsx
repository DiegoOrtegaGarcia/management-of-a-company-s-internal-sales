import { GeneralLayout } from "@/core/layout/GeneralLayout";
import { ClientEditPageProps } from "@/core/types/types";
import { ClientEditContainer } from "@/modules/Clients/container/ClientEditContainer";
import { usePage } from '@inertiajs/react';

export default function ClientEditPage() {
    const { props } = usePage();
    const { id } = props as unknown as ClientEditPageProps;

    return (
        <GeneralLayout page="clientsEdit">
           <ClientEditContainer id={Number(id)}/>
        </GeneralLayout>
    );
}
