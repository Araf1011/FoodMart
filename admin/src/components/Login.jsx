import axios from 'axios'
import React, { useState } from 'react'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Login = ({ setToken }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl + '/api/user/admin', { email, password })
            if (response.data.success) {
                setToken(response.data.token)
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center w-full bg-slate-50'>
            <div className='bg-white shadow-2xl shadow-slate-200 rounded-3xl px-10 py-12 max-w-md w-full border border-gray-100'>
                <div className='text-center mb-10'>
                    <h1 className='text-3xl font-black text-gray-900 tracking-tighter'>FOOD<span className='text-primary'>MART</span></h1>
                    <p className='text-xs font-bold text-gray-400 uppercase tracking-widest mt-1'>Admin Console Login</p>
                </div>
                <form onSubmit={onSubmitHandler}>
                    <div className='mb-6'>
                        <label className='text-xs font-black text-gray-500 uppercase tracking-widest mb-2 block ml-1'>Email Address</label>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} className='w-full px-5 py-4 border border-gray-200 rounded-2xl outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-sm font-medium' type="email" placeholder='admin@foodmart.com' required />
                    </div>
                    <div className='mb-8'>
                        <label className='text-xs font-black text-gray-500 uppercase tracking-widest mb-2 block ml-1'>Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} className='w-full px-5 py-4 border border-gray-200 rounded-2xl outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-sm font-medium' type="password" placeholder='••••••••' required />
                    </div>
                    <button className='w-full py-4 bg-gray-900 text-white font-black rounded-2xl hover:bg-black transition-all active:scale-[0.98] shadow-xl shadow-gray-200 uppercase tracking-[0.2em] text-sm' type="submit"> Secure Login </button>
                </form>
            </div>
        </div>
    )
}

export default Login
