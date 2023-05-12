import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from "next";

const inter = Inter({ subsets: ['latin'] })
const color = "#0284c7";  // sky 600

export const metadata: Metadata = {
  title: 'marcelblijleven.com',
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
      <body className={inter.className}>{children}</body>
    </html>
  )
}
