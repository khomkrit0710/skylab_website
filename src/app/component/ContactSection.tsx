'use client';

import React, { useRef, useState, useEffect } from 'react';

export default function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Use IntersectionObserver instead of scroll event for better performance
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          // Once visible, we can disconnect the observer
          if (sectionRef.current) {
            observer.unobserve(sectionRef.current);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="Contact"
      ref={sectionRef}
      className="min-h-screen w-full flex justify-center items-center relative py-20" 
      style={{ 
        background: 'radial-gradient(circle, #0a0a2e 0%, #020215 100%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <div className="container mx-auto px-[5%] sm:px-6">
        <div className={`space-y-6 text-center mb-12 transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <h2 className="text-5xl font-bold">
            <span className="relative inline-block">
              <span className="relative bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
                Contact
              </span>
            </span>
          </h2>
        </div>
        
        <div className="flex justify-center">
          <div className={`lg:w-1/2 max-w-md transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
          }`} style={{ transitionDelay: '200ms' }}>
            <div className="bg-black/20 border border-white/10 rounded-xl p-8 backdrop-blur-sm relative">
              <div className="relative">
                <h3 className="text-2xl font-semibold text-white mb-6">Let&apos;s Connect</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 flex items-center justify-center text-white">
                      📧
                    </div>
                    <div>
                      <p className="text-gray-400">Email</p>
                      <p className="text-white">Kr.Khomkrit@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 flex items-center justify-center text-white">
                      📱
                    </div>
                    <div>
                      <p className="text-gray-400">Phone</p>
                      <p className="text-white">080-914-2771</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 flex items-center justify-center text-white">
                      📍
                    </div>
                    <div>
                      <p className="text-gray-400">Location</p>
                      <p className="text-white">Bangkok, Thailand</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 