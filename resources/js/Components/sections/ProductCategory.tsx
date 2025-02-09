import { Plus, X } from "lucide-react";

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
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Separator } from "@/Components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { PageProps } from "@/types";
import type { ProductCategory } from "@/types/product";
import { useForm, usePage } from "@inertiajs/react";
import { Pencil, Trash2 } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import InputError from "../InputError";

export interface ProductCategoryProps {
    categories: ProductCategory[];
}
export default function ProductCategory() {
    const { categories } =
        usePage<PageProps<{ categories: ProductCategory[] }>>().props;
    const { toast } = useToast();
    const [editedId, setEditedId] = useState(0);

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        processing,
        errors,
        reset,
    } = useForm({
        name: "",
        editedName: "",
    });

    const handleEdit = (e: FormEvent) => {
        e.preventDefault();
        put(route("admin.product-category.update", editedId), {
            onFinish: () => {
                toast({
                    title: `Category ${data.editedName} updated`,
                    description: `Category ${data.editedName} has been updated in the categories.`,
                });
                reset("name");
                reset("editedName");
                setEditedId(0);
            },
        });
    };

    const handleDelete = (id: number, category: string) => {
        destroy(route("admin.product-category.delete", id.toString()), {
            onFinish: () => {
                toast({
                    title: `${category} deleted`,
                    description: `${category} category has been added from the categories.`,
                });
            },
        });
    };

    const handleAddCategory = (e: FormEvent) => {
        e.preventDefault();
        post(route("admin.product-category.create"), {
            onFinish: () => {
                toast({
                    title: `${data.name} added`,
                    description: `${data.name} has been added to the categories.`,
                });
                reset("name");
            },
        });
    };

    return (
        <div className="mt-11">
            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Kategori Produk</CardTitle>
                </CardHeader>
                <CardContent>
                    <form
                        onSubmit={handleAddCategory}
                        className="flex space-x-2 mb-4"
                    >
                        <Input
                            type="text"
                            placeholder="Kategori baru"
                            required
                            name="name"
                            value={data.name}
                            autoComplete="product-category"
                            onChange={(e) => setData("name", e.target.value)}
                            className="flex-grow"
                        />
                        <Button type="submit" disabled={processing}>
                            <Plus className="h-4 w-4" />
                        </Button>
                    </form>
                    <InputError message={errors.name} className="mt-2" />
                    <Separator className="my-4" />
                    <ul className="space-y-2">
                        {categories.map((category) =>
                            category.id === editedId ? (
                                <form
                                    onSubmit={handleEdit}
                                    className="flex space-x-2 mb-4"
                                >
                                    <Input
                                        type="text"
                                        placeholder="New category name"
                                        required
                                        name="name"
                                        value={data.editedName}
                                        autoComplete="product-category"
                                        onChange={(e) =>
                                            setData(
                                                "editedName",
                                                e.target.value
                                            )
                                        }
                                        className="flex-grow"
                                    />
                                    <Button
                                        type="submit"
                                        size="sm"
                                        className="bg-slate-100 text-slate-500 hover:bg-slate-200"
                                        disabled={processing}
                                        onClick={() => {
                                            setEditedId(0);
                                            setData("editedName", "");
                                        }}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        type="submit"
                                        size="sm"
                                        className="bg-teal-500 hover:bg-teal-600"
                                        disabled={processing}
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                </form>
                            ) : (
                                <li key={category.id}>
                                    <div className="flex items-center justify-between">
                                        <span
                                            className="text-sm font-medium truncate"
                                            style={{
                                                maxWidth: "calc(100% - 7.5rem)",
                                            }}
                                        >
                                            {category.name}
                                        </span>
                                        <div className="space-x-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => {
                                                    setEditedId(category.id);
                                                    setData(
                                                        "editedName",
                                                        category.name
                                                    );
                                                }}
                                            >
                                                <Pencil className="h-4 w-4" />
                                                <span className="sr-only">
                                                    Edit {category.name}
                                                </span>
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        <span className="sr-only">
                                                            Delete{" "}
                                                            {category.name}
                                                        </span>
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>
                                                            Apakah kamu yakin?
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Tindakan ini tidak
                                                            dapat dibatalkan.
                                                            Ini akan menghapus
                                                            kategori "
                                                            {category.name}"
                                                            secara permanen dan
                                                            menghapusnya dari
                                                            server kami.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>
                                                            Batal
                                                        </AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() =>
                                                                handleDelete(
                                                                    category.id,
                                                                    category.name
                                                                )
                                                            }
                                                        >
                                                            Hapus
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    </div>
                                    <Separator className="mt-2" />
                                </li>
                            )
                        )}
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}
