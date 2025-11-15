import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from './_context/CartContext'
import { ProductStoreProvider } from './_context/ProductStore'
import { AuthStoreProvider } from './_context/AuthStore'

export const metadata: Metadata = {
  title: 'LoopUp',
  description: 'Donation-based rental platform for exchange students',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthStoreProvider>
          <CartProvider>
            <ProductStoreProvider>
              {children}
            </ProductStoreProvider>
          </CartProvider>
        </AuthStoreProvider>
      </body>
    </html>
  )
}
