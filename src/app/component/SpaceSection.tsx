'use client';

import React, { useEffect, useState } from 'react';
import RotatingText from './RotatingText';
import Astronaut from './Astronaut';

export default function SpaceSection() {
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

  return (
    <div 
      className="h-[90vh] w-full text-amber-50 p-5 relative" 
      style={{ 
        background: 'radial-gradient(circle, #0a0a2e 0%, #020215 100%)'
      }}
    >
      <div 
        className="grid grid-cols-2"
        style={{
          opacity: Math.min(1, (scrollY - 100) / 400),
          transform: `translateY(${Math.max(0, 100 - scrollY * 0.1)}px)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        <div className="flex justify-center items-center">
          <Astronaut />
        </div>
        <div className="flex justify-center items-center">
          <RotatingText />
        </div>
      </div>
    </div>
  );
}