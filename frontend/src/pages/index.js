import Head from 'next/head';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Head>
        <title>OpenChallenge - Home</title>
        <meta name="description" content="Página inicial do OpenChallenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-center p-8 shadow-lg rounded-lg bg-gray-800 relative z-10 flex flex-col ">
        <h1 className="text-5xl font-extrabold text-indigo-700 mb-4">
          Bem-vindo ao OpenChallenge!
        </h1>
        <p className="text-lg text-slate-200 mb-6">
          Sua plataforma para desafios de programação e gamificação.
        </p>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl/9  font-mono tracking-tight text-slate-200">
              Entre na sua conta
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="#" method="POST" className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium  text-left text-slate-200"
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
                    className="block text-sm/6 font-medium text-slate-200"
                  >
                    Entre
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500"
                    >
                      Esqueceu a senha?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Senha"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full  justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-slate-100 shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Entrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
