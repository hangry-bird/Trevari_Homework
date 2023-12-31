import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ReactQueryProvider from "@/queries/ReactQueryProvider";
import '@/styles/global.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="flex justify-center py-4">
          <h1>도서 검색 사이트</h1>
        </header>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  )
}
