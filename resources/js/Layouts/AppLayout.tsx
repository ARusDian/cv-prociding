import { asset } from "@/Models/Helper";
import React from "react";
import "../../css/app.css";

interface Props {
    children: React.ReactNode;
}

export default function AppLayout({ children }: Props) {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <nav className="flex w-full bg-blue-500 p-5 pl-20">
                <div className="ml-7">
                    BoilerPlate
                </div>
            </nav>
            {children}
            <div className="w-full h-60 bg-pink-600">
            </div>
        </div >
    );
}
