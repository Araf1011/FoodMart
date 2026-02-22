import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { dummyProducts, assets } from '../assets/assets'

const Cart = () => {
    const { products, cartItems, addToCart, removeFromCart, updateQuantity, navigate, token } = useAppContext()
    const [cartData, setCartData] = useState([])

    useEffect(() => {
        const tempData = [];
        for (const items in cartItems) {
            if (cartItems[items] > 0) {
                tempData.push({
                    _id: items,
                    quantity: cartItems[items]
                })
            }
        }
        setCartData(tempData);
    }, [cartItems])

    const calculateTotal = () => {
        return cartData.reduce((acc, item) => {
            const product = products.find(p => p._id === item._id)
            return acc + (product ? product.offerPrice * item.quantity : 0)
        }, 0)
    }

    const proceedToCheckout = () => {
        if (token) {
            navigate('/place-order')
        } else {
            navigate('/login')
        }
    }

    return (
        <div className="py-10 flex flex-col gap-10">
            <div className='flex items-center gap-2 text-2xl font-bold text-gray-800'>
                <h1 className='text-gray-500'>YOUR</h1>
                <h1>CART</h1>
            </div>

            <div className='flex flex-col lg:flex-row gap-10'>
                {/* Cart Items List */}
                <div className='flex-1 flex flex-col gap-4'>
                    {cartData.length === 0 ? (
                        <div className='flex flex-col items-center gap-4 py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300'>
                            <img src={assets.nav_cart_icon} alt="Empty Cart" className='w-20 h-20 opacity-20' />
                            <p className='text-gray-400 font-medium'>Your cart is empty</p>
                            <button
                                onClick={() => navigate('/')}
                                className='px-8 py-2 bg-primary text-white rounded-full hover:bg-primary-dull transition-all'
                            >
                                Shop Now
                            </button>
                        </div>
                    ) : (
                        cartData.map((item, index) => {
                            const product = products.find(p => p._id === item._id)
                            if (!product) return null

                            return (
                                <div key={index} className='flex items-center justify-between p-4 bg-white border border-gray-200 rounded-2xl hover:shadow-md transition-all'>
                                    <div className='flex items-center gap-4'>
                                        <img src={product.image[0]} alt={product.name} className='w-20 h-20 rounded-xl bg-gray-50 object-contain p-2' />
                                        <div className='flex flex-col gap-1'>
                                            <h3 className='font-bold text-gray-800'>{product.name}</h3>
                                            <div className='flex items-center gap-2'>
                                                <p className='text-primary font-bold'>৳{product.offerPrice}</p>
                                                <p className='text-xs text-gray-400 line-through'>৳{product.price}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex items-center gap-4'>
                                        <div className='flex items-center gap-3 bg-gray-100 p-1 rounded-lg'>
                                            <button
                                                onClick={() => removeFromCart(item._id)}
                                                className='p-1 hover:bg-white rounded transition-colors shadow-sm'
                                            >
                                                <img src={assets.remove_icon} alt="Minus" className='w-3 h-3' />
                                            </button>
                                            <span className='font-bold text-sm w-4 text-center'>{item.quantity}</span>
                                            <button
                                                onClick={() => addToCart(item._id)}
                                                className='p-1 hover:bg-white rounded transition-colors shadow-sm'
                                            >
                                                <img src={assets.add_icon} alt="Plus" className='w-3 h-3' />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => updateQuantity(item._id, 0)}
                                            className='p-2 text-gray-400 hover:text-red-500 transition-colors'
                                        >
                                            <img src={assets.remove_icon} alt="Delete" className='w-5 h-5 opacity-50 hover:opacity-100' />
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>

                {/* Order Summary */}
                <div className='lg:w-96 flex flex-col gap-6'>
                    <div className='p-6 bg-white border border-gray-200 rounded-2xl shadow-sm'>
                        <h2 className='text-xl font-bold text-gray-800 mb-6'>Order Summary</h2>
                        <div className='flex flex-col gap-3 pb-6 border-b border-gray-100'>
                            <div className='flex justify-between text-gray-500'>
                                <span>Subtotal</span>
                                <span>৳{calculateTotal()}</span>
                            </div>
                            <div className='flex justify-between text-gray-500'>
                                <span>Delivery Fee</span>
                                <span>৳40</span>
                            </div>
                        </div>
                        <div className='flex justify-between items-center py-6'>
                            <span className='text-lg font-bold'>Total</span>
                            <span className='text-xl font-bold text-primary'>৳{calculateTotal() > 0 ? calculateTotal() + 40 : 0}</span>
                        </div>
                        <button
                            onClick={proceedToCheckout}
                            disabled={cartData.length === 0}
                            className='w-full py-4 bg-primary text-white font-black rounded-2xl hover:bg-primary-dull transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-primary/30 uppercase tracking-widest'
                        >
                            PROCEED TO CHECKOUT
                        </button>
                    </div>

                    <div className='flex items-center gap-2 p-4 bg-primary/5 border border-primary/20 rounded-xl text-primary text-sm'>
                        <img src={assets.trust_icon} alt="Secure" className='w-5 h-5' />
                        <p>Secure Checkout & Fast Delivery Guaranteed</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
