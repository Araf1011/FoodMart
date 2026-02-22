
import React from 'react'

const Navbar = ({ setToken }) => {
    return (
        <div className='flex items-center py-4 px-[4%] justify-between bg-white shadow-sm sticky top-0 z-50'>
            <div className='flex flex-col'>
                <h1 className='text-2xl font-black text-gray-900 tracking-tighter'>FOOD<span className='text-primary'>MART</span></h1>
                <p className='text-[10px] font-black text-white bg-gray-900 px-2 py-0.5 rounded-full uppercase tracking-widest mt-[-2px] text-center'>Admin Panel</p>
            </div>
            <button onClick={() => setToken('')} className='bg-primary text-white px-7 py-2.5 rounded-xl font-bold text-sm hover:bg-primary-dull transition-all active:scale-95 shadow-lg shadow-primary/20 uppercase tracking-widest'>Logout</button>
        </div>
    )
}

export default Navbar
