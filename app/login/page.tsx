"use client"
import { useRouter } from 'next/navigation'
import styles from './page.module.css'
import Button from '@/app/_components/ui/Button'
import Image from 'next/image'
import { useAuth } from '@/app/_context/AuthStore'
import { useEffect, useState } from 'react'

export default function LoginPage(){
  const router = useRouter()
  const { isAuthenticated, login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isAuthenticated) router.replace('/home')
  }, [isAuthenticated, router])

  const handleLogin = async () => {
    setError(null)
    if (!username || username.trim().length < 3) {
      setError('Please enter a valid username (min 3 chars).')
      return
    }
    if (!password || password.length < 6) {
      setError('Please enter a password (min 6 chars).')
      return
    }
    const ok = await login(username.trim(), password)
    if (ok) {
      router.replace('/home')
    } else {
      setError('Invalid credentials.')
    }
  }
  return (
    <div className="min-h-dvh flex items-center justify-center px-4">
      <div className={styles.wrap}>
        <div className="mb-3 flex items-center justify-center">
          <Image src="/logo.png" alt="LoopUp logo" width={48} height={48} priority unoptimized className="rounded translate-y-1" />
          <span className="ml-1 text-2xl font-bold text-brand">LoopUp</span>
        </div>
        <h1 className="text-xl font-semibold mb-4 text-center">Login</h1>
        <div className="space-y-3">
          {error && <p className="text-sm text-red-600">{error}</p>}
          <input required minLength={3} className={styles.field} placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
          <input required minLength={6} className={styles.field} placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <Button onClick={handleLogin}>Login</Button>
          <div className="text-right">
            <button className="text-sm text-slate-600" onClick={()=>router.push('/signup')}>Go to Sign up</button>
          </div>
        </div>
      </div>
    </div>
  )
}
