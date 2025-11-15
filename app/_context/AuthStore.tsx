"use client"
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { User } from '@/app/_lib/definitions'
import { demoUser } from '@/app/_lib/dummy-data'

type AuthContextValue = {
  user: User | null
  isAuthenticated: boolean
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
  register: (data: { username: string; password: string; name: string; university?: string; studentId?: string }) => Promise<{ ok: true } | { ok: false; error: string }>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const STORAGE_KEY = 'auth_user'
const USERS_KEY = 'auth_users'

type UserRecord = User & { password: string }

export function AuthStoreProvider({ children }: { children: React.ReactNode }){
  const [user, setUser] = useState<User | null>(null)
  const [users, setUsers] = useState<UserRecord[] | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as User
        setUser(parsed)
      }
    } catch {}
  }, [])

  // Initialize users list with demo user if not present
  useEffect(() => {
    try {
      const raw = localStorage.getItem(USERS_KEY)
      if (raw) {
        setUsers(JSON.parse(raw) as UserRecord[])
      } else {
        const initial: UserRecord[] = [{
          id: demoUser.id,
          username: demoUser.username,
          name: demoUser.name,
          password: demoUser.password,
        }]
        localStorage.setItem(USERS_KEY, JSON.stringify(initial))
        setUsers(initial)
      }
    } catch {
      setUsers([])
    }
  }, [])

  const login = async (username: string, password: string) => {
    const list = users ?? []
    const match = list.find(u => u.username === username && u.password === password)
    if (!match) return false
    const u: User = { id: match.id, username: match.username, name: match.name, university: match.university, studentId: match.studentId }
    setUser(u)
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(u)) } catch {}
    return true
  }

  const logout = () => {
    setUser(null)
    try { localStorage.removeItem(STORAGE_KEY) } catch {}
  }

  const register: AuthContextValue['register'] = async ({ username, password, name, university, studentId }) => {
    if (!username || !password || !name) {
      return { ok: false, error: 'Please fill required fields.' }
    }
    const list = users ?? []
    if (list.some(u => u.username === username)) {
      return { ok: false, error: 'Username already exists.' }
    }
    const newUser: UserRecord = {
      id: 'u-' + Date.now(),
      username,
      name,
      university,
      studentId,
      password,
    }
    const updated = [...list, newUser]
    setUsers(updated)
    try { localStorage.setItem(USERS_KEY, JSON.stringify(updated)) } catch {}
    const u: User = { id: newUser.id, username: newUser.username, name: newUser.name, university: newUser.university, studentId: newUser.studentId }
    setUser(u)
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(u)) } catch {}
    return { ok: true }
  }

  const value = useMemo<AuthContextValue>(() => ({ user, isAuthenticated: !!user, login, logout, register }), [user, users])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(){
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthStoreProvider')
  return ctx
}
