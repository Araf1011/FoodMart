import React, { useState, useEffect } from 'react'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
    const { products, cartItems, navigate, user, backendUrl, token, setCartItems } = useAppContext()
    const [method, setMethod] = useState('cod')

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: 'Bangladesh',
        phone: ''
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setFormData(data => ({ ...data, [name]: value }))
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {

            let orderItems = []

            for (const items in cartItems) {
                if (cartItems[items] > 0) {
                    const itemInfo = structuredClone(products.find(product => product._id === items))
                    if (itemInfo) {
                        itemInfo.quantity = cartItems[items]
                        orderItems.push(itemInfo)
                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: total
            }

            switch (method) {

                // API Calls for COD
                case 'cod':
                    const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
                    if (response.data.success) {
                        setCartItems({})
                        toast.success("Order Placed Successfully!")
                        navigate('/myorders')
                    } else {
                        toast.error(response.data.message)
                    }
                    break;

                case 'ssl':
                    const responseSSL = await axios.post(backendUrl + '/api/order/sslcommerz', orderData, { headers: { token } })
                    if (responseSSL.data.success) {
                        window.location.replace(responseSSL.data.GatewayPageURL)
                    } else {
                        toast.error(responseSSL.data.message)
                    }
                    break;

                default:
                    break;
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }
    }, [token])

    const calculateTotal = () => {
        let total = 0;
        for (const items in cartItems) {
            if (cartItems[items] > 0) {
                const product = products.find(p => p._id === items)
                if (product) {
                    total += product.offerPrice * cartItems[items]
                }
            }
        }
        return total;
    }

    const [coupon, setCoupon] = useState('')
    const [discount, setDiscount] = useState(0)

    const applyCoupon = () => {
        if (coupon.toUpperCase() === 'FRESH20') {
            setDiscount(subtotal * 0.2)
            alert("Voucher Applied! You got 20% off.")
        } else if (coupon.toUpperCase() === 'FOODMART100') {
            setDiscount(100)
            alert("Voucher Applied! You got ৳100 off.")
        } else {
            alert("Invalid Coupon Code")
            setDiscount(0)
        }
    }

    const subtotal = calculateTotal()
    const deliveryFee = subtotal > 0 ? 40 : 0
    const total = subtotal + deliveryFee - discount

    return (
        <form onSubmit={onSubmitHandler} className="py-12 flex flex-col lg:flex-row justify-between gap-12 min-h-[80vh]">

            {/* Left Side: Delivery Information */}
            <div className="flex-1 flex flex-col gap-8">
                <div className='flex items-center gap-2 text-2xl font-bold text-gray-800 border-b border-gray-100 pb-4'>
                    <h1 className='text-gray-500 uppercase'>Delivery</h1>
                    <h1 className='uppercase'>Information</h1>
                </div>

                <div className='flex flex-col gap-4 max-w-[500px]'>
                    <div className='flex gap-4'>
                        <input name='firstName' onChange={onChangeHandler} value={formData.firstName} className='w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all' type="text" placeholder='First name *' required />
                        <input name='lastName' onChange={onChangeHandler} value={formData.lastName} className='w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all' type="text" placeholder='Last name *' required />
                    </div>
                    <input name='email' onChange={onChangeHandler} value={formData.email} className='w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all' type="email" placeholder='Email address *' required />
                    <input name='street' onChange={onChangeHandler} value={formData.street} className='w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all' type="text" placeholder='Street Address *' required />
                    <div className='flex gap-4'>
                        <input name='city' onChange={onChangeHandler} value={formData.city} className='w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all' type="text" placeholder='City *' required />
                        <input name='state' onChange={onChangeHandler} value={formData.state} className='w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all' type="text" placeholder='State/District' />
                    </div>
                    <div className='flex gap-4'>
                        <input name='zipcode' onChange={onChangeHandler} value={formData.zipcode} className='w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all' type="number" placeholder='Zipcode' />
                        <input name='country' onChange={onChangeHandler} value={formData.country} className='w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-gray-200 outline-none transition-all bg-gray-50' type="text" placeholder='Country' disabled />
                    </div>
                    <input name='phone' onChange={onChangeHandler} value={formData.phone} className='w-full border border-gray-300 rounded-xl px-4 py-3 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all' type="number" placeholder='Phone *' required />
                </div>
            </div>

            {/* Right Side: Order Summary & Payment Method */}
            <div className="lg:w-[450px] flex flex-col gap-8">

                {/* Order Summary & Voucher Section */}
                <div className='bg-white border border-gray-200 rounded-3xl p-8 shadow-sm'>
                    <h2 className='text-xl font-black text-gray-800 mb-6 uppercase tracking-tight'>Order Summary</h2>

                    {/* Voucher Input */}
                    <div className='flex gap-2 mb-8'>
                        <input
                            value={coupon}
                            onChange={(e) => setCoupon(e.target.value)}
                            placeholder='Voucher Code'
                            className='flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:border-primary outline-none'
                        />
                        <button
                            type="button"
                            onClick={applyCoupon}
                            className='px-6 py-2 bg-gray-800 text-white text-xs font-bold rounded-xl hover:bg-black transition-all active:scale-95'
                        >
                            APPLY
                        </button>
                    </div>

                    <div className='flex flex-col gap-4 pb-6 border-b border-gray-100 font-medium'>
                        <div className='flex justify-between text-gray-500'>
                            <span>Subtotal</span>
                            <span className='text-gray-800'>৳{subtotal}</span>
                        </div>
                        <div className='flex justify-between text-gray-500'>
                            <span>Delivery Fee</span>
                            <span className='text-gray-800'>৳{deliveryFee}</span>
                        </div>
                        {discount > 0 && (
                            <div className='flex justify-between text-green-600 animate-pulse'>
                                <span>Discount</span>
                                <span>- ৳{discount.toFixed(0)}</span>
                            </div>
                        )}
                    </div>
                    <div className='flex justify-between items-center pt-6'>
                        <span className='text-xl font-bold text-gray-800'>Grand Total</span>
                        <span className='text-3xl font-black text-primary'>৳{total.toFixed(0)}</span>
                    </div>
                </div>

                {/* Payment Method Selector */}
                <div className='flex flex-col gap-6'>
                    <div className='flex items-center gap-2 text-xl font-bold text-gray-800 border-b border-gray-100 pb-4'>
                        <h2 className='text-gray-500 uppercase'>Payment</h2>
                        <h2 className='uppercase'>Method</h2>
                    </div>

                    <div className='flex flex-col gap-4'>
                        {/* SSLCommerz (Online Payment) */}
                        <div
                            onClick={() => setMethod('ssl')}
                            className={`group relative flex flex-col gap-4 border-2 rounded-2xl p-5 cursor-pointer transition-all duration-300 ${method === 'ssl' ? 'border-primary bg-primary/5 shadow-lg shadow-primary/5 translate-y-[-2px]' : 'border-gray-100 hover:border-gray-200 bg-white hover:bg-gray-50/50'}`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${method === 'ssl' ? 'border-primary bg-primary' : 'border-gray-300'}`}>
                                        {method === 'ssl' && <div className='w-2 h-2 rounded-full bg-white'></div>}
                                    </div>
                                    <div className='flex flex-col'>
                                        <p className='font-black text-gray-800 tracking-tight text-lg'>Digital Payment</p>
                                        <p className='text-[11px] text-gray-500 font-bold'>SSLCommerz Secure Gateway</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="bg-primary/10 text-primary text-[9px] font-black px-3 py-1 rounded-full uppercase mb-1">Recommended</div>
                                    <div className="flex items-center gap-1 group-hover:scale-110 transition-transform">
                                        <div className='w-4 h-4 bg-pink-500 rounded-sm' />
                                        <div className='w-4 h-4 bg-orange-500 rounded-sm' />
                                        <div className='w-4 h-4 bg-blue-600 rounded-sm' />
                                    </div>
                                </div>
                            </div>

                            <p className="text-[11px] text-gray-500 border-t border-gray-100 pt-3 leading-relaxed">
                                Pay instantly using <span className='text-gray-800 font-bold'>bKash, Nagad, Mastercard, or Visa</span>. Fast, safe and 100% encrypted.
                            </p>

                            {method === 'ssl' && (
                                <div className="bg-primary/10 text-primary text-[10px] font-bold p-2 rounded-lg flex items-center gap-2">
                                    <div className='w-1 h-1 rounded-full bg-primary animate-ping' />
                                    You will be securely redirected to finish payment.
                                </div>
                            )}
                        </div>

                        {/* Cash on Delivery */}
                        <div
                            onClick={() => setMethod('cod')}
                            className={`flex items-center justify-between border-2 rounded-2xl p-5 cursor-pointer transition-all duration-300 ${method === 'cod' ? 'border-primary bg-primary/5 shadow-lg shadow-primary/5 translate-y-[-2px]' : 'border-gray-100 hover:border-gray-200 bg-white hover:bg-gray-50/50'}`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${method === 'cod' ? 'border-primary bg-primary' : 'border-gray-300'}`}>
                                    {method === 'cod' && <div className='w-2 h-2 rounded-full bg-white'></div>}
                                </div>
                                <div>
                                    <p className='font-black text-gray-800 tracking-tight text-lg'>Cash on Delivery</p>
                                    <p className='text-[11px] text-gray-500 font-bold uppercase'>Pay at your doorstep</p>
                                </div>
                            </div>
                            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100">
                                <img src={assets.coin_icon} className="w-6 h-6 opacity-60" alt="COD" />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className='w-full py-6 mt-4 bg-gray-800 text-white font-black rounded-3xl hover:bg-gray-900 transition-all shadow-2xl shadow-gray-200 active:scale-95 uppercase tracking-[0.2em] text-lg flex items-center justify-center gap-4 group'
                    >
                        {method === 'ssl' ? 'Pay & Secure Order' : 'Complete Purchase'}
                        <img src={assets.arrow_right_icon_colored} className="w-6 h-6 invert group-hover:translate-x-2 transition-transform" alt="" />
                    </button>


                    <p className="text-[10px] text-center text-gray-400 font-medium px-4">
                        By clicking the button above, you agree to our Terms of Service and Privacy Policy.
                    </p>
                </div>

            </div>
        </form>
    )
}

export default PlaceOrder
