"use client";

import { ReactNode } from "react";
import { toast } from "sonner";

type ButtonCopyMailProps = {
    email: string;
    children: ReactNode;
};

const ButtonCopyMail = ({ email, children }: ButtonCopyMailProps) => {
    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(email);
            toast.success("Email copiata negli appunti");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <button
            className="flex items-center justify-center bg-gray-300/25 text-muted-foreground p-1 hover:bg-cyan-500/25 rounded hover:text-cyan-500 active:text-cyan-500 transition-all duration-75 hover:shadow-md hover:shadow-cyan-500/25 cursor-pointer active:scale-95"
            onClick={copyToClipboard}
        >
            {children}
        </button>
    );
};

export default ButtonCopyMail;
