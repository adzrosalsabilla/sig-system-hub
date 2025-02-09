import { DashboardLayout } from "@/Layouts/DashboardLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { ChevronLeft } from "lucide-react";

import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Textarea } from "@/Components/ui/textarea";
import { ProductCategory } from "@/types/product";
import { PageProps } from "@/types";
import { FormEvent } from "react";
import { listProductStatusOptions } from "@/constants/options";
import InputError from "@/Components/InputError";

export const description =
    "A product edit page. The product edit page has a form to edit the product details, stock, product category, product status, and product images. The product edit page has a sidebar navigation and a main content area. The main content area has a form to edit the product details, stock, product category, product status, and product images. The sidebar navigation has links to product details, stock, product category, product status, and product images.";

export default function Create() {
    const { categories } =
        usePage<PageProps<{ categories: ProductCategory[] }>>().props;

    const { data, setData, post, errors, processing, reset } = useForm<{
        name: string;
        product_category_id: string;
        stock: string;
        price: number;
        description: string;
        status: string;
        file: File | null;
    }>({
        name: "",
        product_category_id: "",
        stock: "",
        price: 0,
        description: "",
        status: "draft",
        file: null,
    });

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log("data", data);
        post(route("admin.products.store"));
    };

    return (
        <DashboardLayout title="Buat Produk">
            <Head title="Buat Produk" />
            <form onSubmit={onSubmit} encType="multipart/form-data">
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                        <div className="flex items-center gap-4">
                            <Link href={route("admin.products")}>
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
                                Produk Baru
                            </h1>
                            <div className="hidden items-center gap-2 md:ml-auto md:flex">
                                <Link href={route("admin.products")}>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                    >
                                        Batalkan
                                    </Button>
                                </Link>
                                <Button type="submit" size="sm">
                                    Simpan Produk
                                </Button>
                            </div>
                        </div>
                        <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                                <Card x-chunk="dashboard-07-chunk-0">
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
                                                <Label htmlFor="category">
                                                    Kategori
                                                </Label>
                                                <Select
                                                    name="product_category_id"
                                                    autoComplete="product_category_id"
                                                    onValueChange={(e) =>
                                                        setData(
                                                            "product_category_id",
                                                            e
                                                        )
                                                    }
                                                    defaultValue={
                                                        data.product_category_id
                                                    }
                                                    value={
                                                        data.product_category_id
                                                    }
                                                >
                                                    <SelectTrigger
                                                        id="category"
                                                        aria-label="Select category"
                                                    >
                                                        <SelectValue placeholder="Select category" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {categories.map(
                                                            (category) => (
                                                                <SelectItem
                                                                    key={
                                                                        category.id
                                                                    }
                                                                    value={category.id.toString()}
                                                                >
                                                                    {
                                                                        category.name
                                                                    }
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                <InputError
                                                    message={
                                                        errors.product_category_id
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="grid gap-3">
                                                <Label htmlFor="name">
                                                    Stok
                                                </Label>
                                                <Input
                                                    id="stock"
                                                    type="number"
                                                    name="stock"
                                                    value={data.stock}
                                                    autoComplete="stock"
                                                    onChange={(e) =>
                                                        setData(
                                                            "stock",
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
                                                    Harga
                                                </Label>
                                                <Input
                                                    id="price"
                                                    type="text"
                                                    name="price"
                                                    value={Intl.NumberFormat("id-ID", {
                                                        style: "currency",
                                                        currency: "IDR",
                                                    }).format(data.price)}
                                                    autoComplete="price"
                                                    onChange={(e) =>
                                                        setData(
                                                            "price",
                                                            Number(
                                                                e.target.value ? e.target.value.replace(",00","").replace(/\D/g, "") : 0
                                                            )
                                                        )
                                                    }
                                                    className="flex-grow"
                                                />
                                                <InputError
                                                    message={errors.price}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="grid gap-3">
                                                <Label htmlFor="description">
                                                    Deskripsi
                                                </Label>
                                                <Textarea
                                                    id="description"
                                                    className="min-h-32"
                                                    name="description"
                                                    value={data.description}
                                                    autoComplete="description"
                                                    onChange={(e) =>
                                                        setData(
                                                            "description",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <InputError
                                                    message={errors.description}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                                <Card x-chunk="dashboard-07-chunk-3">
                                    <CardHeader>
                                        <CardTitle>Status</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid gap-6">
                                            <div className="grid gap-3">
                                                <Label htmlFor="status">
                                                    Status
                                                </Label>
                                                <Select
                                                    name="status"
                                                    autoComplete="status"
                                                    onValueChange={(e) =>
                                                        setData("status", e)
                                                    }
                                                    defaultValue={data.status}
                                                >
                                                    <SelectTrigger
                                                        id="status"
                                                        aria-label="Select status"
                                                    >
                                                        <SelectValue placeholder="Select status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {listProductStatusOptions.map(
                                                            (item) => (
                                                                <SelectItem
                                                                    key={
                                                                        item.value
                                                                    }
                                                                    value={
                                                                        item.value
                                                                    }
                                                                >
                                                                    {item.label}
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                <InputError
                                                    message={errors.status}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card
                                    className="overflow-hidden"
                                    x-chunk="dashboard-07-chunk-4"
                                >
                                    <CardHeader>
                                        <CardTitle>Gambar</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="grid w-full max-w-sm items-center gap-1.5">
                                            <Label htmlFor="picture">
                                                Upload
                                            </Label>
                                            <Input
                                                id="picture"
                                                type="file"
                                                name="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    if (e.target.files) {
                                                        setData(
                                                            "file",
                                                            e.target.files[0]
                                                        );
                                                    }
                                                }}
                                            />
                                            <InputError
                                                message={errors.file}
                                                className="mt-2"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-2 md:hidden">
                            <Button variant="outline" size="sm">
                                Discard
                            </Button>
                            <Button size="sm">Save Product</Button>
                        </div>
                    </div>
                </main>
            </form>
        </DashboardLayout>
    );
}
