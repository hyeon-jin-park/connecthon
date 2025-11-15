import { Suspense } from 'react'

export default function CheckoutLayout({ children }: { children: React.ReactNode }){
  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-40 bg-white border-b">
        <div className="container h-12 flex items-center font-medium">Checkout</div>
      </header>
      <main className="container py-4">
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
      </main>
    </div>
  )
}
