"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './BottomNav.module.css'
import { HomeIcon, MagnifyingGlassIcon, HeartIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline'
import { useAvailableOnly } from '@/app/_hooks/useAvailableOnly'

export function BottomNav(){
  const path = usePathname()
  const isActive = (href: string) => path === href
  const { availableOnly } = useAvailableOnly()

  return (
    <nav className={styles.nav}>
      <div className={`container ${styles.inner}`}>
        <Link
          href={{ pathname: '/home', query: availableOnly ? { available: '1' } : undefined }}
          className={`${styles.link} ${isActive('/home') ? styles.active : ''}`}
        >
          <HomeIcon className="w-6 h-6"/>
          <span>Home</span>
        </Link>
        <Link href="/search" className={`${styles.link} ${isActive('/search') ? styles.active : ''}`}>
          <MagnifyingGlassIcon className="w-6 h-6"/>
          <span>Search</span>
        </Link>
        <Link href="/donate" className={`${styles.link} ${isActive('/donate') ? styles.active : ''}`}>
          <HeartIcon className="w-6 h-6"/>
          <span>Donate</span>
        </Link>
        <Link href="/cart" className={`${styles.link} ${isActive('/cart') ? styles.active : ''}`}>
          <ShoppingCartIcon className="w-6 h-6"/>
          <span>Cart</span>
        </Link>
        <Link href="/profile" className={`${styles.link} ${isActive('/profile') ? styles.active : ''}`}>
          <UserIcon className="w-6 h-6"/>
          <span>Profile</span>
        </Link>
      </div>
    </nav>
  )
}
