import { DashboardLayout } from "@/Layouts/DashboardLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { ChevronLeft } from "lucide-react";

import InputError from "@/Components/InputError";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Inventory } from "@/types/product";
import { FormEvent } from "react";
import { PageProps } from "@/types";

export default function Edit() {
    const { inventory } = usePage<PageProps<{ inventory: Inventory }>>().props;

    const { data, setData, put, errors, processing } = useForm<
        Partial<Inventory>
    >({
        name: inventory.name,
        item_code: inventory.item_code,
        stock: inventory.stock,
        price: inventory.price,
        purchase_date: inventory.purchase_date,
    });

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        put(route("admin.inventory.update", inventory.id));
    };

    return (
        <DashboardLayout title="Edit Produk">
            <Head title="Edit Produk" />
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
                                Edit Produk
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
                                    Simpan Perubahan
                                </Button>
                            </div>
                        </div>
                        <div className="grid gap-4 w-full mt-5">
                            <Card
                                x-chunk="dashboard-07-chunk-0"
                                className="w-full"
                            >
                                <CardHeader>
                                    <CardTitle>Detail Produk</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-6">
                                        <div className="grid gap-3">
                                            <Label htmlFor="name">
                                                Nama Produk
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
                                                Kode Produk
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
                                                message={errors.item_code}
                                                className="mt-2"
                                            />
                                        </div>

                                        <div className="grid gap-3">
                                            <Label htmlFor="stock">Stok</Label>
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
                                                id="purchase_date"
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
                                                message={errors.purchase_date}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="price">
                                                Harga Produk
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
