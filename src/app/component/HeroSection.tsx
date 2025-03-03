'use client';

import React, { useEffect, useState } from 'react';

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate opacity based on scroll position
  const calculateOpacity = (scrollPos: number) => {
    // Start fading at 100px scroll, complete fade at 400px
    return Math.max(0, 1 - scrollPos / 400);
  };

  // Calculate scale based on scroll position
  const calculateScale = (scrollPos: number) => {
    // Start scaling at 100px scroll, reach min scale at 400px
    const scale = Math.max(0.5, 1 - (scrollPos / 800));
    return scale;
  };

  return (
    <div 
      className="h-[90vh] w-full flex justify-center items-center relative" 
      style={{ 
        background: 'radial-gradient(circle, #0a0a2e 0%, #020215 100%)', 
        borderTop:'2px solid white'
      }}
    >
      <h1 
        className="text-6xl font-bold text-amber-50 transition-all duration-300 relative z-10 flex flex-col justify-center items-center"
        style={{ 
          opacity: calculateOpacity(scrollY),
          transform: `scale(${calculateScale(scrollY)}) translateY(${scrollY * 0.3}px)`,
        }}
      >
        <div>Hi Welcome to</div>
        <div className='flex mt-5 gap-5'>
            <div className='text-blue-700' style={{textShadow:"rgb(0 0 0 / 80%) 2px 3px 20px"}}>SkyLab</div>
            <div>WebSite</div>
        </div>
        
      </h1>
      
      {/* Floating particles effect for section 1 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-amber-50 rounded-full opacity-30"
            style={{
              width: `${Math.random() * 10 + 2}px`,
              height: `${Math.random() * 10 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 5}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
              transform: `translateY(${scrollY * (0.1 + Math.random() * 0.2)}px)`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
          100% {
            transform: translateY(0) rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}