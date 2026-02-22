import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { categories } from '../assets/assets'
import ProductCard from '../components/ProductCard'

const Products = () => {
    const { category } = useParams()
    const { products } = useAppContext()
    const [filteredProducts, setFilteredProducts] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(category || 'All')
    const [priceRange, setPriceRange] = useState(1000) // Default max price

    useEffect(() => {
        let filtered = [...products];

        // Apply Category Filter
        if (selectedCategory !== 'All') {
            filtered = filtered.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase())
        }

        // Apply Price Range Filter
        filtered = filtered.filter(p => p.offerPrice <= priceRange)

        setFilteredProducts(filtered)
    }, [selectedCategory, priceRange, products])

    useEffect(() => {
        if (category) {
            setSelectedCategory(category)
        } else {
            setSelectedCategory('All')
        }
    }, [category])

    return (
        <div className="py-10 flex flex-col gap-10">
            {/* Header / Breadcrumb */}
            <div className='flex flex-col gap-2'>
                <h1 className='text-3xl font-black text-gray-800 uppercase tracking-tight'>
                    {selectedCategory} <span className='text-primary'>Products</span>
                </h1>
                <p className='text-gray-500'>Showing {filteredProducts.length} items</p>
            </div>

            <div className='flex flex-col md:flex-row gap-10'>
                {/* Sidebar Filter */}
                <div className='md:w-64 flex flex-col gap-6'>
                    <div className='bg-white border border-gray-200 p-6 rounded-2xl shadow-sm'>
                        <h2 className='text-lg font-bold text-gray-800 mb-4'>Categories</h2>
                        <div className='flex flex-wrap md:flex-col gap-2'>
                            <button
                                onClick={() => setSelectedCategory('All')}
                                className={`px-4 py-2 rounded-xl text-left text-sm font-medium transition-all ${selectedCategory === 'All' ? 'bg-primary text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                            >
                                All Products
                            </button>
                            {categories.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedCategory(item.path)}
                                    className={`px-4 py-2 rounded-xl text-left text-sm font-medium transition-all ${selectedCategory.toLowerCase() === item.path.toLowerCase() ? 'bg-primary text-white shadow-md' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                                >
                                    {item.text}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Price Filter */}
                    <div className='bg-white border border-gray-200 p-6 rounded-2xl shadow-sm'>
                        <h2 className='text-lg font-bold text-gray-800 mb-2'>Price Range</h2>
                        <p className='text-primary font-bold mb-4'>Max Price: ৳{priceRange}</p>
                        <div className='flex flex-col gap-4'>
                            <input
                                type="range"
                                min="0"
                                max="1000"
                                value={priceRange}
                                onChange={(e) => setPriceRange(Number(e.target.value))}
                                className='accent-primary cursor-pointer w-full'
                            />
                            <div className='flex justify-between text-xs text-gray-500 font-medium'>
                                <span>৳0</span>
                                <span>৳1000</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                <div className='flex-1'>
                    {filteredProducts.length > 0 ? (
                        <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                            {filteredProducts.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className='flex flex-col items-center justify-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300'>
                            <p className='text-gray-500 font-bold'>No products found in this category.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Products
