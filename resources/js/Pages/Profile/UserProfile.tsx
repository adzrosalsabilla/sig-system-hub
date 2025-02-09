import { DashboardLayout } from "@/Layouts/DashboardLayout";
import { Head, usePage } from "@inertiajs/react";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import ChangePasswordForm from "./forms/ChangePasswordForm";
import DeleteAccountCard from "./forms/DeleteAccountCard";
import React from "react";
import { CustomerLayout } from "@/Layouts/CustomerLayout";

const UserProfile = React.forwardRef<HTMLDivElement>((_, ref) => {
    const user = usePage().props.auth.user;

    if (user.role === "customer")
        return (
            <CustomerLayout title="Profile">
                <Head title="Profile" />
                <main
                    ref={ref}
                    className="container mx-auto p-4 space-y-6 lg:w-4/5"
                >
                    <h1 className="text-3xl font-bold mb-6">
                        Profile Settings
                    </h1>
                    <PersonalInfoForm />
                    <ChangePasswordForm />
                    <DeleteAccountCard />
                </main>
            </CustomerLayout>
        );

    return (
        <DashboardLayout title="Profile">
            <Head title="Profile" />
            <main
                ref={ref}
                className="container mx-auto p-4 space-y-6 lg:w-4/5"
            >
                <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>
                <PersonalInfoForm />
                <ChangePasswordForm />
                <DeleteAccountCard />
            </main>
        </DashboardLayout>
    );
});

export default UserProfile;
