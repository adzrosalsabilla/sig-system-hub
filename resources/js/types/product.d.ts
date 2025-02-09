import { User } from ".";
import { ETransactionStatus } from "./enum";

export enum EProductStatus {
    DRAFT = "draft",
    ACTIVE = "active",
    ARCHIVED = "archived",
}

export interface ProductCategory {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface Product {
    id: number;
    name: string;
    product_category?: ProductCategory;
    description: string;
    price: number;
    stock: number;
    image: string;
    status: EProductStatus;
    created_at: string;
    updated_at: string;
}

export interface Cart {
    id: number;
    user_id: number;
}

export interface CartProduct {
    product_id: number;
    image: string;
    name: string;
    quantity: number;
    price: number;
    subtotal: number;
    selected: boolean;
}

export interface Transaction {
    id: number;
    user_id: number;
    transaction_number: string;
    amount: number;
    status: ETransactionStatus;
    created_at: string;
    updated_at: string;
    payment_details: string;
    payment_url: string;
    user?: User;
}

export interface Inventory {
    id: number;
    name: string;
    item_code: string;
    stock: number;
    price: number;
    purchase_date: string;
    created_at: string;
    updated_at: string;
}
