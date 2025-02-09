import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { ShoppingCart, Eye } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/Components/ui/dialog";
import { useState } from "react";
import { CustomerLayout } from "@/Layouts/CustomerLayout";
import { PageProps, PaginationResponse } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import { Product } from "@/types/product";
import { useToast } from "@/hooks/use-toast";
import PaginationSection from "@/Components/sections/PaginationSection";

export default function ProductCatalog() {
    const { toast } = useToast();
    const { products } =
        usePage<PageProps<{ products: PaginationResponse<Product> }>>().props;
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(
        null
    );
    const { post, processing } = useForm({
        productId: "",
    });

    const handleAddToCart = (product: Product) => {
        post(route("customer.cart.add", product.id), {
            onSuccess: () => {
                toast({
                    title: `Add ${product.name} to cart`,
                    description: `You have added ${product.name} to your cart`,
                });
            },
        });
    };

    console.log(products);

    return (
        <CustomerLayout title="Products">
            <main className="mx-auto px-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Produk</CardTitle>
                        <CardDescription>Beli produk menarik</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.data.map((product) => (
                            <Card
                                key={product.id}
                                className="flex flex-col overflow-hidden"
                            >
                                <div
                                    className="aspect-w-1 aspect-h-1 w-full relative transition-all overflow-hidden hover:scale-105"
                                    style={{
                                        backgroundImage: `url(${product.image})`,
                                        height: "200px",
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}
                                ></div>
                                <CardContent className="p-4 flex-grow">
                                    <h2
                                        className="text-lg font-semibold mb-2 cursor-pointer transition hover:text-blue-500"
                                        onClick={() =>
                                            setSelectedProduct(product)
                                        }
                                    >
                                        {product.name}
                                    </h2>
                                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                        {product.description}
                                    </p>
                                    <Badge className="dark:bg-orange-700 dark:text-white bg-orange-50 text-orange-500 hover:bg-orange-100 shadow-none">
                                        {Intl.NumberFormat("id-ID", {
                                            style: "currency",
                                            currency: "IDR",
                                        }).format(product.price)}
                                    </Badge>
                                </CardContent>
                                <CardFooter className="p-4 pt-0 mt-auto">
                                    <div className="flex w-full space-x-2">
                                        <Button
                                            className="flex-1"
                                            variant="default"
                                            onClick={() =>
                                                handleAddToCart(product)
                                            }
                                        >
                                            <ShoppingCart className="h-5 w-5 mr-2" />
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        ))}
                    </CardContent>
                    <CardFooter>
                        <div className="flex justify-between w-full items-center">
                            <div className="text-xs text-muted-foreground flex-1">
                                Menampilkan{" "}
                                <strong>
                                    {products.from}-{products.to}
                                </strong>{" "}
                                dari <strong>{products.total}</strong> produk
                            </div>
                            <PaginationSection data={products} />
                        </div>
                    </CardFooter>
                </Card>

                <Dialog
                    open={!!selectedProduct}
                    onOpenChange={() => setSelectedProduct(null)}
                >
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{selectedProduct?.name}</DialogTitle>
                        </DialogHeader>
                        <div
                            className="aspect-w-16 aspect-h-9 mb-4"
                            style={{
                                backgroundImage: `url(${selectedProduct?.image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                width: "100%",
                                aspectRatio: "4/3",
                                borderRadius: "12px",
                            }}
                        ></div>
                        <DialogDescription>
                            {selectedProduct?.description}
                        </DialogDescription>
                        <div className="mt-4">
                            <Badge className="dark:bg-orange-700 dark:text-white">
                                {Intl.NumberFormat("id-ID", {
                                    style: "currency",
                                    currency: "IDR",
                                }).format(selectedProduct?.price || 0)}
                            </Badge>
                        </div>
                        <DialogFooter>
                            <div className="flex w-full space-x-2">
                                <Button
                                    className="flex-1"
                                    variant="outline"
                                    onClick={() => setSelectedProduct(null)}
                                >
                                    Tutup
                                </Button>
                                <Button
                                    className="flex-1"
                                    variant="default"
                                    onClick={() => {
                                        if (selectedProduct)
                                            handleAddToCart(selectedProduct);
                                    }}
                                    disabled={processing}
                                >
                                    <ShoppingCart className="h-5 w-5 mr-2" />
                                    Tambah ke Keranjang
                                </Button>
                            </div>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </main>
        </CustomerLayout>
    );
}
