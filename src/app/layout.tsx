import './globals.css'
import {ReactNode} from "react";
import {Metadata} from "next";
import {Analytics} from '@vercel/analytics/react';
import {Fira_Code} from 'next/font/google'

import {ThemeProvider} from "@/components/theme-provider";
import Header from "@/components/layout/header";
import {cn} from "@/lib/utils";

const font = Fira_Code({subsets: ['latin']})

export const metadata: Metadata = {
    title: {
        template: '%s | marcelblijleven.com',
        default: 'marcelblijleven.com',
    },
    description: "My website"
}

export default function RootLayout({children}: { children: ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={cn(font.className, "min-h-screen")}>
        <ThemeProvider attribute={"class"} defaultTheme={"system"} enableSystem>
            <div className={"relative min-h-screen"}>
                <Header/>
                <main className="flex h-full flex-col items-center p-6 md:p-24 space-y-6">
                    {children}
                    <Analytics/>
                </main>
            </div>
        </ThemeProvider>
        </body>
        </html>
    )
}
