import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/header/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Men Cube',
  description: 'gaming movies series for everyone'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="hun">
      <body className={inter.className}>
        <Header />
        <div className="flex flex-col items-center h-min-screen ml-[10rem] mr-[10rem] mt-4">
          {children}
        </div>
      </body>
    </html>
  )
}
