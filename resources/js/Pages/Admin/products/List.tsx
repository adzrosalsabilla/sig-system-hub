import { PageProps, PaginationResponse } from "@/types";
import { Product } from "@/types/product";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Pencil, PlusCircle, Search, Trash2, X } from "lucide-react";

import { Badge } from "@/Components/ui/badge";
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
import { Input } from "@/Components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/Components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { getProductStatusBadgeColor } from "@/helpers/productStatusBadgeColor";
import { EProductStatus } from "@/types/enum";
import dayjs from "dayjs";
import React from "react";

interface TableListProductProps {
    status: EProductStatus | "all";
    products: PaginationResponse<Product>;
}
export const TableListProduct: React.FC<TableListProductProps> = ({
    status,
    products,
}) => {
    const { delete: destroy } = useForm({
        search: "",
    });
    const statusTitle = status.charAt(0).toUpperCase() + status.slice(1);

    const handleDelete = (id: number) => {
        destroy(route("admin.products.delete", id.toString()));
    };

    return (
        <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
                <CardTitle>{statusTitle} Produk</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>Nama</TableHead>
                            <TableHead>Stok</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Harga</TableHead>
                            <TableHead className="hidden md:table-cell">
                                Tanggal Dibuat
                            </TableHead>
                            <TableHead>
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products?.data?.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    Tidak ada data
                                </TableCell>
                            </TableRow>
                        )}
                        {products?.data?.map((product, i) => (
                            <TableRow key={product.id}>
                                <TableCell>{products.from + i}</TableCell>
                                <TableCell className="font-medium">
                                    {product.name}
                                </TableCell>
                                <TableCell>
                                    {product.stock}
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant="outline"
                                        className={`${getProductStatusBadgeColor(
                                            product.status
                                        )}`}
                                    >
                                        {product.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {Intl.NumberFormat("id-ID", {
                                        style: "currency",
                                        currency: "IDR",
                                    }).format(product.price)}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                    {dayjs(product.created_at).format(
                                        "DD MMMM YYYY"
                                    )}
                                </TableCell>
                                <TableCell>
                                    <div className="space-x-2">
                                        <Link
                                            href={route(
                                                "admin.products.edit",
                                                product.id.toString()
                                            )}
                                        >
                                            <Button variant="outline" size="sm">
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
                                                        Apakah kamu yakin?
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Tindakan ini tidak dapat
                                                        dibatalkan. Ini akan
                                                        menghapus produk secara
                                                        permanen dan
                                                        menghapusnya dari server
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
                                                                product.id
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
                            {products.from || 0}-{products.to || 0}
                        </strong>{" "}
                        dari <strong>{products.total}</strong> produk
                    </div>
                    <PaginationSection data={products} />
                </div>
            </CardFooter>
        </Card>
    );
};

export default function ListProducts() {
    const { products, draftProducts, activeProducts, archivedProducts } =
        usePage<
            PageProps<{
                products: PaginationResponse<Product>;
                draftProducts: PaginationResponse<Product>;
                activeProducts: PaginationResponse<Product>;
                archivedProducts: PaginationResponse<Product>;
            }>
        >().props;
    const searchParams =
        new URLSearchParams(window.location.search).get("search") || "";
    const { data, setData } = useForm({
        search: "",
    });

    return (
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <Tabs defaultValue="all">
                <div className="flex items-center">
                    <TabsList>
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="draft">Draft</TabsTrigger>
                        <TabsTrigger value="active">Active</TabsTrigger>
                        <TabsTrigger
                            value="archived"
                            className="hidden sm:flex"
                        >
                            Archived
                        </TabsTrigger>
                    </TabsList>
                    <form className="ml-auto flex items-center gap-2">
                        <Input
                            type="text"
                            placeholder="Cari produk"
                            name="search"
                            value={data.search}
                            autoComplete="product-category"
                            onChange={(e) => setData("search", e.target.value)}
                            className="flex-grow h-7"
                        />
                        <Button
                            size="sm"
                            className="h-7 gap-1 "
                            variant={"secondary"}
                        >
                            <Search className="h-3.5 w-3.5" />
                        </Button>
                        {!!searchParams && (
                            <Button
                                size="sm"
                                className="h-7 gap-1 "
                                variant={"destructive"}
                                onClick={() => setData("search", "")}
                            >
                                <X className="h-3.5 w-3.5" />
                            </Button>
                        )}

                        <Link href={route("admin.products.create")}>
                            <Button size="sm" className="h-7 gap-1">
                                <PlusCircle className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Tambah Produk
                                </span>
                            </Button>
                        </Link>
                    </form>
                </div>
                <TabsContent value="all">
                    <TableListProduct products={products} status={"all"} />
                </TabsContent>
                <TabsContent value="draft">
                    <TableListProduct
                        products={draftProducts}
                        status={EProductStatus.DRAFT}
                    />
                </TabsContent>
                <TabsContent value="active">
                    <TableListProduct
                        products={activeProducts}
                        status={EProductStatus.ACTIVE}
                    />
                </TabsContent>
                <TabsContent value="archived">
                    <TableListProduct
                        products={archivedProducts}
                        status={EProductStatus.ARCHIVED}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
}
