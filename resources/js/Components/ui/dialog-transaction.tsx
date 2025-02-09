import { useState } from "react";
import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { Textarea } from "@/Components/ui/textarea";
import { Label } from "@/Components/ui/label";
import { ETransactionStatus } from "@/types/enum";
import { useForm } from "@inertiajs/react";
import { Transaction } from "@/types/product";

export interface DialogTransactionProps {
    transaction: Transaction | null;
    open: boolean;
    onClose: () => void;
}
export default function DialogTransaction({
    transaction,
    open,
    onClose,
}: DialogTransactionProps) {
    const { put, data, setData } = useForm({
        status: "",
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onClose();
        put(route("admin.transactions.update-status", transaction?.id));
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Transaction Status</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">
                                Status
                            </Label>
                            <Select
                                value={data.status}
                                onValueChange={(e) => setData("status", e)}
                                required
                            >
                                <SelectTrigger
                                    className="col-span-3"
                                    id="status"
                                >
                                    <SelectValue placeholder="Select new status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem
                                        value={ETransactionStatus.PENDING}
                                    >
                                        Pending
                                    </SelectItem>
                                    <SelectItem value={ETransactionStatus.PAID}>
                                        Paid
                                    </SelectItem>
                                    <SelectItem
                                        value={ETransactionStatus.PROCESS}
                                    >
                                        Process
                                    </SelectItem>
                                    <SelectItem
                                        value={ETransactionStatus.SHIPPING}
                                    >
                                        Shipping
                                    </SelectItem>
                                    <SelectItem
                                        value={ETransactionStatus.FAILED}
                                    >
                                        Failed
                                    </SelectItem>
                                    <SelectItem
                                        value={ETransactionStatus.COMPLETED}
                                    >
                                        Completed
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Update Status</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
