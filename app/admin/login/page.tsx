'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import Button from '@/components/ui/Button'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-[#FDFAF4] pt-16 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1
          className="text-3xl font-bold text-[#1A1A1A] mb-2 text-center"
          style={{ fontFamily: 'var(--font-lora)' }}
        >
          Admin login
        </h1>
        <p className="text-center text-[#1A1A1A]/50 text-sm mb-8">Arepas y más dashboard</p>

        <form onSubmit={handleLogin} className="bg-white rounded-2xl p-8 border border-black/5 shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#1A1A1A]/70 mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-black/15 rounded-xl px-4 py-3 text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#F5A623] bg-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1A1A1A]/70 mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-black/15 rounded-xl px-4 py-3 text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#F5A623] bg-white"
            />
          </div>

          {error && (
            <p className="text-sm text-[#C0392B] bg-[#C0392B]/10 rounded-lg px-3 py-2">{error}</p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>
      </div>
    </div>
  )
}
