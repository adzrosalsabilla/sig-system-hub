import PaginationSection from "@/Components/sections/PaginationSection";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import DialogTransaction from "@/Components/ui/dialog-transaction";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
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
import { DashboardLayout } from "@/Layouts/DashboardLayout";
import { PageProps, PaginationResponse } from "@/types";
import { ETransactionStatus } from "@/types/enum";
import { Transaction } from "@/types/product";
import { useForm, usePage } from "@inertiajs/react";
import dayjs from "dayjs";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

export default function UserTransactions() {
    const [modalStatus, setModalStatus] = useState<{
        transaction: Transaction | null;
        open: boolean;
    }>({
        transaction: null,
        open: false,
    });
    const { transactions } =
        usePage<PageProps<{ transactions: PaginationResponse<Transaction> }>>()
            .props;

    const { delete: destroy, put } = useForm({
        status: "process",
    });

    const handleProcessPayment = (id: number) => {
        put(route("admin.transactions.update-status", id.toString()));
    };

    const handleDelete = (id: number) => {
        destroy(route("admin.transactions.delete", id.toString()));
    };

    return (
        <DashboardLayout title="Transaction">
            <main className="mx-auto px-6">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Daftar Transaksi</CardTitle>
                    </CardHeader>

                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Transaksi No.</TableHead>
                                    <TableHead>Pengguna</TableHead>
                                    <TableHead>Total Produk</TableHead>
                                    <TableHead>Jumlah Harga</TableHead>
                                    <TableHead>Tangga</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactions.data.map((transaction) => (
                                    <TableRow key={transaction.id}>
                                        <TableCell>
                                            {transaction.transaction_number ||
                                                "-"}
                                        </TableCell>
                                        <TableCell>
                                            {transaction.user?.name}
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
                                            {dayjs(
                                                transaction.created_at
                                            ).format("DD MMMM YYYY")}
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
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        aria-haspopup="true"
                                                        size="icon"
                                                        variant="ghost"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">
                                                            Toggle menu
                                                        </span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>
                                                        Actions
                                                    </DropdownMenuLabel>
                                                    {transaction.status ===
                                                        ETransactionStatus.PAID && (
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                handleProcessPayment(
                                                                    transaction.id
                                                                )
                                                            }
                                                        >
                                                            Process Payment
                                                        </DropdownMenuItem>
                                                    )}
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            setModalStatus(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    transaction:
                                                                        transaction,
                                                                    open: true,
                                                                })
                                                            )
                                                        }
                                                    >
                                                        Update Status
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="text-red-500 hover:bg-red-950"
                                                        onClick={() =>
                                                            handleDelete(
                                                                transaction.id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
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
                <DialogTransaction
                    transaction={modalStatus.transaction}
                    open={modalStatus.open}
                    onClose={() =>
                        setModalStatus((prev) => ({
                            ...prev,
                            open: false,
                            transaction: null,
                        }))
                    }
                />
            </main>
        </DashboardLayout>
    );
}
