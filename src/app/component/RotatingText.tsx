'use client';

import { useEffect, useState } from 'react';

export default function RotatingText() {
  const words = [
    { text: "awesome", class: "alizarin" },
    { text: "beautiful", class: "wisteria" },
    { text: "creative", class: "peter-river" },
    { text: "fabulous", class: "emerald" },
    { text: "interesting", class: "sun-flower" }
  ];
  
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [letters, setLetters] = useState<string[]>([]);
  const [letterClass, setLetterClass] = useState('letter');
  
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setLoading(false);
      setLetters(words[0].text.split(''));
      setTimeout(() => {
        setLetterClass('letter in');
      }, 20);
    }, 100);
    
    return () => clearTimeout(loadingTimer);
  }, [words]);
  
  useEffect(() => {
    if (loading) return;
    
    const interval = setInterval(() => {
      setLetterClass('letter out');
      setTimeout(() => {
        setCurrentIndex((current) => (current + 1) % words.length);
        setLetterClass('letter behind');

        setTimeout(() => {
          setLetterClass('letter in');
        }, 20);
      }, 1500);
      
    }, 4000);
    
    return () => clearInterval(interval);
  }, [loading, words.length]);

  useEffect(() => {
    if (loading) return;
    
    const currentWord = words[currentIndex].text;
    setLetters(currentWord.split(''));
  }, [currentIndex, loading]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <style jsx>{`
          .loading-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100px;
            min-width: 200px;
          }
          
          .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 1s ease-in-out infinite;
          }
          
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="rotating-text" style={{ transform: "translateX(-80px)" }}>
      <p>CSS Animation is</p>
      <p className="words-wrapper">
        <span className={`word ${words[currentIndex].class}`}>
          {letters.map((letter, i) => (
            <span 
              key={i} 
              className={letterClass}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {letter}
            </span>
          ))}
          .
        </span>
      </p>

      <style jsx>{`
        @import url(https://fonts.googleapis.com/css?family=Lato:600);
        
        .rotating-text {
          font-family: Lato, sans-serif;
          font-weight: 600;
          font-size: 36px;
          color: white;
        }
        
        .rotating-text p {
          display: inline-flex;
          margin: 0;
          vertical-align: top;
          margin-left: 15px;
        }
        
        .words-wrapper {
          position: relative;
          display: inline-block;
          padding-right: 10px;
        }
        
        .word {
          display: flex;
        }
        
        .letter {
          display: inline-block;
          transform-origin: center center 25px;
        }
        
        .letter.out {
          transform: rotateX(90deg);
          transition: 0.32s cubic-bezier(0.6, 0, 0.7, 0.2);
        }
        
        .letter.in {
          transform: rotateX(0deg);
          transition: 0.38s ease;
        }
        
        .letter.behind {
          transform: rotateX(-90deg);
        }

        .alizarin {
          color: #e74c3c;
        }
        
        .wisteria {
          color: #8e44ad;
        }
        
        .peter-river {
          color: #3498db;
        }
        
        .emerald {
          color: #2ecc71;
        }
        
        .sun-flower {
          color: #f1c40f;
        }
      `}</style>
    </div>
  );
}