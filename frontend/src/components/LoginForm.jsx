'use client'
import { Inter } from 'next/font/google'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

const inter = Inter({
  subsets: ['latin'],
  weight: '400',
})
export default function LoginForm({
  onSwitchToRegister,
  onSwitchToForgotPassword,
}) {
  const [showPassword, setShowPassword] = useState(false)
  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)

    const dataForms = Object.fromEntries(formData.entries())

    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: dataForms.email,
          password: dataForms.password,
        }),
      })
      if (!response.ok) {
        alert(response.status)
        return
      }
      const data = await response.json()
      localStorage.setItem('token', data.token)
      alert(data.message)
    } catch (error) {
      alert('Erro no login: ', error)
    }
  }
  return (
    <form
      action="#"
      method="POST"
      className="space-y-6"
      onSubmit={handleSubmit}
    >
      <div>
        <label
          htmlFor="email"
          className={`block text-sm/6 ${inter.className} font-medium  text-left text-slate-200`}
        >
          Endereço de Email
        </label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            required
            autoComplete="email"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className={`block text-sm/6 ${inter.className} font-medium text-slate-200`}
          >
            Entre
          </label>
          <div className="text-sm">
            <a
              href="#"
              onClick={onSwitchToForgotPassword}
              className={`font-semibold  text-indigo-600 hover:text-indigo-500`}
            >
              Esqueceu a senha?
            </a>
          </div>
        </div>
        <div className="mt-2 relative">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Senha"
            required
            autoComplete="current-password"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-2  text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <div className="flex justify-between ">
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="  basis-45 rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-slate-100 shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Cadastrar
        </button>
        <button
          type="submit"
          className="  basis-45 rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-slate-100 shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Entrar
        </button>
      </div>
    </form>
  )
}
