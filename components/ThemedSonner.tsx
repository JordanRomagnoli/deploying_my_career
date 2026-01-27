"use client";

import { useTheme } from "next-themes";
import { Toaster } from "sonner";

const ThemedSonner = () => {
    const { theme } = useTheme();

    return (
        <Toaster
            position="top-center"
            theme={theme as "light" | "dark" | "system" | undefined}
        />
    );
};

export default ThemedSonner;
