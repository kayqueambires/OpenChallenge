'use client'
import { useState } from 'react'

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react'
import { Titillium_Web, Inter } from 'next/font/google'

const titillium_Web = Titillium_Web({
  subsets: ['latin'],
  weight: '600',
})
const inter = Inter({
  subsets: ['latin'],
  weight: '600',
})

export default function ForgotPasswordForm({ open, onClose }) {
  const [email, setEmail] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    const formData = new FormData(event.target)

    const dataForms = Object.fromEntries(formData.entries())

    try {
      const response = await fetch('', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: dataForms.email,
        }),
      })

      const data = response.json()
      if (!response.ok) {
        throw new Error(`Error: ${data.message}`)
      }
    } catch (error) {
      alert(`Error: ${error}`)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="bg-gray-700 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="grid grid-rows-3 justify-center ">
                <div className="">
                  <DialogTitle
                    as="h3"
                    className={` text-4xl ${inter.className} font-semibold text-slate-100 `}
                  >
                    Esqueceu sua senha?
                  </DialogTitle>
                </div>
                <p
                  className={`text-[0.70rem] ${inter.className} text-slate-100 self-center sm:self-start `}
                >
                  Nós lhe enviaremos um e-mail com um link para redefinir sua
                  senha.
                </p>
                <div className="mt-2 self-center sm:mt-6">
                  <form
                    action=""
                    method="post"
                    id="forgotPasswordForm"
                    onSubmit={handleSubmit}
                  >
                    <input
                      id="email"
                      name="email"
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Digite seu email"
                      required
                      autoComplete="email"
                      className="block w-full rounded-4xl  bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </form>
                </div>
              </div>
            </div>
            <div className="bg-gray-800 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="submit"
                form="forgotPasswordForm"
                className="inline-flex w-full justify-center rounded-3xl bg-indigo-700 px-3 py-2 text-xs font-semibold text-white shadow-xs hover:bg-indigo-600 sm:ml-3 sm:w-auto"
              >
                Envie-me um link para redefinir a senha
              </button>
              <button
                type="button"
                data-autofocus
                onClick={onClose}
                className="mt-3 inline-flex w-full justify-center rounded-3xl bg-slate-200 px-3 py-2 text-xs  font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
