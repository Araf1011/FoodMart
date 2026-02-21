import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
    return (
        <div className='py-16 md:py-24 flex flex-col gap-24'>

            {/* Hero Section - Minimal & Bold */}
            <div className='flex flex-col lg:flex-row items-end justify-between gap-8 border-b-2 border-gray-900 pb-12'>
                <div className='flex-1'>
                    <h1 className='text-6xl md:text-8xl font-black text-gray-900 tracking-tighter leading-[0.9] uppercase'>
                        Let's <br />
                        <span className='text-primary'>Connect.</span>
                    </h1>
                </div>
                <div className='flex-1 lg:max-w-md'>
                    <p className='text-xl text-gray-600 font-medium leading-relaxed italic'>
                        "FoodMart isn't just a store—it's a community. Whether you're a farmer, a foodie, or a partner, we're always just a message away."
                    </p>
                </div>
            </div>

            {/* Main Contact Grid */}
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-16'>

                {/* Left: Contact Form - Elevating to a specialized Card */}
                <div className='lg:col-span-7 bg-[#fbfbfb] rounded-[40px] p-8 md:p-16 shadow-2xl shadow-gray-200/50 border border-white'>
                    <div className='mb-12'>
                        <h2 className='text-3xl font-black text-gray-900 uppercase tracking-tight mb-2'>Send us a message</h2>
                        <div className='h-1 w-20 bg-primary'></div>
                    </div>

                    <form className='flex flex-col gap-8'>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                            <div className='group flex flex-col gap-3'>
                                <label className='text-[10px] font-black uppercase tracking-widest text-gray-400 group-focus-within:text-primary transition-colors'>Full Name</label>
                                <input type="text" placeholder='Type your name...' className='bg-transparent border-b-2 border-gray-200 py-3 outline-none focus:border-gray-900 transition-all text-lg placeholder:text-gray-300' />
                            </div>
                            <div className='group flex flex-col gap-3'>
                                <label className='text-[10px] font-black uppercase tracking-widest text-gray-400 group-focus-within:text-primary transition-colors'>Email Address</label>
                                <input type="email" placeholder='hello@yourmail.com' className='bg-transparent border-b-2 border-gray-200 py-3 outline-none focus:border-gray-900 transition-all text-lg placeholder:text-gray-300' />
                            </div>
                        </div>

                        <div className='group flex flex-col gap-3'>
                            <label className='text-[10px] font-black uppercase tracking-widest text-gray-400 group-focus-within:text-primary transition-colors'>What's on your mind?</label>
                            <textarea rows="4" placeholder='Tell us about your inquiry...' className='bg-transparent border-b-2 border-gray-200 py-3 outline-none focus:border-gray-900 transition-all text-lg resize-none placeholder:text-gray-300'></textarea>
                        </div>

                        <button className='group relative w-full md:w-fit py-5 px-12 bg-gray-900 text-white font-black rounded-full overflow-hidden transition-all hover:pr-16 active:scale-95'>
                            <span className='relative z-10 uppercase tracking-widest'>Send Now</span>
                            <div className='absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all'>
                                <img src={assets.arrow_right_icon_colored} className='w-6 h-6 invert' alt="" />
                            </div>
                        </button>
                    </form>
                </div>

                {/* Right: Modern Info Chips */}
                <div className='lg:col-span-5 flex flex-col gap-6 justify-center'>

                    <div className='p-8 rounded-[30px] bg-white border-2 border-gray-100 flex items-start gap-6 hover:border-primary/20 transition-all group'>
                        <div className='w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors'>
                            <img src={assets.trust_icon} className='w-6 h-6 group-hover:invert transition-all' />
                        </div>
                        <div>
                            <h4 className='text-xs font-black text-gray-400 uppercase tracking-wider mb-1'>Chat with us</h4>
                            <p className='text-xl font-bold text-gray-800'>support@foodmart.com</p>
                            <p className='text-sm text-gray-500 mt-1'>We usually reply within 24 hours.</p>
                        </div>
                    </div>

                    <div className='p-8 rounded-[30px] bg-white border-2 border-gray-100 flex items-start gap-6 hover:border-primary/20 transition-all group'>
                        <div className='w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors'>
                            <img src={assets.delivery_truck_icon} className='w-6 h-6 group-hover:invert transition-all' />
                        </div>
                        <div>
                            <h4 className='text-xs font-black text-gray-400 uppercase tracking-wider mb-1'>Call Support</h4>
                            <p className='text-xl font-bold text-gray-800'>+8801887789984</p>
                            <p className='text-sm text-gray-500 mt-1'>Available Sun-Thu, 9am - 6pm BDT.</p>
                        </div>
                    </div>

                    <div className='bg-primary/5 p-10 rounded-[30px] border border-primary/10 relative overflow-hidden group hover:scale-[1.02] transition-transform'>
                        <div className='absolute -right-10 -bottom-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity' />
                        <h4 className='text-primary font-black uppercase tracking-widest text-xs mb-4'>Grow with us</h4>
                        <h3 className='text-2xl font-black text-gray-900 leading-tight mb-6'>Join our fleet or become a seller.</h3>
                        <button className='px-8 py-3 bg-gray-900 text-white rounded-xl text-xs font-black uppercase tracking-widest'>Explore Partnerships</button>
                    </div>

                </div>

            </div>

            {/* Headquarter Section - Split Visual */}
            <div className='flex flex-col lg:flex-row bg-white rounded-[50px] overflow-hidden shadow-2xl shadow-gray-200 border border-gray-100 min-h-[600px]'>

                {/* Left Side: Real Map Embed */}
                <div className='flex-1 relative order-2 lg:order-1'>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14594.49887754668!2d90.3804817559!3d23.867446860!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c414643039d5%3A0xc54a20b33b7b6228!2sSector%2011%2C%20Uttara%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd"
                        className='w-full h-[400px] lg:h-full border-0 grayscale active:grayscale-0 focus:grayscale-0 transition-all duration-700'
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                    {/* Glossy Overlay Label */}
                    <div className='absolute bottom-8 left-8 bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/50 text-xs font-black tracking-widest uppercase text-gray-900'>
                        HQ: Uttara, Dhaka
                    </div>
                </div>

                {/* Right Side: Visit Info */}
                <div className='flex-1 p-12 lg:p-20 flex flex-col justify-center gap-8 order-1 lg:order-2'>
                    <div className='flex flex-col gap-2'>
                        <h4 className='text-primary font-black uppercase tracking-widest text-sm'>Visit Our Ground</h4>
                        <h2 className='text-4xl md:text-5xl font-black text-gray-900 leading-none uppercase'>Headquarters</h2>
                    </div>

                    <div className='flex flex-col gap-6 text-gray-600 text-lg'>
                        <p className='font-bold text-gray-900 underline underline-offset-8 decoration-primary decoration-4'>
                            House 24, Road 18/A, Sector 11,<br />
                            Uttara, Dhaka - 1230, Bangladesh.
                        </p>
                        <div className='bg-gray-50 p-6 rounded-2xl border border-gray-200 flex flex-col gap-2'>
                            <div className='flex justify-between text-sm'>
                                <span className='font-bold uppercase tracking-tight text-gray-400'>Opening Hours</span>
                                <span className='bg-green-100 text-green-700 px-3 py-1 rounded-full font-black text-[10px] uppercase'>Open Now</span>
                            </div>
                            <p className='text-gray-800 font-black'>Mon - Sat: 08:00 AM - 09:00 PM</p>
                            <p className='text-gray-400 text-sm'>Closed on Fridays & National Holidays.</p>
                        </div>
                    </div>

                    <button className='w-full py-5 border-2 border-gray-900 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-all active:scale-95'>
                        Get Directions
                    </button>
                </div>

            </div>

            {/* FAQ / Trust Section */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-12 text-center'>
                <div className='flex flex-col items-center gap-4'>
                    <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center'>
                        <div className='w-3 h-3 bg-primary rounded-full animate-bounce'></div>
                    </div>
                    <h3 className='font-black uppercase tracking-tight'>Quick Support</h3>
                    <p className='text-sm text-gray-500'>We respond to most inquiries within a few hours during business days.</p>
                </div>
                <div className='flex flex-col items-center gap-4'>
                    <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center'>
                        <div className='w-3 h-3 bg-primary rounded-full animate-ping'></div>
                    </div>
                    <h3 className='font-black uppercase tracking-tight'>Direct Tracking</h3>
                    <p className='text-sm text-gray-500'>Check your order status live on the "My Orders" page for instant updates.</p>
                </div>
                <div className='flex flex-col items-center gap-4'>
                    <div className='w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center'>
                        <div className='w-3 h-3 bg-primary rounded-full'></div>
                    </div>
                    <h3 className='font-black uppercase tracking-tight'>Safe & Secure</h3>
                    <p className='text-sm text-gray-500'>All communications and data are encrypted with bank-level security.</p>
                </div>
            </div>

        </div>
    )
}

export default Contact
