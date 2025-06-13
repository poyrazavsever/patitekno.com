import React, { useState } from 'react'
import type { NextPageWithLayout } from "./_app";
import { ReactElement } from "react";
import { supabase } from '@/utils/supabaseClient';
import { useRouter } from 'next/router'
import toast from 'react-hot-toast';

const Login: NextPageWithLayout = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        if (error.message === 'Invalid login credentials') {
          throw new Error('E-posta veya şifre hatalı')
        }
        throw error
      }

      // Başarılı giriş
      router.push('/admin')
      toast.success('Giriş başarılı!')
    } catch (error: any) {
      toast.error(error.message)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 border border-neutral-200 rounded-lg"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-primary">Giriş Yap</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-xs">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
            E-posta
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring focus:border-primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">
            Şifre
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring focus:border-primary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary cursor-pointer text-white py-2 rounded-md hover:opacity-80 transition-all disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
        </button>
      </form>
    </div>
  )
}

Login.getLayout = function PageLayout(page: ReactElement) {
  return page;
};

export default Login;
