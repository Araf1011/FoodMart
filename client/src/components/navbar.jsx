import React from "react"
import { NavLink } from "react-router-dom"
import { assets } from "../assets/assets"
import { useAppContext } from "../context/AppContext"

const Navbar = () => {
    const [open, setOpen] = React.useState(false)
    const { user, setUser, setShowUserLogin, navigate, getCartCount } = useAppContext()
    const logout = () => {
        setUser(null)
        navigate('/login')
    }
    return (
        <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white sticky top-0 z-50 transition-all">

            <NavLink to="/" onClick={() => setOpen(false)}>
                <img className="w-44" src={assets.logo} alt="Logo" />
            </NavLink>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/products">All Products</NavLink>
                <NavLink to="/contact">Contact</NavLink>

                <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
                    <input className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
                    <img src={assets.search_icon} alt="Search" />
                </div>

                <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
                    <img src={assets.nav_cart_icon} alt="Cart" className="w-6 h-6" />
                    <p className="absolute -top-2 -right-3 text-[10px] text-white bg-primary w-[18px] h-[18px] flex items-center justify-center rounded-full leading-none">{getCartCount()}</p>
                </div>

                {!user ?
                    (<button onClick={() => navigate('/login')} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full">
                        Login
                    </button>)
                    :
                    (
                        <div className='relative group'>
                            <img src={assets.profile_icon} className='w-8 h-8 rounded-full' alt="" />
                            <ul className='hidden group-hover:block absolute top-7 right-0 bg-white shadow border border-gray-200 py-2 rounded-md text-sm z-40 min-w-32'>
                                <li onClick={() => navigate('/myorders')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">My Orders</li>
                                <li onClick={logout} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logout</li>
                            </ul>
                        </div>
                    )}
            </div>

            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                {/* Menu Icon SVG */}
                <img src={assets.menu_icon} alt="Menu" className="w-6 h-6" />
            </button>

            {/* Mobile Menu */}
            {open && (
                <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
                    <NavLink onClick={() => setOpen(false)} to="/" className="block">Home</NavLink>
                    <NavLink onClick={() => setOpen(false)} to="/products" className="block">All Products</NavLink>
                    {user && (
                        <NavLink onClick={() => setOpen(false)} to="myorders" className="block">My Orders</NavLink>
                    )}
                    <NavLink onClick={() => setOpen(false)} to="/contact" className="hover:text-primary transition-colors block">Contact</NavLink>
                    {!user ? (
                        <button onClick={() => {
                            setOpen(false)
                            navigate('/login');
                        }}
                            className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                            Login
                        </button>
                    ) : (
                        <button onClick={logout} className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
                            Logout
                        </button>
                    )}
                </div>
            )}

        </nav>
    )
}
export default Navbar
