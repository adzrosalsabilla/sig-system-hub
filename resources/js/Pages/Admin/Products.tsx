import { DashboardLayout } from "@/Layouts/DashboardLayout";
import { Head } from "@inertiajs/react";

import ProductCategory from "@/Components/sections/ProductCategory";
import ListProducts from "./products/List";

export const description =
    "An products dashboard with a sidebar navigation. The sidebar has icon navigation. The content area has a breadcrumb and search in the header. It displays a list of products in a table with actions.";

export default function Dashboard() {
    return (
        <DashboardLayout title="Products">
            <Head title="Products" />
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                <ListProducts />
                <ProductCategory />
            </main>
        </DashboardLayout>
    );
}
