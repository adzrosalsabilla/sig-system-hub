import PaginationSection from "@/Components/sections/PaginationSection";
import {
    Card,
    CardContent,
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
import { listTransactionStatusOptions } from "@/constants/options";
import { getStatusColor } from "@/helpers/statusBadgeColor";
import { CustomerLayout } from "@/Layouts/CustomerLayout";
import { PageProps, PaginationResponse } from "@/types";
import { ETransactionStatus } from "@/types/enum";
import type { Transaction } from "@/types/product";
import { usePage } from "@inertiajs/react";
import dayjs from "dayjs";

export default function UserTransactions() {
    const { transactions } =
        usePage<PageProps<{ transactions: PaginationResponse<Transaction> }>>()
            .props;

    return (
        <CustomerLayout title="Transaction">
            <main className="mx-auto px-6">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Daftar Transaksi</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Transaksi No</TableHead>
                                    <TableHead>Tanggal</TableHead>
                                    <TableHead>Total Produk</TableHead>
                                    <TableHead>Total Harga</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Link Pembayaran</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactions.data.map((transaction) => (
                                    <TableRow key={transaction.id}>
                                        <TableCell>
                                            {transaction.transaction_number}
                                        </TableCell>
                                        <TableCell>
                                            {dayjs(
                                                transaction.created_at
                                            ).format("DD MMMM YYYY")}
                                        </TableCell>
                                        <TableCell>
                                            {
                                                JSON.parse(
                                                    transaction.payment_details
                                                )?.items.length
                                            }{" "}
                                            products
                                        </TableCell>
                                        <TableCell>
                                            {Intl.NumberFormat("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                            }).format(transaction.amount)}
                                        </TableCell>
                                        <TableCell>
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                                    transaction.status
                                                )}`}
                                            >
                                                {
                                                    listTransactionStatusOptions.find(
                                                        (status) =>
                                                            status.value ===
                                                            transaction.status
                                                    )?.label
                                                }
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            {transaction.status ===
                                            ETransactionStatus.PENDING ? (
                                                <a
                                                    rel="noreferrer"
                                                    className="text-blue-500"
                                                    target="_blank"
                                                    href={
                                                        transaction.payment_url
                                                    }
                                                >
                                                    Bayar
                                                </a>
                                            ) : (
                                                "-"
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter>
                        <div className="flex justify-between w-full items-center">
                            <div className="text-xs text-muted-foreground flex-1">
                                Showing{" "}
                                <strong>
                                    {transactions.from}-{transactions.to}
                                </strong>{" "}
                                of <strong>{transactions.total}</strong>{" "}
                                transactions
                            </div>
                            <PaginationSection data={transactions} />
                        </div>
                    </CardFooter>
                </Card>
            </main>
        </CustomerLayout>
    );
}
