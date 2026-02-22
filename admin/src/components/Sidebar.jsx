import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className='w-[18%] min-h-screen border-r bg-white sticky top-[73px]'>
            <div className='flex flex-col gap-2 pt-8 pr-4'>
                <NavLink
                    className={({ isActive }) => `flex items-center gap-3 px-6 py-4 rounded-r-3xl transition-all duration-300 font-bold text-sm uppercase tracking-wider ${isActive ? 'bg-primary/10 text-primary border-r-8 border-primary' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
                    to="/add"
                >
                    <span className='text-xl'>✨</span>
                    <p className='hidden md:block'>Add Items</p>
                </NavLink>

                <NavLink
                    className={({ isActive }) => `flex items-center gap-3 px-6 py-4 rounded-r-3xl transition-all duration-300 font-bold text-sm uppercase tracking-wider ${isActive ? 'bg-primary/10 text-primary border-r-8 border-primary' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
                    to="/list"
                >
                    <span className='text-xl'>📂</span>
                    <p className='hidden md:block'>Inventory</p>
                </NavLink>

                <NavLink
                    className={({ isActive }) => `flex items-center gap-3 px-6 py-4 rounded-r-3xl transition-all duration-300 font-bold text-sm uppercase tracking-wider ${isActive ? 'bg-primary/10 text-primary border-r-8 border-primary' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
                    to="/orders"
                >
                    <span className='text-xl'>🛒</span>
                    <p className='hidden md:block'>Orders</p>
                </NavLink>
            </div>
        </div>
    )
}

export default Sidebar
