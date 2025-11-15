"use client"
import { useEffect, useState } from 'react'

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

  // Persist to localStorage and reflect in URL using browser history APIs.
  useEffect(() => {
    try { window.localStorage.setItem(KEY, availableOnly ? '1' : '0') } catch {}
    try {
      const pathname = window.location.pathname || '/'
      const params = new URLSearchParams(window.location.search)
      if (availableOnly) params.set('available', '1')
      else params.delete('available')
      const query = params.toString()
      const newUrl = query ? `${pathname}?${query}` : pathname
      // Use history.replaceState to avoid triggering navigation during client-side updates
      window.history.replaceState(window.history.state, '', newUrl)
    } catch {}
  }, [availableOnly])

  return { availableOnly, setAvailableOnly }
}
