import React from 'react'

const Footer = () => {
  return (
    <>
    <div className='mt-8 w-full bg-black px-8 md:px-[300px] flex justify-between text-sm md:text-md py-8'>
        <div className="flex flex-col text-white">
            <p>Featured Blog</p>
            <p>Most viewed</p>
            <p>Reader Choice</p>
        </div>
        <div className="flex flex-col text-white">
            <p>Forum</p>
            <p>Support</p>
            <p>Recent posts</p>
        </div>
        <div className="flex flex-col text-white">
            <p>Privacy Policy</p>
            <p>Terms & Conditions</p>
            <p>Terms of Service</p>
        </div>
    </div>
    <p className='py-2 pb-6 text-center text-white bg-black'>All rights reserved @Agrit Garg 2024</p>
    </>
  )
}

export default Footer