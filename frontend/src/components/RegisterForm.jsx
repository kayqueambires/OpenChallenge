// components/RegisterForm.js


export default function RegisterForm({ onSwitchToLogin }) {

  return (
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
                      Senha 
                    </label>    
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

                <div className='flex justify-between'>
                  <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="  basis-45 rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-slate-100 shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"             
                  >
                    Voltar
                  </button>
                  <button
                    type="submit"
                    className="  basis-45 rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-slate-100 shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Cadastrar
                  </button>
                </div>
              </form>
  );
}