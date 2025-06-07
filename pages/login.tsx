import React, { useState } from 'react'
import type { NextPageWithLayout } from "./_app";
import { ReactElement } from "react";

const Login : NextPageWithLayout = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Email:', email)
    console.log('Password:', password)
    // burada istek gönderilebilir
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-6 border border-neutral-200 rounded-lg"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-primary">Giriş Yap</h2>

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
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary cursor-pointer text-white py-2 rounded-md hover:opacity-80 transition-all"
        >
          Giriş Yap
        </button>
      </form>
    </div>
  )
}

Login.getLayout = function PageLayout(page: ReactElement) {
  return page;
};

export default Login;
