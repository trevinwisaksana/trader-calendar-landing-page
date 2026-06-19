import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || ''
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

const supaClient = (SUPABASE_URL && SUPABASE_ANON_KEY)
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function WaitlistForm({ dark }) {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    const v = email.trim().toLowerCase()
    if (!EMAIL_RE.test(v)) {
      setErr('Enter a valid email.')
      return
    }
    setErr('')
    setLoading(true)

    if (supaClient) {
      try {
        const { error } = await supaClient
          .from('signups')
          .insert({ email: v })
        if (error) {
          const dup = error.code === '23505' || /duplicate/i.test(error.message || '')
          if (!dup) {
            setErr("Couldn't save your email. Try again?")
            setLoading(false)
            return
          }
        }
      } catch {
        setErr("Couldn't save your email. Try again?")
        setLoading(false)
        return
      }
    }

    setDone(true)
    setLoading(false)
  }

  if (done) {
    return (
      <div
        className="max-w-[380px] border-t pt-3.5 text-sm"
        style={{
          borderColor: dark ? 'rgba(255,255,255,0.15)' : '#171717',
          color: dark ? 'rgba(255,255,255,0.5)' : '#171717',
        }}
      >
        Thanks. We'll be in touch.
      </div>
    )
  }

  return (
    <div className="max-w-[380px]">
      <div
        className="flex gap-0 border-b pb-0.5"
        style={{ borderColor: dark ? 'rgba(255,255,255,0.18)' : '#171717' }}
      >
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="email"
          value={email}
          onChange={e => { setEmail(e.target.value); setErr('') }}
          onKeyDown={e => e.key === 'Enter' && submit()}
          className={`min-w-0 flex-1 border-none bg-transparent py-2 text-base focus:outline-none ${
            dark
              ? 'text-white placeholder:text-white/25'
              : 'text-neutral-900 placeholder:text-neutral-400'
          }`}
        />
        <button
          onClick={submit}
          disabled={loading}
          className="flex-shrink-0 cursor-pointer border-none bg-transparent py-2 text-[15px] font-medium disabled:opacity-50"
          style={{ color: dark ? '#d97706' : '#111' }}
        >
          {loading ? 'Saving…' : 'Get access →'}
        </button>
      </div>
      {err && (
        <p className={`mt-2 text-[13px] ${dark ? 'text-red-400' : 'text-red-600'}`}>{err}</p>
      )}
    </div>
  )
}
