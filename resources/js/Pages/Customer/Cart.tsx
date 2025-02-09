import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { PageProps } from "@/types";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Checkbox } from "@/Components/ui/checkbox";
import { Minus, Plus, Trash2 } from "lucide-react";
import { CustomerLayout } from "@/Layouts/CustomerLayout";
import { useForm, usePage } from "@inertiajs/react";
import { CartProduct } from "@/types/product";
import { router } from "@inertiajs/react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

export default function CartPage() {
    const { toast } = useToast();
    const { items } = usePage<PageProps<{ items: CartProduct[] }>>().props;
    const [cartItems, setCartItems] = useState<CartProduct[]>(items);
    const [selectedItems, setSelectedItems] = useState<CartProduct[]>(items);
    const totalPrice = selectedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const allSelected =
        cartItems.length > 0 && cartItems.every((item) => item.selected);
    const {
        data,
        setData,
        post: checkout,
    } = useForm<{ items: CartProduct[]; totalPrice: number }>({
        items: [],
        totalPrice: 0,
    });
    useEffect(() => {
        setSelectedItems(cartItems.filter((item) => item.selected));
    }, [cartItems]);
    useEffect(() => {
        console.log("items", selectedItems);
        setData("items", selectedItems);
        setData("totalPrice", totalPrice);
    }, [selectedItems, totalPrice]);

    const updateQuantity = (id: number, newQuantity: number) => {
        if (newQuantity >= 0) {
            setCartItems(
                cartItems.map((item) =>
                    item.product_id === id
                        ? { ...item, quantity: newQuantity }
                        : item
                )
            );
            try {
                router.put(
                    route("customer.cart.product-quantity", id),
                    { quantity: newQuantity },
                    {
                        preserveState: true,
                        onError: (error) => {
                            toast({
                                title: `Error`,
                                description:
                                    error?.quantity ?? `Update quantity failed`,
                            });
                        },
                    }
                );
            } catch (error) {
                console.error(error);
            }
        }
    };

    const removeItem = async (productId: number) => {
        setCartItems(cartItems.filter((item) => item.product_id !== productId));
        try {
            await router.delete(
                route("customer.cart.remove-product", productId),
                {
                    preserveState: true, // Keeps the current component state
                    onError: () => {
                        toast({
                            title: `Error`,
                            description: `Remove product failed`,
                        });
                    },
                }
            );
        } catch (error) {
            console.error("Error during request:", error);
        }
    };

    const toggleItemSelection = (id: number) => {
        setCartItems(
            cartItems.map((item) =>
                item.product_id === id
                    ? { ...item, selected: !item.selected }
                    : item
            )
        );
    };

    // const toggleAllSelection = (selected: boolean) => {
    //     setCartItems(cartItems.map((item) => ({ ...item, selected })));
    // };
    const toggleAllSelection = () => {
        setCartItems(
            cartItems.map((item) => ({ ...item, selected: !allSelected }))
        );
    };

    const onCheckout = async () => {
        await setData("items", selectedItems);
        await setData("totalPrice", totalPrice);
        try {
            const response = await axios.post(
                route("customer.transactions.checkout"),
                {
                    items: selectedItems,
                    total_price: totalPrice,
                }
            );

            if (response.status === 200) {
                document.location.href = response.data.url;
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <CustomerLayout title="Keranjang">
            <div className="px-6">
                <Card className="w-full max-w-5xl mx-auto">
                    <CardHeader>
                        <CardTitle>Keranjang Belanja</CardTitle>
                        <CardDescription>
                            Checkout semua barang belanjaanmu di keranjang
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {cartItems.length === 0 ? (
                            <p className="text-center text-gray-500">
                                Kerajangmu kosong
                            </p>
                        ) : (
                            <>
                                <div className="mb-4 flex items-center">
                                    <Checkbox
                                        id="select-all"
                                        checked={allSelected}
                                        onCheckedChange={(checked: unknown) =>
                                            toggleAllSelection()
                                        }
                                    />
                                    <label
                                        htmlFor="select-all"
                                        className="ml-2 text-sm font-medium"
                                    >
                                        Select All Items
                                    </label>
                                </div>
                                <div className="space-y-4">
                                    {items.map((item) => (
                                        <Card key={item.product_id}>
                                            <CardContent className="p-4">
                                                <div className="flex items-center space-x-4">
                                                    <Checkbox
                                                        id={`item-${item.product_id}`}
                                                        checked={
                                                            allSelected ||
                                                            item.selected
                                                        }
                                                        onCheckedChange={() =>
                                                            toggleItemSelection(
                                                                item.product_id
                                                            )
                                                        }
                                                    />
                                                    <div
                                                        className="w-20 h-20 relative"
                                                        style={{
                                                            backgroundImage: `url(${item.image})`,
                                                            backgroundSize:
                                                                "cover",
                                                            backgroundPosition:
                                                                "center",
                                                            width: "100px",
                                                            aspectRatio: "1/1",
                                                            borderRadius: "8px",
                                                        }}
                                                    ></div>
                                                    <div className="flex-grow">
                                                        <label
                                                            htmlFor={`item-${item.product_id}`}
                                                            className="text-lg font-semibold"
                                                        >
                                                            {item.name}
                                                        </label>
                                                        <p className="text-gray-600">
                                                            {Intl.NumberFormat(
                                                                "id-ID",
                                                                {
                                                                    style: "currency",
                                                                    currency:
                                                                        "IDR",
                                                                }
                                                            ).format(
                                                                item.price
                                                            )}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    item.product_id,
                                                                    item.quantity -
                                                                        1
                                                                )
                                                            }
                                                        >
                                                            <Minus className="h-4 w-4" />
                                                        </Button>
                                                        <Input
                                                            type="number"
                                                            value={
                                                                item.quantity
                                                            }
                                                            onChange={(e) =>
                                                                updateQuantity(
                                                                    item.product_id,
                                                                    parseInt(
                                                                        e.target
                                                                            .value
                                                                    ) || 0
                                                                )
                                                            }
                                                            className="w-16 text-center"
                                                        />
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    item.product_id,
                                                                    item.quantity +
                                                                        1
                                                                )
                                                            }
                                                        >
                                                            <Plus className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                    <Button
                                                        variant="destructive"
                                                        size="icon"
                                                        onClick={() =>
                                                            removeItem(
                                                                item.product_id
                                                            )
                                                        }
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        <span className="sr-only">
                                                            Remove item
                                                        </span>
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                                <div className="mt-8 space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-semibold">
                                            Total ({selectedItems.length}{" "}
                                            items):
                                        </span>
                                        <span className="text-xl font-bold">
                                            {Intl.NumberFormat("id-ID", {
                                                style: "currency",
                                                currency: "IDR",
                                            }).format(totalPrice)}
                                        </span>
                                    </div>
                                    <Button
                                        className="w-full"
                                        size="lg"
                                        disabled={selectedItems.length === 0}
                                        onClick={onCheckout}
                                    >
                                        Proceed to Checkout (
                                        {selectedItems.length} items)
                                    </Button>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            </div>
        </CustomerLayout>
    );
}
