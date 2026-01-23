import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Toaster } from "sonner";

const spaceMono = Space_Mono({
    variable: "--font-space-mono",
    weight: ["400"],
    subsets: ["latin"],
});
const dmSans = DM_Sans({
    variable: "--font-sans",
    weight: ["400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Jordan Romagnoli | Digital Garden",
    description:
        "Digital garden di Jordan Romagnoli. Qui documento il mio percorso come sviluppatore web, condividendo progetti, risorse e tutto ciò che imparo lungo la strada verso la mia prossima sfida professionale.",
    icons: {
        icon: [
            { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
            { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        ],
        apple: [
            {
                url: "/apple-touch-icon.png",
                sizes: "180x180",
                type: "image/png",
            },
        ],
    },
    authors: [{ name: "Jordan Romagnoli" }],
    openGraph: {
        title: "Jordan Romagnoli | Web Developer",
        description:
            "Il mio Digital Garden. Esplora i miei progetti, le mie note di studio e il mio percorso nello sviluppo web.",
        images: ["/laptop-screenshot.png"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="it" className="no-scrollbar">
            <body
                className={`${spaceMono.variable} ${dmSans.variable} antialiased`}
            >
                <Toaster position="top-center" />
                {children}
                <DotPattern className="-z-10 opacity-30" />
            </body>
        </html>
    );
}
