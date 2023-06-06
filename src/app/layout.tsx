import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from "next";
import Header from "@/components/header";
import { Analytics } from '@vercel/analytics/react';
import {ThemeProvider} from "@/components/theme-provider";
// import Footer from "@/components/Footer";

const inter = Inter({ subsets: ['latin'] })
const color = "#0284c7";  // sky 600

export const metadata: Metadata = {
  title: "marcelblijleven.com",
  description: "My personal website where I share things and tinker with stuff",
  themeColor: [
    {color, media: "(prefers-color-scheme: light)"},
    {color, media: "(prefers-color-scheme: dark)"},
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={"h-full"}>
      <body className={inter.className + "h-full"}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Header />
        <main className={"max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pb-8"}>
          {children}
          <Analytics />
        </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
