
import { Facebook, Mail} from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <div className='bg-gradient-to-b from-[#0a0a2e] to-[#020215] flex items-center justify-between px-8 py-2 text-amber-50'>
      <div className='flex gap-1 items-center'>
        <div className='flex items-center justify-center'>
          <div className='flex flex-col '>
            <div className='flex items-center'>
              <img src='image/logo.png' className='w-[40px] h-auto p-2' />
              Skylab Coding Official
            </div>
            <div className='text-xs'>© 2025 SkyLab</div>
          </div>
        </div>
      </div>
      <div className='flex'>
        <div className='flex items-center pl-5 gap-1'>
          <Link 
            href="https://www.facebook.com/profile.php?id=100006639856826"
            className=" hover:text-blue-400 transition-all hover:scale-110"
          >
            <Facebook />
          </Link>
          <div>Khomkrit Khamsontha</div>
          <div></div>
        </div>
        <div className='flex items-center pl-5 gap-1'>
          <Link 
            href="https://mail.google.com/mail/u/0/#inbox?compose=jrjtXLDspwTjfpPBxDkvMpmBwDwBnpZSTpzzVLGFZgZZLBPcHnjWrwjndJVNTgnrFzvbcXPB"
            className=" hover:text-red-400 transition-all hover:scale-110"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Mail />
          </Link>
          kr.khomkrit@gmail.com
        </div>
      </div>
      
    </div>

  )
}

export default Footer
