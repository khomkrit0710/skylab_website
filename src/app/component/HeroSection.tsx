'use client';

import React, { useEffect, useState } from 'react';

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section 
      id="Home"
      className="min-h-screen w-full flex justify-center items-center relative overflow-hidden" 
    >
      <div className="absolute inset-0 bg-[#030014]">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-3xl rounded-full animate-pulse"></div>
      </div>
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white rounded-full opacity-30"
            style={{
              width: `${Math.random() * 6 + 1}px`,
              height: `${Math.random() * 6 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
              transform: `translateY(${scrollY * (0.1 + Math.random() * 0.2)}px)`,
            }}
          />
        ))}
      </div>

      <div className={`container mx-auto px-[5%] sm:px-6 relative z-10 transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen gap-12">
          <div className="w-full lg:w-2/5 space-y-6 text-center lg:text-left pt-20 lg:pt-0 ">
            <div className="inline-block mx-auto lg:mx-0">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10">
                  <span className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-transparent bg-clip-text text-sm font-medium">
                    Welcome to SkyLab
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
                <span className="relative inline-block">
                  <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
                  <span className="relative bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                    SkyLab
                  </span>
                </span>
                <br />
                <span className="relative inline-block mt-2">
                  <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
                  <span className="relative bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
                    WebSite
                  </span>
                </span>
              </h1>
            </div>
            
            <p className="text-base md:text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Hi guys, my name is Khomkrit. I run my own website called Skylab Coding.
            </p>
  
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <a href="#About">
                <button className="group relative w-[160px]">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl opacity-50 blur-md group-hover:opacity-90 transition-all duration-700"></div>
                  <div className="relative h-11 bg-[#030014] backdrop-blur-xl rounded-lg border border-white/10 leading-none overflow-hidden">
                    <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20"></div>
                    <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm">
                      <span className="bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent font-medium z-10">
                        Abount Me
                      </span>
                    </span>
                  </div>
                </button>
              </a>
              <a href="#Contact">
                <button className="group relative w-[160px]">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl opacity-30 blur-md group-hover:opacity-70 transition-all duration-700"></div>
                  <div className="relative h-11 bg-black/50 backdrop-blur-xl rounded-lg border border-white/10 leading-none overflow-hidden">
                    <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-[#6366f1]/10 to-[#a855f7]/10"></div>
                    <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm">
                      <span className="text-gray-300 z-10 group-hover:text-white transition-colors">
                        Contact
                      </span>
                    </span>
                  </div>
                </button>
              </a>
            </div>
          </div>

          <div className="w-full lg:w-2/5 h-[400px] lg:h-[600px] relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1]/10 to-[#a855f7]/10 rounded-3xl blur-3xl opacity-20"></div>
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="text-9xl">🚀</div>
            </div>
          </div>
        </div>
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
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
      `}</style>
    </section>
  )
}