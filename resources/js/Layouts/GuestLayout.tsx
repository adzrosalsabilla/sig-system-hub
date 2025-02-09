import { PropsWithChildren } from "react";
import Background from "./Gambar Login.png";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <>
            <div
                className="w-full lg:grid  lg:grid-cols-2 "
                style={{ height: "100vh" }}
            >
                <div className="flex items-center justify-center py-12">
                    <div className="mx-auto grid w-[350px] gap-6">
                        {children}
                    </div>
                </div>
                <div className="hidden bg-muted lg:block">
                    <img src={Background} alt="image" />
                </div>
            </div>
        </>
    );
}
