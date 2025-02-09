import { ETransactionStatus } from "@/types/enum";

export const getStatusColor = (status: ETransactionStatus) => {
    switch (status) {
        case "pending":
            return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
        case "paid":
            return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
        case "shipping":
            return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
        case "process":
            return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
        case "completed":
            return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
        case "failed":
            return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
        default:
            return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
};
