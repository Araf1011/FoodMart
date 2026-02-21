import React from "react"
import { assets } from "../assets/assets"
import { Link } from "react-router-dom"
const MainBanner = () => {
    return (
        <div className="relative rounded-2xl overflow-hidden bg-gray-100 group cursor-pointer transition-all duration-500 shadow-sm hover:shadow-md">
            <img
                src={assets.main_banner_bg}
                alt="Main Banner"
                className='w-full hidden md:block h-[450px] lg:h-[550px] object-cover transition-transform duration-700 group-hover:scale-105' />
            <img
                src={assets.main_banner_bg_sm}
                alt="Main Banner"
                className='w-full md:hidden h-[350px] object-cover transition-transform duration-700 group-hover:scale-105' />
            <div className="absolute inset-0 flex flex-col justify-end md:justify-center items-center md:items-start text-center md:text-left p-8 md:p-12 lg:p-20 bg-gradient-to-t md:bg-gradient-to-r from-black/50 to-transparent">
                <div className="max-w-[500px]">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                        Order your favorite food items
                    </h1>
                    <p className="text-sm md:text-base lg:text-lg text-white/90 mb-8 line-clamp-3 md:line-clamp-none">
                        Explore a wide range of food items from top restaurants and get them delivered to your doorstep.
                    </p>
                    <Link to="/products" className="cursor-pointer px-10 py-3 bg-primary hover:bg-primary-dull transition-all duration-300 text-white rounded-full font-medium shadow-lg hover:shadow-primary/30">
                        Order Now
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default MainBanner