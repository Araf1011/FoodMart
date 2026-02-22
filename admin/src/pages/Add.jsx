import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({ token }) => {

    const [image1, setImage1] = useState(false)
    const [image2, setImage2] = useState(false)
    const [image3, setImage3] = useState(false)
    const [image4, setImage4] = useState(false)

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [offerPrice, setOfferPrice] = useState("");
    const [category, setCategory] = useState("Fruits");
    const [bestSeller, setBestSeller] = useState(false);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData()

            formData.append("name", name)
            formData.append("description", description)
            formData.append("price", price)
            formData.append("offerPrice", offerPrice)
            formData.append("category", category)
            formData.append("bestSeller", bestSeller)

            image1 && formData.append("image1", image1)
            image2 && formData.append("image2", image2)
            image3 && formData.append("image3", image3)
            image4 && formData.append("image4", image4)

            const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } })

            if (response.data.success) {
                toast.success(response.data.message)
                setName('')
                setDescription('')
                setImage1(false)
                setImage2(false)
                setImage3(false)
                setImage4(false)
                setPrice('')
                setOfferPrice('')
            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    return (
        <div className='flex flex-col gap-8'>
            <div className='flex flex-col gap-1'>
                <h2 className='text-2xl font-black text-gray-800 uppercase tracking-tight'>Add New <span className='text-primary'>Inventory</span></h2>
                <p className='text-sm text-gray-500'>Create a new product listing for your store</p>
            </div>

            <form onSubmit={onSubmitHandler} className='grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-8'>

                {/* Left Aspect: Image Upload */}
                <div className='bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-6 h-fit sticky top-[100px]'>
                    <div>
                        <h3 className='font-black uppercase text-[10px] tracking-widest text-gray-400 mb-6'>Product Visuals</h3>
                        <div className='grid grid-cols-2 gap-4'>
                            <label htmlFor="image1" className='cursor-pointer group'>
                                <div className='aspect-square border-2 border-dashed border-gray-100 rounded-2xl flex items-center justify-center group-hover:border-primary transition-all overflow-hidden bg-gray-50/50'>
                                    <img className='w-full h-full object-cover transition-transform group-hover:scale-110' src={!image1 ? "https://cdn-icons-png.flaticon.com/512/126/126477.png" : URL.createObjectURL(image1)} alt="" />
                                </div>
                                <p className='text-[10px] text-center mt-2 font-bold text-gray-400 group-hover:text-primary transition-colors uppercase'>Main Photo</p>
                                <input onChange={(e) => setImage1(e.target.files[0])} type="file" id="image1" hidden />
                            </label>

                            {[image2, image3, image4].map((img, idx) => (
                                <label key={idx} htmlFor={`image${idx + 2}`} className='cursor-pointer group'>
                                    <div className='aspect-square border-2 border-dashed border-gray-100 rounded-2xl flex items-center justify-center group-hover:border-primary transition-all overflow-hidden bg-gray-50/50'>
                                        <img className='w-full h-full object-cover transition-transform group-hover:scale-110' src={!img ? "https://cdn-icons-png.flaticon.com/512/126/126477.png" : URL.createObjectURL(img)} alt="" />
                                    </div>
                                    <input onChange={(e) => [setImage2, setImage3, setImage4][idx](e.target.files[0])} type="file" id={`image${idx + 2}`} hidden />
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className='bg-primary/5 p-4 rounded-2xl border border-primary/10'>
                        <p className='text-[10px] text-primary font-bold leading-relaxed'>Tip: High quality square images work best for your storefront aesthetics.</p>
                    </div>
                </div>

                {/* Right Aspect: Product Details */}
                <div className='flex flex-col gap-8'>
                    <div className='bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-6'>
                        <h3 className='font-black uppercase text-[10px] tracking-widest text-gray-400 mb-2'>Basic Information</h3>

                        <div className='flex flex-col gap-2'>
                            <p className='font-bold text-sm text-gray-700 ml-1'>Product Title</p>
                            <input onChange={(e) => setName(e.target.value)} value={name} className='input-style' type="text" placeholder='e.g. Fresh Garden Strawberries' required />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='font-bold text-sm text-gray-700 ml-1'>Description</p>
                            <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='input-style min-h-[150px] py-4' placeholder='Tell customers about the taste, origin, and freshness...' required />
                        </div>
                    </div>

                    <div className='bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col gap-6'>
                        <h3 className='font-black uppercase text-[10px] tracking-widest text-gray-400 mb-2'>Pricing & Category</h3>

                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                            <div className='flex flex-col gap-2'>
                                <p className='font-bold text-sm text-gray-700 ml-1'>Compare at Price</p>
                                <div className='relative'>
                                    <span className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold'>৳</span>
                                    <input onChange={(e) => setPrice(e.target.value)} value={price} className='input-style pl-10' type="Number" placeholder='200' required />
                                </div>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <p className='font-bold text-sm text-gray-700 ml-1'>Sale Price</p>
                                <div className='relative'>
                                    <span className='absolute left-4 top-1/2 -translate-y-1/2 text-primary font-black'>৳</span>
                                    <input onChange={(e) => setOfferPrice(e.target.value)} value={offerPrice} className='input-style pl-10 border-primary/20 bg-primary/5' type="Number" placeholder='180' required />
                                </div>
                            </div>
                        </div>

                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                            <div className='flex flex-col gap-2'>
                                <p className='font-bold text-sm text-gray-700 ml-1'>Category</p>
                                <select onChange={(e) => setCategory(e.target.value)} value={category} className='input-style appearance-none bg-gray-50/50 cursor-pointer'>
                                    <option value="Fruits">Fruits</option>
                                    <option value="Vegetables">Vegetables</option>
                                    <option value="Dairy">Dairy</option>
                                    <option value="Meat">Meat</option>
                                    <option value="Bakery">Bakery</option>
                                </select>
                            </div>
                            <div className='flex items-center gap-3 pt-8 pl-1'>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" onChange={() => setBestSeller(prev => !prev)} checked={bestSeller} className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                    <span className="ml-3 text-sm font-bold text-gray-700 uppercase tracking-tight">Best Seller</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className='btn-primary h-16 text-lg'>
                        Publish Product
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Add
