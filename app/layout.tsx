"use client"

import React from "react";
import "./globals.css";
import { useEffect } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";

import { usePathname } from "next/navigation";
import Header from "@/components/layout/header";

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    style: "normal",
    variable: "--font-plus-jakarta-sans",
});

export default function RootLayout({children,}: Readonly<{
  children: React.ReactNode;
}>) {
    const pathname = usePathname();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    
    return (
        <html 
            lang="en"
            className={`${plusJakartaSans.variable}`}
        >
            <body
                className={`antialiased`}
            >
                <Header />
                <main className={`mt-12 mb-10`}>
                    {children}
                </main>
            </body>
        </html>
    );
}
