import './globals.css'
import {ReactNode} from "react";
import {Metadata} from "next";
import {Analytics} from '@vercel/analytics/react';
import {IBM_Plex_Sans} from 'next/font/google'

const font = IBM_Plex_Sans({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600"],
    variable: "--font-sans",
})

export const metadata: Metadata = {
    title: {
        template: '%s | marcelblijleven.com',
        default: 'marcelblijleven.com',
    },
    description: "Software engineer creating quality software and automating the boring stuff"
}

export default function RootLayout({children}: { children: ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={font.className}>
        <div className={"mx-auto min-h-screen max-w-5xl pb-12"}>
            <main className={"flex flex-col justify-center antialiased"}>
                {children}
            </main>
        </div>
        <Analytics/>
        </body>
        </html>
    )
}
