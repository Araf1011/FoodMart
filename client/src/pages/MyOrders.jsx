import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { dummyProducts, assets } from '../assets/assets'

const MyOrders = () => {
    const { cartItems } = useAppContext()
    const [orderData, setOrderData] = useState([])

    useEffect(() => {
        // For demo purposes, we'll just show items currently in the cart as "Placed Orders"
        const tempData = [];
        for (const items in cartItems) {
            if (cartItems[items] > 0) {
                tempData.push({
                    _id: items,
                    quantity: cartItems[items],
                    status: 'Order Placed',
                    date: new Date().toLocaleDateString(),
                    payment: 'Pending'
                })
            }
        }
        setOrderData(tempData);
    }, [cartItems])

    return (
        <div className='py-10 flex flex-col gap-10'>
            <div className='flex items-center gap-2 text-2xl font-bold text-gray-800'>
                <h1 className='text-gray-500'>MY</h1>
                <h1>ORDERS</h1>
            </div>

            <div className='flex flex-col gap-4'>
                {orderData.length === 0 ? (
                    <div className='flex flex-col items-center gap-4 py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300'>
                        <img src={assets.box_icon} alt="No Orders" className='w-20 h-20 opacity-20' />
                        <p className='text-gray-500 font-medium'>You haven't placed any orders yet.</p>
                    </div>
                ) : (
                    orderData.map((item, index) => {
                        const product = dummyProducts.find(p => p._id === item._id)
                        if (!product) return null

                        return (
                            <div key={index} className='p-6 bg-white border border-gray-200 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-all'>
                                <div className='flex items-center gap-6'>
                                    <img src={product.image[0]} className='w-20 h-20 rounded-xl bg-gray-50 object-contain p-2' alt="" />
                                    <div className='flex flex-col gap-1'>
                                        <h3 className='font-bold text-gray-800 text-lg uppercase tracking-tight'>{product.name}</h3>
                                        <div className='flex items-center gap-4 text-sm text-gray-500 font-medium'>
                                            <p>৳{product.offerPrice}</p>
                                            <p>Quantity: {item.quantity}</p>
                                        </div>
                                        <p className='text-xs text-gray-400 mt-1'>Date: <span className='text-gray-600 font-bold'>{item.date}</span></p>
                                    </div>
                                </div>

                                <div className='flex flex-col md:items-end gap-3'>
                                    <div className='flex items-center gap-2 px-4 py-1.5 bg-green-50 text-green-600 rounded-full border border-green-100'>
                                        <div className='w-2 h-2 rounded-full bg-green-500 animate-pulse' />
                                        <p className='text-xs font-black uppercase tracking-widest'>{item.status}</p>
                                    </div>
                                    <button className='px-6 py-2 border border-gray-200 text-sm font-bold text-gray-600 rounded-xl hover:bg-gray-50 transition-all active:scale-95'>
                                        Track Shipment
                                    </button>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}

export default MyOrders
