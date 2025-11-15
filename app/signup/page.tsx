"use client"
import { useRouter } from 'next/navigation'
import Button from '@/app/_components/ui/Button'
import Image from 'next/image'
import styles from './page.module.css'
import { useAuth } from '@/app/_context/AuthStore'
import { useEffect, useState } from 'react'

const universities = [
  'Seoul National University',
  'Yonsei University',
  'Korea University',
  'KAIST',
  'POSTECH',
  'Sungkyunkwan University',
  'Hanyang University',
  'Sogang University',
  'Ewha Womans University',
  'Kyung Hee University',
  'Chung-Ang University',
  'Hankuk University of Foreign Studies',
  'Konkuk University',
  'University of Seoul',
  'Inha University',
  'Pusan National University',
  'UNIST',
  'DGIST',
  'GIST',
  'Handong Global University',
]

export default function SignupPage(){
  const router = useRouter()
  const { isAuthenticated, register } = useAuth()
  const [university, setUniversity] = useState('')
  const [studentId, setStudentId] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isAuthenticated) router.replace('/home')
  }, [isAuthenticated, router])

  const handleSignup = async () => {
    setError(null)
    const res = await register({ username, password, name, university: university || undefined, studentId: studentId || undefined })
    if (res.ok) {
      router.replace('/home')
    } else {
      setError(res.error)
    }
  }
  return (
    <div className="min-h-dvh flex items-center justify-center px-4">
      <div className={styles.wrap}>
        <div className="mb-3 flex items-center justify-center">
          <Image src="/logo.png" alt="LoopUp logo" width={48} height={48} priority unoptimized className="rounded translate-y-1" />
          <span className="ml-1 text-2xl font-bold text-brand">LoopUp</span>
        </div>
        <h1 className="text-xl font-semibold mb-4 text-center">Sign Up</h1>
        <div className="space-y-3">
          {error && <p className="text-sm text-red-600">{error}</p>}
          <select className={styles.field} value={university} onChange={e=>setUniversity(e.target.value)}>
            <option value="" disabled>Select University</option>
            {universities.map(u => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
          <input className={styles.field} placeholder="Student ID" value={studentId} onChange={e=>setStudentId(e.target.value)} />
          <input className={styles.field} placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
          <input className={styles.field} placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <input className={styles.field} placeholder="Name (signature)" value={name} onChange={e=>setName(e.target.value)} />
          <Button onClick={handleSignup}>Create Account and Log in</Button>
          <p className={styles.hint}>By signing up you agree to our terms (mock).</p>
          <div className="text-right">
            <button className="text-sm text-slate-600" onClick={()=>router.push('/login')}>Go to Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}
