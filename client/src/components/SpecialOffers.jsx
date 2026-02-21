import React from "react"
import { assets } from "../assets/assets"
import { Link } from "react-router-dom"

const SpecialOffers = () => {
    return (
        <div className="flex flex-col gap-6 py-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 text-center md:text-left">Special Offers</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Offer 1 */}
                <div className="relative h-48 rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-all duration-500">
                    <img
                        src={assets.bottom_banner_image}
                        alt="Offer 1"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center px-8 text-white">
                        <span className="bg-red-500 text-[10px] w-fit px-2 py-1 rounded-full font-bold mb-2 uppercase tracking-wider">
                            Limited Time
                        </span>
                        <h3 className="text-2xl font-bold mb-1">Mega Sale up to 50% Off</h3>
                        <p className="text-sm text-white/80 mb-4">On selected grocery items</p>
                        <Link to="/products" className="bg-white text-gray-900 w-fit px-5 py-2 rounded-full text-xs font-bold hover:bg-gray-100 transition-colors">
                            Shop Now
                        </Link>
                    </div>
                </div>

                {/* Offer 2 */}
                <div className="relative h-48 rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-all duration-500">
                    <img
                        src={assets.bottom_banner_image_sm}
                        alt="Offer 2"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent flex flex-col justify-center px-8 text-white">
                        <span className="bg-white text-primary text-[10px] w-fit px-2 py-1 rounded-full font-bold mb-2 uppercase tracking-wider">
                            New Arrival
                        </span>
                        <h3 className="text-2xl font-bold mb-1">Buy 1 Get 1 Free</h3>
                        <p className="text-sm text-white/80 mb-4">On all organic fresh fruits</p>
                        <Link to="/products" className="bg-white text-primary w-fit px-5 py-2 rounded-full text-xs font-bold hover:bg-gray-50 transition-colors">
                            Grab Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpecialOffers
