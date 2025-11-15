"use client"
import Link from 'next/link'
import styles from './Header.module.css'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { Sidebar } from '@/app/_components/global/Sidebar/Sidebar'
import { useCart } from '@/app/_context/CartContext'
import Image from 'next/image'
import { useAvailableOnly } from '@/app/_hooks/useAvailableOnly'

export function Header(){
  const [open, setOpen] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const { items } = useCart()
  const { availableOnly } = useAvailableOnly()

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <button aria-label="Open menu" className={styles.menuBtn} onClick={()=>setOpen(true)}>
          <Bars3Icon className="w-6 h-6"/>
        </button>
          <Link
            href={{ pathname: '/home', query: availableOnly ? { available: '1' } : undefined }}
            className="flex items-center gap-0"
          >
          {logoError ? (
            <div className="w-12 h-12 rounded bg-brand" aria-label="LoopUp logo placeholder" />
          ) : (
            <Image
              src="/logo.png"
              alt="LoopUp logo"
              width={48}
              height={48}
              priority
              unoptimized
              className="rounded shrink-0 transform translate-y-0.5"
              onError={() => setLogoError(true)}
            />
          )}
          <span className={styles.title}>LoopUp</span>
        </Link>
        <div className={styles.actions}>
          <Link href="/search" className={styles.searchBtn} aria-label="Search">
            <MagnifyingGlassIcon className="w-6 h-6"/>
          </Link>
          <Link href="/cart" className="relative p-2 rounded-md hover:bg-slate-100" aria-label="Cart">
            <ShoppingCartIcon className="w-6 h-6"/>
            {items.length>0 && (
              <span className="absolute -top-1 -right-1 text-xs bg-brand text-white rounded-full w-5 h-5 grid place-items-center">
                {items.length}
              </span>
            )}
          </Link>
        </div>
      </div>
      <Sidebar open={open} onClose={()=>setOpen(false)} />
    </header>
  )
}
