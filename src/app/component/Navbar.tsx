'use client';

import { Facebook, Menu, X } from 'lucide-react'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { title: "Home", href: "#Home" },
    { title: "About", href: "#About" },
    { title: "Skills", href: "#Skills" },
    { title: "Projects", href: "#Projects" },
    { title: "Contact", href: "#Contact" }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    setActiveSection(sectionId);
    
    if (section) {
      // Improve the scroll behavior
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    
    // Close mobile menu if open
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black/70 backdrop-blur-lg shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-[5%] sm:px-6">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className='flex items-center gap-2'>
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 flex items-center justify-center">
              <span className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent font-bold">SL</span>
            </div>
            <span className="text-white font-medium ml-1">SkyLab</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <a 
                key={index}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.title)}
                className={`text-sm font-medium transition-colors ${
                  activeSection === link.title 
                    ? 'text-white' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.title}
              </a>
            ))}
            <Link 
              href="https://www.facebook.com/profile.php?id=100006639856826"
              className="w-8 h-8 rounded-full bg-black/30 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out bg-black/90 backdrop-blur-lg ${
        isMobileMenuOpen ? 'max-h-[400px] opacity-100 visible' : 'max-h-0 opacity-0 invisible'
      } overflow-hidden`}>
        <div className="container mx-auto px-[5%] py-4 space-y-3">
          {navLinks.map((link, index) => (
            <a 
              key={index}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.title)}
              className={`block py-2 transition-colors ${
                activeSection === link.title 
                  ? 'text-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {link.title}
            </a>
          ))}
          <Link 
            href="https://www.facebook.com/profile.php?id=100006639856826"
            className="flex items-center gap-2 py-2 text-gray-300 hover:text-white transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Facebook className="w-4 h-4" /> Facebook
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
