'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight * 0.75;
        setIsVisible(isInView);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section 
      id="About"
      ref={sectionRef}
      className="min-h-screen w-full flex justify-center items-center relative py-20 overflow-hidden" 
      style={{ 
        background: 'radial-gradient(circle, #0a0a2e 0%, #020215 100%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <div className="container mx-auto px-[5%] sm:px-6">
        <div 
          className={`space-y-6 text-center mb-12 transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`}
        >
          <h2 className="text-5xl font-bold">
            <span className="relative inline-block">
              <span className="relative bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
                About
              </span>
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            This is the About section. Detailed information goes here.
          </p>
        </div>
        
        <div className="w-full flex flex-col md:flex-row gap-8 items-stretch">
          <div 
            className={`w-full md:w-2/5 relative h-[480px] transition-all duration-1000 transform ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-40 opacity-0'
            }`}
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-[#6366f1]/10 to-[#a855f7]/10 rounded-xl blur-lg opacity-30"></div>
            <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 relative overflow-hidden h-full flex flex-col">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#6366f1] to-[#a855f7] opacity-70"></div>

              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">My Profile</h3>
                <div className="bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 rounded-full p-2 flex items-center justify-center">
                  <span className="text-white text-sm">🤵</span>
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center mb-6 relative">
                <div className="absolute w-[240px] h-[240px] bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 blur-xl transform translate-y-2 opacity-60"></div>

                <div className="relative z-10 w-[240px] h-auto">
                  <Image 
                    src="/image/profile.png"
                    alt="profile"
                    width={240}
                    height={240}
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </div>

                <div className="absolute bottom-0 w-full h-12 bg-gradient-to-t from-black/30 to-transparent blur-sm"></div>
              </div>
              
              <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-lg p-3 mt-auto">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#6366f1]/30 to-[#a855f7]/30 flex items-center justify-center">
                    <span className="text-sm font-bold bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">KK</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">KhomKrit Khamsontha</p>
                    <p className="text-gray-400 text-sm">Fullstack Developer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div 
            className={`w-full md:w-3/5 relative h-[480px] transition-all duration-1000 transform ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-40 opacity-0'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-[#6366f1]/5 to-[#a855f7]/5 rounded-xl blur-md"></div>
            <div className="bg-black/20 border border-white/10 rounded-xl p-6 backdrop-blur-sm relative h-full flex flex-col">
              <h3 className="text-2xl font-semibold text-white mb-6">Description</h3>

              <div className="space-y-4 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <p className="text-gray-400 min-w-[120px]">My name:</p>
                  <p className='text-white'>KhomKrit Khamsontha</p> 
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <p className="text-gray-400 min-w-[120px]">You can call me:</p>
                  <p className='text-white'>Min</p> 
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <p className="text-gray-400 min-w-[120px]">Education:</p>
                  <p className='text-white'>Prince of Songkla University</p> 
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <p className="text-gray-400 min-w-[120px]">Major:</p>
                  <p className='text-white'>Business Information System</p> 
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <p className="text-gray-400 min-w-[120px]">
                  Hi, I&apos;m Khomkrit, a fullstack web developer with a passion for turning ideas into clean, scalable, and user - friendly applications.
                  I specialize in building modern web apps using tools like Next.js, React, Node.js, and Supabase. I enjoy working across the stack from crafting intuitive frontend experiences to building solid backend systems. Always learning, always building.
                  </p>

                </div>
              </div>
              
              <div className="mt-auto">
                <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-lg p-4">
                  <p className="text-gray-300 italic">
                    &quot;A fullstack web developer with a passion for creating modern web apps from end to end - beautiful UI, powerful backend, and seamless user experience.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 