import { Facebook } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Navbar() {
  return (
    <div className='bg-gradient-to-t from-[#0a0a2e] to-[#020215] flex items-center justify-between px-8 border-b-amber-50'>
      <Link href={"/"} className='flex justify-center items-center text-amber-50 gap-2'>
        <img src='image/logo.png' className='w-[60px] h-auto p-2' />
        SkyLab Coding
      </Link>
      <ul className='flex text-amber-50 gap-10 pr-10'>
        <Link href={"/Product"}>Product</Link>
        <Link href={"/Blog"}>Blog</Link>
        <Link href={"/About"}>About</Link>
        <Link 
          href="https://www.facebook.com/profile.php?id=100006639856826"
          className=" hover:text-blue-400 transition-all hover:scale-110"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Facebook />
        </Link>
      </ul>
    </div>
  )
}

export default Navbar
