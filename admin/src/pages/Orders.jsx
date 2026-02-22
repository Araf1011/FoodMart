import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const Orders = ({ token }) => {

    const [orders, setOrders] = useState([])

    const fetchAllOrders = async () => {

        if (!token) {
            return null;
        }

        try {

            const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
            if (response.data.success) {
                setOrders(response.data.orders.reverse())
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }

    }

    const statusHandler = async (event, orderId) => {
        try {
            const response = await axios.post(backendUrl + '/api/order/status', { orderId, status: event.target.value }, { headers: { token } })
            if (response.data.success) {
                await fetchAllOrders()
            }
        } catch (error) {
            console.log(error)
            toast.error(response.data.message)
        }
    }

    useEffect(() => {
        fetchAllOrders();
    }, [token])

    return (
        <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-1'>
                <h2 className='text-2xl font-black text-gray-800 uppercase tracking-tight'>Customer Orders</h2>
                <p className='text-sm text-gray-500'>Track and update delivery statuses</p>
            </div>

            <div className='flex flex-col gap-4'>
                {
                    orders.map((order, index) => (
                        <div className='grid grid-cols-1 md:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-6 items-start border border-gray-100 p-8 my-3 md:my-4 rounded-3xl bg-white shadow-sm hover:shadow-md transition-all' key={index}>
                            <div className='bg-primary/5 p-4 rounded-2xl flex items-center justify-center border border-primary/10'>
                                <span className='text-4xl'>📦</span>
                            </div>
                            <div>
                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-gray-50'>
                                    <div>
                                        <p className='text-xs font-black text-gray-400 uppercase tracking-widest mb-2'>Order Items</p>
                                        {order.items.map((item, index) => {
                                            if (index === order.items.length - 1) {
                                                return <p className='py-0.5 text-sm font-bold text-gray-800' key={index}> {item.name} x {item.quantity} </p>
                                            }
                                            else {
                                                return <p className='py-0.5 text-sm font-bold text-gray-800' key={index}> {item.name} x {item.quantity} <span className='text-gray-300 mx-1'>|</span> </p>
                                            }
                                        })}
                                    </div>
                                    <div>
                                        <p className='text-xs font-black text-gray-400 uppercase tracking-widest mb-2'>Customer Info</p>
                                        <p className='text-sm font-black text-gray-800'>{order.address.firstName + " " + order.address.lastName}</p>
                                        <p className='text-xs font-medium text-gray-500 mt-1 capitalize'>{order.address.street + ", " + order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                                        <p className='text-sm font-bold text-primary mt-2'>{order.address.phone}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <p className='text-xs font-black text-gray-400 uppercase tracking-widest'>Summary</p>
                                <p className='text-sm font-medium text-gray-600'>Items: {order.items.length}</p>
                                <p className='text-sm font-medium text-gray-600'>Method: <span className='uppercase font-bold'>{order.paymentMethod}</span></p>
                                <p className='text-sm font-medium text-gray-600'>Payment: <span className={`font-black ${order.payment ? 'text-green-500' : 'text-amber-500'}`}>{order.payment ? 'Done' : 'Pending'}</span></p>
                                <p className='text-sm font-medium text-gray-600'>Date: <span className='font-bold'>{new Date(order.date).toLocaleDateString()}</span></p>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className='text-xs font-black text-gray-400 uppercase tracking-widest'>Amount</p>
                                <p className='text-2xl font-black text-primary'>{currency}{order.amount}</p>
                            </div>
                            <div className='flex flex-col gap-1'>
                                <p className='text-xs font-black text-gray-400 uppercase tracking-widest mb-2'>Order Status</p>
                                <select onChange={(event) => statusHandler(event, order._id)} value={order.status} className='p-3 font-bold text-sm border border-gray-200 rounded-xl outline-none focus:border-primary transition-all bg-gray-50 cursor-pointer'>
                                    <option value="Order Placed">Order Placed</option>
                                    <option value="Packing">Packing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Out for delivery">Out for delivery</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Orders
