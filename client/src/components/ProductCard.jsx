import React from "react"
import { assets } from "../assets/assets"
import { Link } from "react-router-dom"
import { useAppContext } from "../context/AppContext"

const ProductCard = ({ product }) => {
    const { addToCart, removeFromCart, cartItems } = useAppContext()

    return (
        <div className="flex flex-col gap-3 bg-white border border-gray-200 p-4 rounded-2xl hover:shadow-lg transition-all duration-300 group relative">
            <Link to={`/product/${product._id}`} className="block">
                <div className="relative overflow-hidden rounded-xl bg-gray-50 aspect-square flex items-center justify-center">
                    <img
                        src={product.image[0]}
                        alt={product.name}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                    {product.offerPrice < product.price && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                            {Math.round(((product.price - product.offerPrice) / product.price) * 100)}% OFF
                        </span>
                    )}
                </div>
            </Link>
            <div className="flex flex-col gap-1">
                <p className="text-xs text-gray-500 font-medium">{product.category}</p>
                <Link to={`/product/${product._id}`}>
                    <h3 className="text-sm md:text-base font-bold text-gray-800 line-clamp-1 group-hover:text-primary transition-colors">
                        {product.name}
                    </h3>
                </Link>
                <div className="flex items-center justify-between mt-1 h-8">
                    <div className="flex items-center gap-2">
                        <p className="text-base font-bold text-primary">৳{product.offerPrice}</p>
                        {product.offerPrice < product.price && (
                            <p className="text-xs text-gray-400 line-through">৳{product.price}</p>
                        )}
                    </div>

                    {cartItems[product._id] ? (
                        <div className="flex items-center gap-3 bg-white border border-primary rounded-full px-2 py-1 shadow-sm">
                            <button
                                onClick={() => removeFromCart(product._id)}
                                className="w-6 h-6 flex items-center justify-center cursor-pointer bg-gray-100 hover:bg-primary hover:text-white rounded-full transition-all group/btn"
                            >
                                <img src={assets.remove_icon} alt="Minus" className="w-2.5 h-2.5 group-hover/btn:invert" />
                            </button>
                            <span className="text-sm font-bold text-gray-800 min-w-[12px] text-center">{cartItems[product._id]}</span>
                            <button
                                onClick={() => addToCart(product._id)}
                                className="w-6 h-6 flex items-center justify-center cursor-pointer bg-primary text-white rounded-full hover:bg-primary-dull transition-all"
                            >
                                <img src={assets.add_icon} alt="Plus" className="w-2.5 h-2.5 invert" />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => addToCart(product._id)}
                            className="px-4 py-1.5 cursor-pointer bg-primary/10 text-primary text-xs font-bold rounded-full hover:bg-primary hover:text-white transition-all shadow-sm active:scale-90"
                        >
                            Add to Cart
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductCard
