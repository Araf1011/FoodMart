import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { dummyProducts, assets } from '../assets/assets'
import ProductCard from '../components/ProductCard'

const Product = () => {
    const { productId } = useParams()
    const { addToCart, removeFromCart, cartItems, navigate } = useAppContext()
    const [productData, setProductData] = useState(null)
    const [mainImage, setMainImage] = useState('')
    const [relatedProducts, setRelatedProducts] = useState([])

    useEffect(() => {
        const product = dummyProducts.find(p => p._id === productId)
        if (product) {
            setProductData(product)
            setMainImage(product.image[0])

            // Filter related products by category
            const related = dummyProducts.filter(p => p.category === product.category && p._id !== productId).slice(0, 4)
            setRelatedProducts(related)

            // Scroll to top when product changes
            window.scrollTo(0, 0)
        }
    }, [productId])

    if (!productData) return <div className="min-h-[60vh] flex items-center justify-center">Loading product...</div>

    return (
        <div className="py-10 flex flex-col gap-12">
            {/* Product Details Section */}
            <div className="flex flex-col lg:flex-row gap-12">

                {/* Product Images */}
                <div className="flex-1 flex flex-col-reverse md:flex-row gap-4">
                    {/* Thumbnails */}
                    <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto scrollbar-hide md:w-24">
                        {productData.image.map((img, index) => (
                            <img
                                onClick={() => setMainImage(img)}
                                key={index}
                                src={img}
                                alt={`Thumbnail ${index}`}
                                className={`w-20 h-20 md:w-full aspect-square object-contain p-2 rounded-xl border-2 cursor-pointer bg-gray-50 transition-all ${mainImage === img ? 'border-primary' : 'border-transparent hover:border-gray-200'}`}
                            />
                        ))}
                    </div>
                    {/* Main Image */}
                    <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center p-8 relative overflow-hidden group">
                        <img
                            src={mainImage}
                            alt={productData.name}
                            className="max-h-[400px] w-auto object-contain transition-transform duration-500 group-hover:scale-110"
                        />
                        {productData.offerPrice < productData.price && (
                            <span className="absolute top-4 left-4 bg-red-500 text-white font-bold px-3 py-1 rounded-full text-sm">
                                {Math.round(((productData.price - productData.offerPrice) / productData.price) * 100)}% OFF
                            </span>
                        )}
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col gap-8">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                            <p className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-widest">{productData.category}</p>
                            <div className="flex items-center gap-1 bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-bold">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                IN STOCK
                            </div>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-gray-800 leading-tight">{productData.name}</h1>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map(star => (
                                    <img key={star} src={star <= 4 ? assets.star_icon : assets.star_dull_icon} className="w-4 h-4" />
                                ))}
                            </div>
                            <p className="text-sm text-gray-500 font-medium">4.8 (120 Verified Reviews)</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-5">
                        <p className="text-4xl font-black text-primary">৳{productData.offerPrice}</p>
                        {productData.offerPrice < productData.price && (
                            <div className="flex flex-col">
                                <p className="text-lg text-gray-400 line-through font-medium">৳{productData.price}</p>
                                <p className="text-xs text-red-500 font-bold">Save ৳{productData.price - productData.offerPrice}</p>
                            </div>
                        )}
                    </div>

                    <p className="text-gray-600 leading-relaxed text-lg">
                        Premium quality {productData.name} sourced directly from verified farms. Freshly packed and delivered to your doorstep within 24 hours to ensure maximum nutrition and taste.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                        {productData.description.map((point, index) => (
                            <div key={index} className="flex items-center gap-3 text-sm text-gray-700 font-medium">
                                <div className="p-1 bg-primary/20 rounded-full">
                                    <img src={assets.add_icon} className="w-2.5 h-2.5 text-primary" />
                                </div>
                                {point}
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 mt-2">
                        {cartItems[productId] ? (
                            <div className="flex items-center gap-8 bg-white border-2 border-primary rounded-2xl p-2 px-8 shadow-md">
                                <button
                                    onClick={() => removeFromCart(productId)}
                                    className="w-10 h-10 bg-gray-100 hover:bg-primary hover:text-white rounded-full flex items-center justify-center cursor-pointer transition-all"
                                >
                                    <img src={assets.remove_icon} alt="Minus" className="w-4 h-4" />
                                </button>
                                <span className="text-2xl font-black text-gray-800 w-10 text-center">{cartItems[productId]}</span>
                                <button
                                    onClick={() => addToCart(productId)}
                                    className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-primary-dull transition-all shadow-lg"
                                >
                                    <img src={assets.add_icon} alt="Plus" className="w-4 h-4 invert" />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => addToCart(productId)}
                                className="flex-1 md:flex-none px-16 py-5 bg-primary text-white font-black rounded-2xl hover:bg-primary-dull transition-all shadow-xl hover:shadow-primary/30 active:scale-95 text-lg"
                            >
                                ADD TO CART
                            </button>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-6 border-t border-gray-100 pt-8">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-blue-50 flex items-center justify-center rounded-xl">
                                <img src={assets.delivery_truck_icon} className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-800">Express Delivery</p>
                                <p className="text-[10px] text-gray-500">Ships in 24 hours</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-green-50 flex items-center justify-center rounded-xl">
                                <img src={assets.trust_icon} className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-800">Quality Assured</p>
                                <p className="text-[10px] text-gray-500">100% Organic items</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Mobile Add to Cart Bar */}
            <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 px-6 flex items-center justify-between z-40 lg:hidden shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
                <div className="flex flex-col">
                    <p className="text-xs text-gray-500 font-bold uppercase">Price</p>
                    <p className="text-xl font-black text-primary">৳{productData.offerPrice}</p>
                </div>
                {cartItems[productId] ? (
                    <div className="flex items-center gap-4 bg-gray-100 rounded-full px-2 py-1">
                        <button onClick={() => removeFromCart(productId)} className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                            <img src={assets.remove_icon} className="w-3 h-3" />
                        </button>
                        <span className="font-black text-gray-800">{cartItems[productId]}</span>
                        <button onClick={() => addToCart(productId)} className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-sm">
                            <img src={assets.add_icon} className="w-3 h-3 invert" />
                        </button>
                    </div>
                ) : (
                    <button onClick={() => addToCart(productId)} className="bg-primary text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-primary/20">
                        ADD TO CART
                    </button>
                )}
            </div>

            {/* Description/Reviews Tabs (Placeholder) */}
            <div className="flex flex-col gap-6">
                <div className="flex gap-8 border-b border-gray-100">
                    <p className="pb-4 border-b-2 border-primary font-bold text-gray-800 cursor-pointer">Description</p>
                    <p className="pb-4 text-gray-400 font-medium cursor-pointer hover:text-gray-600 transition-all">Reviews (120)</p>
                </div>
                <div className="text-gray-600 leading-relaxed flex flex-col gap-4 py-4">
                    <p>
                        Our {productData.name} is carefully selected from the best farms to ensure you receive the freshest produce possible. We believe in providing quality that you can taste in every bite. Whether you are cooking for your family or hosting a dinner party, our products provide the perfect foundation for delicious meals.
                    </p>
                    <p>
                        Sustainability and freshness are at the heart of our mission. Every item is handled with professional care from the moment it leaves the source until it reaches your doorstep.
                    </p>
                </div>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <div className="flex flex-col gap-8 py-10 border-t border-gray-100 mt-10">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-800">Related Products</h2>
                        <Link to="/products" className="text-primary font-bold hover:underline">View All</Link>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {relatedProducts.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Product
