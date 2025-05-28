"use client";
import { useState, useEffect } from 'react';
import { Inter } from 'next/font/google'
import { Eye, EyeOff } from 'lucide-react';



const inter = Inter({
  subsets: ['latin'],
  weight: '500',
})


export default function RegisterForm({ onSwitchToLogin }) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [user, setUser] = useState('');
    const [showErrorPassword, setShowErrorPassword] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    
    useEffect(() => {
      const allFieldsFilled = user && email && password && confirmPassword;
      const validPassword = password === confirmPassword && password.length >= 8;
      const validUser = user.length >= 5;
      const emailRegex = new RegExp(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      const validEmail = emailRegex.test(email);
      const isFormValid = allFieldsFilled && validPassword && validUser && validEmail;
      setButtonDisabled(!isFormValid);

      setShowErrorPassword(!validPassword);
  
    }, [password, confirmPassword, email , user]);

    const handleSubmit = (event)=>{
      event.preventDefault();

      const formData = new FormData(event.target);

      const dataForms = Object.fromEntries(formData.entries());

      delete dataForms.confirmPassword;

      const resultJson = JSON.stringify(dataForms);
    }
  return (
    <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="user" className={`block text-sm/6 font-medium ${inter.className} text-left text-slate-200`}>
                    Usuário
                  </label>
                  <div className='mt-2'>
                    <input 
                    type="text" 
                    name="user"
                    minLength={"5"}
                    id="user" 
                    autoComplete="user"
                    placeholder='Usuário'
                    onChange={(e) => setUser(e.target.value)}
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
                      minLength={"8"}
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
                    >{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <label
                      htmlFor="password"
                      className={`block text-sm/6 ${inter.className} font-medium text-slate-200 text-left mt-1`}
                    >
                      Confirme a Senha
                    </label>  
                  <div className="mt-2 relative">
                    <input
                      id="confirmPassword"
                      minLength={"8"}
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
                    >{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <label htmlFor="" className="block text-left text-xs text-red-500">
                        {showErrorPassword ? (
                            'As senhas não coincidem.'
                            ) : ('')}
                    </label>
                </div>

                <div className='flex justify-between'>
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
  );
}