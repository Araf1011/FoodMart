import React from "react"
import { useAppContext } from "../context/AppContext"
import ProductCard from "./ProductCard"
import { Link } from "react-router-dom"

const FeaturedProducts = () => {
    const { products } = useAppContext();
    // Show first 8 products as featured
    const featured = products.slice(0, 8);

    return (
        <div className="flex flex-col gap-6 py-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800">Featured Products</h2>
                    <p className="text-sm text-gray-500">Handpicked items for you</p>
                </div>
                <Link to="/products" className="text-sm font-medium text-primary hover:underline">View All</Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {featured.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    )
}

export default FeaturedProducts
