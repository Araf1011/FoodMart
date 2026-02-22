import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'

const List = ({ token }) => {

    const [list, setList] = useState([])

    const fetchList = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list')
            if (response.data.success) {
                setList(response.data.products.reverse());
            }
            else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const removeProduct = async (id) => {
        try {
            const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })

            if (response.data.success) {
                toast.success(response.data.message)
                await fetchList();
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchList()
    }, [])

    return (
        <div className='flex flex-col gap-8'>
            <div className='flex items-center justify-between'>
                <div className='flex flex-col gap-1'>
                    <h2 className='text-2xl font-black text-gray-800 uppercase tracking-tight'>Product <span className='text-primary'>Inventory</span></h2>
                    <p className='text-sm text-gray-500'>Manage and monitor your products in real-time</p>
                </div>
                <button onClick={fetchList} className='p-3 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-95 group'>
                    <span className='group-hover:rotate-180 transition-transform inline-block'>🔄</span>
                </button>
            </div>

            <div className='bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden'>
                {/* Table Header */}
                <div className='hidden md:grid grid-cols-[1fr_3.5fr_1.5fr_1fr_1fr] items-center py-6 px-10 bg-gray-50/80 border-b border-gray-100 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400'>
                    <span>Thumbnail</span>
                    <span>Product Name</span>
                    <span>Category</span>
                    <span>Price</span>
                    <span className='text-center'>Actions</span>
                </div>

                {/* Product List */}
                <div className='flex flex-col'>
                    {
                        list.length > 0 ? list.map((item, index) => (
                            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3.5fr_1.5fr_1fr_1fr] items-center gap-4 py-5 px-10 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-all group' key={index}>
                                <div className='w-16 h-16 rounded-2xl bg-gray-100 p-1.5 border border-gray-200/50 overflow-hidden'>
                                    <img className='w-full h-full object-cover rounded-xl transition-transform group-hover:scale-110' src={item.image[0]} alt="" />
                                </div>

                                <div className='flex flex-col'>
                                    <p className='text-sm font-black text-gray-800 group-hover:text-primary transition-colors'>{item.name}</p>
                                    <p className='text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5 md:hidden'>{item.category}</p>
                                </div>

                                <p className='text-xs font-black text-gray-500 hidden md:block uppercase tracking-wider bg-gray-50 h-fit w-fit px-3 py-1 rounded-full'>{item.category}</p>

                                <p className='text-sm font-black text-primary'>{currency}{item.offerPrice}</p>

                                <div className='text-right md:text-center'>
                                    <button onClick={() => removeProduct(item._id)} className='w-10 h-10 flex items-center justify-center bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all active:scale-90 shadow-sm shadow-red-100'>
                                        <span className='text-lg'>🗑️</span>
                                    </button>
                                </div>
                            </div>
                        )) : (
                            <div className='flex flex-col items-center gap-4 py-20 opacity-30'>
                                <span className='text-6xl'>📦</span>
                                <p className='font-black uppercase tracking-widest text-xs'>Your inventory is empty</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default List
