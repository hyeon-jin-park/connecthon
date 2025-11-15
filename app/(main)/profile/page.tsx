"use client"
import { useAuth } from '@/app/_context/AuthStore'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { UserCircleIcon, BuildingOfficeIcon, IdentificationIcon, ArrowRightOnRectangleIcon, Cog6ToothIcon, ClipboardDocumentListIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

export default function ProfilePage(){
  const { user, logout } = useAuth()
  const router = useRouter()
  const initials = (user?.name || user?.username || '?')
    .split(' ')
    .map(s => s[0])
    .join('')
    .slice(0,2)
    .toUpperCase()
  return (
    <div className="max-w-xl">
      <div className="rounded-xl border bg-gradient-to-r from-emerald-50 to-white p-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-brand/10 grid place-items-center text-brand font-semibold">
            {initials}
          </div>
          <div>
            <div className="text-base font-semibold text-slate-800">{user?.name ?? user?.username ?? 'Guest'}</div>
            <div className="text-sm text-slate-600">@{user?.username ?? 'unknown'}</div>
          </div>
        </div>
        {user?.university && (
          <div className="mt-3 flex items-center gap-2 text-sm text-slate-700">
            <BuildingOfficeIcon className="w-4 h-4 text-brand" />
            <span>{user.university}</span>
            {user.studentId && (
              <span className="text-slate-400">·</span>
            )}
            {user.studentId && (
              <span className="flex items-center gap-1"><IdentificationIcon className="w-4 h-4 text-slate-400" />{user.studentId}</span>
            )}
          </div>
        )}
      </div>

      <ul className="rounded-xl border bg-white divide-y overflow-hidden">
        <li>
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <UserCircleIcon className="w-5 h-5 text-slate-500" />
              <span className="text-slate-700">Name</span>
            </div>
            <span className="text-slate-600">{user?.name ?? '—'}</span>
          </div>
        </li>
        <li>
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ClipboardDocumentListIcon className="w-5 h-5 text-slate-500" />
              <span className="text-slate-700">Username</span>
            </div>
            <span className="text-slate-600">{user?.username ?? '—'}</span>
          </div>
        </li>
        <li>
          <Link href="/profile/rentals" className="px-4 py-3 flex items-center justify-between hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <ClipboardDocumentListIcon className="w-5 h-5 text-slate-500" />
              <span className="text-slate-700">My Rentals</span>
            </div>
            <ChevronRightIcon className="w-5 h-5 text-slate-400" />
          </Link>
        </li>
        <li>
          <button className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <Cog6ToothIcon className="w-5 h-5 text-slate-500" />
              <span className="text-slate-700">Settings (Mock)</span>
            </div>
            <ChevronRightIcon className="w-5 h-5 text-slate-400" />
          </button>
        </li>
        <li>
          <button className="w-full px-4 py-3 flex items-center justify-between text-red-600 hover:bg-red-50/60" onClick={()=>{ logout(); router.replace('/login') }}>
            <div className="flex items-center gap-3">
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              <span>Logout</span>
            </div>
          </button>
        </li>
      </ul>
    </div>
  )
}
