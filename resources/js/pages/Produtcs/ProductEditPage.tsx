// pages/Products/ProductEditPage.tsx
import { GeneralLayout } from "@/core/layout/GeneralLayout";
import { ProductFormContainer } from "@/modules/Products/containers/ProducFormContainer";
import { usePage } from '@inertiajs/react';

export default function ProductEditPage() {
    const { props } = usePage();
    const { id } = props as unknown as { id: string };

    return (
        <GeneralLayout page="/products">
            <ProductFormContainer id={Number(id)} />
        </GeneralLayout>
    );
}
