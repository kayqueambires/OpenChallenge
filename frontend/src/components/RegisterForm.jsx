'use client'
import { useState, useEffect } from 'react'
import { Inter } from 'next/font/google'
import { Eye, EyeOff } from 'lucide-react'

const inter = Inter({
  subsets: ['latin'],
  weight: '500',
})

export default function RegisterForm({ onSwitchToLogin }) {
  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showErrorPassword, setShowErrorPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showErrorConfirmPassword, setShowErrorConfirmPassword] =
    useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [buttonDisabled, setButtonDisabled] = useState(true)

  useEffect(() => {
    const allFieldsFilled = user && email && password && confirmPassword
    // Password checks
    const regexPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,14}$/
    const validPassword = regexPassword.test(password)
    const errorMessagePassword = password !== confirmPassword
    setShowErrorPassword(!validPassword)
    setShowErrorConfirmPassword(errorMessagePassword)

    const validUser = user.length >= 5 && user.length <= 18
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const validEmail = emailRegex.test(email)
    const isFormValid =
      allFieldsFilled &&
      validPassword &&
      validUser &&
      validEmail &&
      !errorMessagePassword
    setButtonDisabled(!isFormValid)
  }, [password, confirmPassword, email, user])
  // Fetch para o register
  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const dataForms = Object.fromEntries(formData.entries())

    delete dataForms.confirmPassword

    try {
      const response = await fetch('http://localhost:3001/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: dataForms.user,
          email: dataForms.email,
          password: dataForms.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        alert(`Erro: ${data.message}`)
        return
      }

      alert(data.message)
      onSwitchToLogin()
    } catch (error) {
      console.error('Erro ao registrar:', error)
      alert('Erro ao conectar com o servidor.')
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
          htmlFor="user"
          className={`block text-sm/6 font-medium ${inter.className} text-left text-slate-200`}
        >
          Usuário
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="user"
            minLength={'5'}
            maxLength={'18'}
            id="user"
            autoComplete="user"
            placeholder="Usuário"
            onChange={(e) => setUser(e.target.value.trim())}
            required
            className={`block  w-full rounded-md ${inter.className} bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="email"
          className={`block text-sm/6 font-medium ${inter.className} text-left text-slate-200`}
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
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className={`block required w-full rounded-md ${inter.className} bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6`}
          />
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm/6 font-medium text-slate-200"
          >
            Senha
          </label>
        </div>
        <div className="mt-2 relative">
          <input
            id="password"
            minLength={'8'}
            maxLength={'14'}
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        <label htmlFor="" className="block text-left text-xs text-red-500">
          {showErrorPassword
            ? `A senha deve conter no mínimo 8 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula, um caractere especial e um número. `
            : ''}
        </label>
        <label
          htmlFor="password"
          className={`block text-sm/6 ${inter.className} font-medium text-slate-200 text-left mt-1`}
        >
          Confirme a Senha
        </label>
        <div className="mt-2 relative">
          <input
            id="confirmPassword"
            minLength={'8'}
            maxLength={'14'}
            name="confirmPassword"
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirme a senha"
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
        <label htmlFor="" className="block text-left text-xs text-red-500">
          {showErrorConfirmPassword ? 'As senhas não coincidem.' : ''}
        </label>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="  basis-45 rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-slate-100 shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
        >
          Voltar
        </button>
        <button
          type="submit"
          disabled={buttonDisabled}
          className="  basis-45 rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-slate-100 shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400 disabled:cursor-not-allowed"
        >
          Cadastrar
        </button>
      </div>
    </form>
  )
}
