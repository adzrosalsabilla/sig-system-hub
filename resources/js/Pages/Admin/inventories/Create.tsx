import { DashboardLayout } from "@/Layouts/DashboardLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { ChevronLeft } from "lucide-react";

import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Inventory } from "@/types/product";
import { FormEvent } from "react";

export default function Create() {
    const { data, setData, post, errors, processing, reset } = useForm<
        Partial<Inventory>
    >({
        name: "",
        item_code: "",
        stock: 0,
        price: 0,
        purchase_date: "",
    });

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log("data", data);
        post(route("admin.inventory.store"));
    };

    return (
        <DashboardLayout title="Buat Produk">
            <Head title="Buat Produk" />
            <form onSubmit={onSubmit} encType="multipart/form-data">
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 w-8/12">
                    <div className="w-full">
                        <div className="flex items-center gap-4">
                            <Link href={route("admin.inventory")}>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-7 w-7"
                                    type="button"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    <span className="sr-only">Back</span>
                                </Button>
                            </Link>
                            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                                Item Baru
                            </h1>
                            <div className="hidden items-center gap-2 md:ml-auto md:flex">
                                <Link href={route("admin.inventory")}>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                    >
                                        Batalkan
                                    </Button>
                                </Link>
                                <Button
                                    type="submit"
                                    size="sm"
                                    disabled={processing}
                                >
                                    Simpan Barang
                                </Button>
                            </div>
                        </div>
                        <div className="grid gap-4 w-full mt-5">
                            <Card
                                x-chunk="dashboard-07-chunk-0"
                                className="w-full"
                            >
                                <CardHeader>
                                    <CardTitle>Detail Barang</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-6">
                                        <div className="grid gap-3">
                                            <Label htmlFor="name">
                                                Nama Barang
                                            </Label>
                                            <Input
                                                type="text"
                                                name="name"
                                                value={data.name}
                                                autoComplete="name"
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                className="flex-grow"
                                            />
                                            <InputError
                                                message={errors.name}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="item_code">
                                                Kode Barang
                                            </Label>
                                            <Input
                                                type="text"
                                                name="item_code"
                                                value={data.item_code}
                                                autoComplete="item_code"
                                                onChange={(e) =>
                                                    setData(
                                                        "item_code",
                                                        e.target.value
                                                    )
                                                }
                                                className="flex-grow"
                                            />
                                            <InputError
                                                message={errors.name}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="grid gap-3">
                                            <Label htmlFor="name">Stok</Label>
                                            <Input
                                                id="stock"
                                                type="number"
                                                name="stock"
                                                value={data.stock}
                                                autoComplete="stock"
                                                onChange={(e) =>
                                                    setData(
                                                        "stock",
                                                        Number(e.target.value)
                                                    )
                                                }
                                                className="flex-grow"
                                            />
                                            <InputError
                                                message={errors.stock}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="purchase_date">
                                                Tanggal Pembelian
                                            </Label>
                                            <Input
                                                id="stock"
                                                type="date"
                                                name="purchase_date"
                                                value={data.purchase_date}
                                                autoComplete="purchase_date"
                                                onChange={(e) =>
                                                    setData(
                                                        "purchase_date",
                                                        e.target.value
                                                    )
                                                }
                                                className="flex-grow"
                                            />
                                            <InputError
                                                message={errors.stock}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="name">
                                                Harga Barang
                                            </Label>
                                            <Input
                                                id="price"
                                                type="number"
                                                name="price"
                                                value={data.price}
                                                autoComplete="price"
                                                onChange={(e) =>
                                                    setData(
                                                        "price",
                                                        Number(e.target.value)
                                                    )
                                                }
                                                className="flex-grow"
                                            />
                                            <InputError
                                                message={errors.price}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </form>
        </DashboardLayout>
    );
}
