import { EProductStatus } from "@/types/enum";

export const getProductStatusBadgeColor = (status: EProductStatus) => {
    switch (status) {
        case EProductStatus.DRAFT:
            return "bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
        case EProductStatus.ACTIVE:
            return "bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200";
        case EProductStatus.ARCHIVED:
            return "bg-gray-200 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
        default:
            return "bg-gray-200 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
};
