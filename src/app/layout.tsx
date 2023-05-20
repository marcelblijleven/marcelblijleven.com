import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from "next";
import Header from "@/components/Header";
import { Analytics } from '@vercel/analytics/react';
import Footer from "@/components/Footer";

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
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className={"max-w-5xl mx-auto px-4 sm:px-6 md:px-8 h-full"}>
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
