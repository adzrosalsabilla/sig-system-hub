import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { DashboardLayout } from "@/Layouts/DashboardLayout";
import { PageProps } from "@/types";
import { router, usePage } from "@inertiajs/react";
import { DollarSign, Download, LucideIcon, TrendingUp } from "lucide-react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

export interface MonthlySales {
    name: string;
    sales: number;
}

export interface RecentSale {
    id: number;
    date: string;
    product: string;
    amount: number;
    user: string;
}

export interface SalesData {
    monthlySales: MonthlySales[];
    recentSales: RecentSale[];
    totalSales: number;
}
export interface ScoreCard {
    title: string;
    value: string;
    icon: LucideIcon;
    color: string;
}

export default function Report() {
    const { year, listYears, salesData } = usePage<
        PageProps<{
            year: number;
            listYears: string[];
            salesData: SalesData;
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
            title: "Rata-rata Penjualan Harian",
            value: Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
            }).format(averageSales),
            icon: TrendingUp,
            color: "text-green-500",
        },
    ];

    const handleExport = (year: number) => {
        try {
            const link = document.createElement("a");
            link.href = `/admin/report/download?year=${year}`;
            link.target = "_blank";
            link.click();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <DashboardLayout title="Report">
            <div className="container mx-auto p-4 space-y-6">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <Button
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded inline-flex items-center"
                            onClick={() => handleExport(year)}
                        >
                            <Download className="w-4 h-4 mr-2" />
                            <span>Export</span>
                        </Button>
                        <Select
                            value={year.toString()}
                            onValueChange={(value) => {
                                const url = new URL(window.location.href);
                                url.searchParams.set("year", value);
                                router.replace(url.toString());
                            }}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                            <SelectContent>
                                {listYears.map((year) => (
                                    <SelectItem key={year} value={year}>
                                        {year}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
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

                <Card>
                    <CardHeader>
                        <CardTitle>Penjualan di {year}</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={yearData.monthlySales}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                                barSize={40}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="name"
                                    scale="point"
                                    padding={{ left: 10, right: 10 }}
                                />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="sales" fill="#3b82f6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Penjualan Terbaru pada {year}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Tanggal</TableHead>
                                    <TableHead>Transaksi No.</TableHead>
                                    <TableHead>Pengguna</TableHead>
                                    <TableHead className="text-right">
                                        Amount
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {yearData.recentSales.map((sale) => (
                                    <TableRow key={sale.id}>
                                        <TableCell>{sale.date}</TableCell>
                                        <TableCell>{sale.product}</TableCell>
                                        <TableCell>{sale.user}</TableCell>
                                        <TableCell className="text-right">
                                            {Intl.NumberFormat("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                            }).format(sale.amount)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}
