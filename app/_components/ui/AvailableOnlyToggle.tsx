"use client"
import React from 'react'

type Props = {
  value: boolean
  onChange: (v: boolean) => void
}

export default function AvailableOnlyToggle({ value, onChange }: Props){
  return (
    <button
      type="button"
      className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${value ? 'bg-brand text-white border-brand' : 'bg-white text-slate-700 hover:border-brand/60'}`}
      onClick={() => onChange(!value)}
      aria-pressed={value}
    >
      {value ? 'Available only: ON' : 'Available only: OFF'}
    </button>
  )
}
