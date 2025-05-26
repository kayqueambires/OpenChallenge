import Head from 'next/head';
import AnimatedBackground from '@/components/AnimatedBackground';
import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';
import { useState } from 'react';
import { Titillium_Web, Titillium_Web } from 'next/font/google'
import { Inter } from 'next/font/google'

const titillium_Web = Titillium_Web({
  subsets: ['latin'],
  weight: '600',
})
const inter = Inter({
  subsets: ['latin'],
  weight: '600',
})

export default function Home() {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const handleSwitchToRegister = () => {
    setShowLoginForm(false);
  };

  const handleSwitchToLogin = () => {
    setShowLoginForm(true);
  };
  return (
    <div className="min-h-screen  flex items-center justify-center">
      <Head>
        <title>OpenChallenge - Home</title>
        <meta name="description" content="Página inicial do OpenChallenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AnimatedBackground />
      <main >
        <div id='initialPage' className='text-center p-8 shadow-lg rounded-lg bg-gray-800 relative z-10 flex flex-col '> 
          <h1 className={`text-5xl text-indigo-700 mb-4 ${titillium_Web.className}`}>
            Bem-vindo ao OpenChallenge!
          </h1>
          <p className={`text-lg text-slate-200 mb-6 ${inter.className}`}>
            Sua plataforma para desafios de programação e gamificação.
          </p>
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <img
                alt="Your Company"
                src="/images/Logo.png"
                className="mx-auto h-35 w-auto"
              />
              <h2 className={`mt-4 text-center text-2xl/9 ${inter.className} font-mono tracking-tight text-slate-200`}>
                {showLoginForm ? (
                  'Entre na sua Conta'
                ) : ('Cadastre-se')}
              </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                {showLoginForm ? (
                  <LoginForm onSwitchToRegister={handleSwitchToRegister} />
                      ) : (
                  <RegisterForm onSwitchToLogin={handleSwitchToLogin} />
                 )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
