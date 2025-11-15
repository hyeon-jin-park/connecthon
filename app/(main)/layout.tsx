"use client"
import { Header } from '../_components/global/Header/Header'
import { BottomNav } from '../_components/global/BottomNav/BottomNav'
import { useAuth } from '@/app/_context/AuthStore'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function MainLayout({ children }: { children: React.ReactNode }){
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) router.replace('/login')
  }, [isAuthenticated, router])

  if (!isAuthenticated) return null

  return (
    <div className="min-h-dvh pb-16 md:pb-0">
      <Header />
      <main className="container py-4">
        {children}
      </main>
      <BottomNav />
    </div>
  )
}
