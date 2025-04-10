'use client';

import { Facebook, Mail } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <footer className="w-full bg-[#030014] border-t border-white/10 py-8">
      <div className="container mx-auto px-[5%] sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 flex items-center justify-center">
              <span className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent font-bold">SL</span>
            </div>
            <div>
              <h3 className="text-white font-medium">Skylab Coding Official</h3>

            </div>
          </div>
          <div>
            <p className="text-gray-400 text-sm">© 2025 SkyLab. All rights reserved.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 flex items-center justify-center">
                <Link 
                  href="https://www.facebook.com/profile.php?id=100006639856826"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </Link>
              </div>
              <span className="text-gray-400 text-sm">Khomkrit Khamsontha</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 flex items-center justify-center">
                <Link 
                  href="https://mail.google.com/mail/u/0/#inbox?compose=jrjtXLDspwTjfpPBxDkvMpmBwDwBnpZSTpzzVLGFZgZZLBPcHnjWrwjndJVNTgnrFzvbcXPB"
                  className="text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Mail className="w-4 h-4" />
                </Link>
              </div>
              <span className="text-gray-400 text-sm">kr.khomkrit@gmail.com</span>
            </div>
          </div>
          
        </div>
      </div>
    </footer>
  )
}

export default Footer
