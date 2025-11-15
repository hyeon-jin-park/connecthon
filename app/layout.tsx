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
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0ea5a4" />
        <link rel="icon" href="/icon.png" />
      </head>
      <body>
        <AuthStoreProvider>
          <CartProvider>
            <ProductStoreProvider>
              {children}
            </ProductStoreProvider>
          </CartProvider>
        </AuthStoreProvider>
        <script dangerouslySetInnerHTML={{ __html: `
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
              navigator.serviceWorker.register('/sw.js').catch(()=>{});
            });
          }
        `}} />
      </body>
    </html>
  )
}
