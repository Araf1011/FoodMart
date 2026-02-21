import React from "react"
import { categories } from "../assets/assets"
import { Link } from "react-router-dom"

const CategoryList = () => {
    return (
        <div className="flex flex-col items-center gap-6 py-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Shop by Category</h2>
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                {categories.map((item, index) => (
                    <Link
                        to={`/products/${item.path}`}
                        key={index}
                        className="flex flex-col items-center gap-3 group"
                    >
                        <div
                            style={{ backgroundColor: item.bgColor }}
                            className="w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm"
                        >
                            <img
                                src={item.image}
                                alt={item.text}
                                className="w-16 h-16 md:w-20 md:h-20 object-contain"
                            />
                        </div>
                        <p className="text-sm md:text-base font-medium text-gray-700 group-hover:text-primary transition-colors">
                            {item.text}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default CategoryList
