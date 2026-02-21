import React, { useState, useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const Login = () => {
    const [currentState, setCurrentState] = useState('Login')
    const { user, setUser, navigate } = useAppContext()

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        // Simulated Login/Signup logic
        if (currentState === 'Sign Up') {
            if (!name || !email || !password) {
                alert("Please fill all fields")
                return
            }
            setUser({ name, email })
            alert("Account created successfully!")
        } else {
            if (!email || !password) {
                alert("Please fill all fields")
                return
            }
            setUser({ name: "Demo User", email })
            alert("Logged in successfully!")
        }
    }

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user])

    return (
        <div className='flex flex-col items-center w-[90%] sm:max-w-md m-auto mt-14 gap-4 text-gray-800 bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-100'>
            <div className='inline-flex items-center gap-2 mb-2 mt-2'>
                <p className='text-3xl font-black uppercase tracking-tight'>{currentState}</p>
                <hr className='border-none h-[2px] w-8 bg-primary rounded-full' />
            </div>

            <form onSubmit={onSubmitHandler} className='w-full flex flex-col gap-4'>
                {currentState === 'Login' ? '' : (
                    <div className='flex flex-col gap-1'>
                        <label className='text-xs font-bold text-gray-500 ml-1'>Full Name</label>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            type="text"
                            className='w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all'
                            placeholder='Enter your name'
                            required
                        />
                    </div>
                )}

                <div className='flex flex-col gap-1'>
                    <label className='text-xs font-bold text-gray-500 ml-1'>Email Address</label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email"
                        className='w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all'
                        placeholder='Enter your email'
                        required
                    />
                </div>

                <div className='flex flex-col gap-1'>
                    <label className='text-xs font-bold text-gray-500 ml-1'>Password</label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password"
                        className='w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all'
                        placeholder='Enter password'
                        required
                    />
                </div>

                <div className='w-full flex justify-between text-xs font-medium text-gray-500 mt-[-8px] px-1'>
                    <p className='cursor-pointer hover:text-primary transition-colors'>Forgot password?</p>
                    {
                        currentState === 'Login'
                            ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer hover:text-primary transition-colors'>Create account</p>
                            : <p onClick={() => setCurrentState('Login')} className='cursor-pointer hover:text-primary transition-colors'>Login Here</p>
                    }
                </div>

                <button className='bg-primary text-white font-black px-8 py-3 mt-4 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-dull active:scale-95 transition-all uppercase tracking-widest'>
                    {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
                </button>

                <div className='relative flex py-3 items-center'>
                    <div className='flex-grow border-t border-gray-200'></div>
                    <span className='flex-shrink mx-4 text-xs text-gray-400 font-bold uppercase'>OR</span>
                    <div className='flex-grow border-t border-gray-200'></div>
                </div>

                <div className='flex gap-4'>
                    <button type="button" className='flex-1 flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all active:scale-95'>
                        <img src="https://www.google.com/favicon.ico" className='w-4 h-4' alt="" />
                        <span className='text-xs font-bold'>Google</span>
                    </button>
                    <button type="button" className='flex-1 flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all active:scale-95'>
                        <span className='text-xs font-bold'>Facebook</span>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Login
