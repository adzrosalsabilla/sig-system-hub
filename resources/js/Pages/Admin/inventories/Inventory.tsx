import { DashboardLayout } from "@/Layouts/DashboardLayout";
import { Head, useForm, usePage } from "@inertiajs/react";

import { Link } from "@inertiajs/react";
import { Pencil, PlusCircle, Trash2 } from "lucide-react";

import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";

import PaginationSection from "@/Components/sections/PaginationSection";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { PageProps, PaginationResponse } from "@/types";
import { Inventory } from "@/types/product";
import dayjs from "dayjs";

export default function Dashboard() {
    const { inventories } = usePage<
        PageProps<{
            inventories: PaginationResponse<Inventory>;
        }>
    >().props;

    const { delete: destroy } = useForm({
        search: "",
    });

    const handleDelete = (id: number) => {
        destroy(route("admin.inventory.delete", id.toString()));
    };

    return (
        <DashboardLayout title="Inventaris">
            <Head title="Inventaris" />
            <main className="grid  flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                <Card x-chunk="dashboard-06-chunk-0">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Daftar Barang Inventaris</CardTitle>
                            <Link href={route("admin.inventory.create")}>
                                <Button size="sm" className="h-7 gap-1">
                                    <PlusCircle className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Tambah Item
                                    </span>
                                </Button>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
                                    <TableHead>Kode Barang</TableHead>
                                    <TableHead>Nama</TableHead>
                                    <TableHead>Stok</TableHead>
                                    <TableHead>Harga</TableHead>
                                    <TableHead className="hidden md:table-cell">
                                        Tanggal Dibeli
                                    </TableHead>
                                    <TableHead>
                                        <span className="sr-only">Actions</span>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {inventories?.data?.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={5} align="center">
                                            Tidak ada data
                                        </TableCell>
                                    </TableRow>
                                )}
                                {inventories?.data?.map((inventory, i) => (
                                    <TableRow key={inventory.id}>
                                        <TableCell>
                                            {inventories.from + i}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {inventory.item_code}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {inventory.name}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {inventory.stock}
                                        </TableCell>
                                        <TableCell>
                                            {Intl.NumberFormat("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                            }).format(inventory.price)}
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            {dayjs(
                                                inventory.purchase_date
                                            ).format("DD MMMM YYYY")}
                                        </TableCell>
                                        <TableCell>
                                            <div className="space-x-2">
                                                <Link
                                                    href={route(
                                                        "admin.inventory.edit",
                                                        inventory.id.toString()
                                                    )}
                                                >
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                        <span className="sr-only">
                                                            Edit
                                                        </span>
                                                    </Button>
                                                </Link>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                            <span className="sr-only">
                                                                Hapus{" "}
                                                            </span>
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>
                                                                Apakah kamu
                                                                yakin?
                                                            </AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Tindakan ini
                                                                tidak dapat
                                                                dibatalkan. Ini
                                                                akan menghapus
                                                                barang secara
                                                                permanen dan
                                                                menghapusnya
                                                                dari server
                                                                kami.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>
                                                                Batal
                                                            </AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        inventory.id
                                                                    )
                                                                }
                                                            >
                                                                Hapus
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter>
                        <div className="flex justify-between w-full items-center">
                            <div className="text-xs text-muted-foreground flex-1">
                                Menampilkan{" "}
                                <strong>
                                    {inventories.from || 0}-
                                    {inventories.to || 0}
                                </strong>{" "}
                                dari <strong>{inventories.total}</strong> produk
                            </div>
                            <PaginationSection data={inventories} />
                        </div>
                    </CardFooter>
                </Card>
            </main>
        </DashboardLayout>
    );
}
