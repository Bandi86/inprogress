import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { store, persistor } from '@/redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import ThemeProvider from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bookshop',
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider>
              <main className='bg-black h-dvh'>{children}</main>
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  )
}
