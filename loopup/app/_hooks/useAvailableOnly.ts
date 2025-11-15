"use client"
import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const KEY = 'available_only'

export function useAvailableOnly(){
  const [availableOnly, setAvailableOnly] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    try {
      const params = new URLSearchParams(window.location.search)
      const fromUrl = params.get('available')
      if (fromUrl != null) return fromUrl === '1' || fromUrl.toLowerCase() === 'true'
      const raw = window.localStorage.getItem(KEY)
      return raw === '1'
    } catch {
      return false
    }
  })
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // Persist to localStorage and reflect in URL
  useEffect(() => {
    try { window.localStorage.setItem(KEY, availableOnly ? '1' : '0') } catch {}
    if (!pathname) return
    const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : searchParams?.toString())
    if (availableOnly) params.set('available', '1')
    else params.delete('available')
    const query = params.toString()
    router.replace(query ? `${pathname}?${query}` : pathname)
  }, [availableOnly, pathname, router])

  return { availableOnly, setAvailableOnly }
}
