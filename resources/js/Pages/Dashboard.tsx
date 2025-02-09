import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { DashboardLayout } from "@/Layouts/DashboardLayout";
import { PageProps, PaginationResponse } from "@/types";
import { Product } from "@/types/product";
import { Head, Link, usePage } from "@inertiajs/react";
import { DollarSign, TrendingUp } from "lucide-react";
import ListProducts from "./Admin/products/List";
import { SalesData, ScoreCard } from "./Admin/Report";

export default function Dashboard() {
    const { year, listYears, salesData } = usePage<
        PageProps<{
            year: number;
            listYears: string[];
            salesData: SalesData;
            products: PaginationResponse<Product>;
            draftProducts: PaginationResponse<Product>;
            activeProducts: PaginationResponse<Product>;
            archivedProducts: PaginationResponse<Product>;
        }>
    >().props;
    const yearData = salesData;
    const totalSales = salesData.totalSales;
    const averageSales = totalSales / yearData.monthlySales.length;

    const scoreCards: ScoreCard[] = [
        {
            title: "Total Penjualan",
            value: Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
            }).format(totalSales),
            icon: DollarSign,
            color: "text-blue-500",
        },
        {
            title: "Average Monthly Sales",
            value: Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
            }).format(averageSales),
            icon: TrendingUp,
            color: "text-green-500",
        },
    ];

    return (
        <DashboardLayout title="Dashboard">
            <Head title="Dashboard" />
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                        <Card className="col-span-2">
                            <CardHeader className="pb-3">
                                <CardTitle>Tambah Produk Baru</CardTitle>
                                <CardDescription className="text-balance max-w-lg leading-relaxed">
                                    Tambah produk baru dan jualan produk Anda
                                    dengan mudah dan cepat.
                                </CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <Link href={route("admin.products.create")}>
                                    <Button>Tambah produk</Button>
                                </Link>
                            </CardFooter>
                        </Card>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 w-full col-span-2">
                            {scoreCards.map((card, index) => (
                                <Card key={index}>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            {card.title}
                                        </CardTitle>
                                        <card.icon
                                            className={`h-4 w-4 ${card.color}`}
                                        />
                                    </CardHeader>
                                    <CardContent>
                                        <div
                                            className={`text-2xl font-bold ${card.color}`}
                                        >
                                            {card.value}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    <div className="flex space-x-4">
                        <div className="w-3/5">
                            <ListProducts />
                        </div>
                        <div className="w-2/5">
                            <Card className="mt-11">
                                <CardHeader>
                                    <CardTitle>Penjualan di {year}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Date</TableHead>
                                                <TableHead>
                                                    Transaction No.
                                                </TableHead>
                                                <TableHead>User</TableHead>
                                                <TableHead className="text-right">
                                                    Amount
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {yearData.recentSales.length ===
                                                0 && (
                                                <TableRow>
                                                    <TableCell
                                                        colSpan={4}
                                                        align="center"
                                                    >
                                                        <p>Tidak ada data</p>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                            {yearData.recentSales.map(
                                                (sale) => (
                                                    <TableRow key={sale.id}>
                                                        <TableCell>
                                                            {sale.date}
                                                        </TableCell>
                                                        <TableCell>
                                                            {sale.product}
                                                        </TableCell>
                                                        <TableCell>
                                                            {sale.user}
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            {Intl.NumberFormat(
                                                                "id-ID",
                                                                {
                                                                    style: "currency",
                                                                    currency:
                                                                        "IDR",
                                                                }
                                                            ).format(
                                                                sale.amount
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            )}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </DashboardLayout>
    );
}
