'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

export default function SkillsSection() {
  const [positionLanguages, setPositionLanguages] = useState(0);
  const [positionTools, setPositionTools] = useState(0);
  const languagesContainerRef = useRef<HTMLDivElement>(null);
  const toolsContainerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = () => {
      setPositionLanguages(prev => {
        const newPos = prev - 1;
        if (languagesContainerRef.current && Math.abs(newPos) > languagesContainerRef.current.scrollWidth / 2) {
          return 0;
        }
        return newPos;
      });

      setPositionTools(prev => {
        const newPos = prev - 1;
        if (toolsContainerRef.current && Math.abs(newPos) > toolsContainerRef.current.scrollWidth / 2) {
          return 0;
        }
        return newPos;
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const programmingLanguages = [
    { name: "React", image: "/image/skills/react.png" },
    { name: "JavaScript", image: "/image/skills/javascript.png" },
    { name: "TypeScript", image: "/image/skills/typescript.png" },
    { name: "NextJS", image: "/image/skills/nextjs.png" },
    { name: "TailwindCSS", image: "/image/skills/tailwind.png" },
    { name: "Node.js", image: "/image/skills/nodejs.png" },
    { name: "Python", image: "/image/skills/python.png" },
    { name: "Prisma", image: "/image/skills/prisma.png" },
    { name: "SQL", image: "/image/skills/sql.png" }
  ];

  const toolsAndSoftware = [
    { name: "GitHub", image: "/image/skills/github.png" },
    { name: "Docker", image: "/image/skills/docker.png" },
    { name: "Ubuntu", image: "/image/skills/ubuntu.png" },
    { name: "PostgreSQL", image: "/image/skills/postgresql.png" },
    { name: "MongoDB", image: "/image/skills/mongodb.png" },
    { name: "Draw.io", image: "/image/skills/drawio.png" },
    { name: "Postman", image: "/image/skills/postman.png" },
    { name: "Figma", image: "/image/skills/figma.png" },
    { name: "Firebase", image: "/image/skills/firebase.png" },
    { name: "Supabase", image: "/image/skills/supabase.png" }
  ];

  const loopedLanguages = [...programmingLanguages, ...programmingLanguages];
  const loopedTools = [...toolsAndSoftware, ...toolsAndSoftware];

  const SkillCard = ({ skill }: { skill: { name: string; image: string } }) => (
    <div className="bg-black/20 border border-white/10 rounded-xl p-6 backdrop-blur-sm relative group hover:border-white/30 transition-all duration-300 inline-block">
      <div className="absolute -inset-1 bg-gradient-to-r from-[#6366f1]/10 to-[#a855f7]/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative text-center w-24">
        <div className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center">
          <Image 
            src={skill.image}
            alt={`${skill.name} icon`}
            width={60}
            height={60}
            className="object-contain"
          />
        </div>
        <h3 className="text-white font-medium">{skill.name}</h3>
      </div>
    </div>
  );

  return (
    <section 
      id="Skills"
      className="min-h-screen w-full flex flex-col justify-center items-center relative py-20" 
      style={{ 
        background: 'radial-gradient(circle, #0a0a2e 0%, #020215 100%)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <div className="container mx-auto px-[5%] sm:px-6">
        <div className="space-y-6 text-center mb-16">
          <h2 className="text-5xl font-bold">
            <span className="relative inline-block">
              <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
              <span className="relative bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
                Skills
              </span>
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Technical skills and expertise
          </p>
        </div>
        
        {/* Programming Languages Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-[#6366f1]/80 to-[#a855f7]/80 bg-clip-text text-transparent">
              Programming Languages
            </span>
          </h3>
          <div className="overflow-hidden relative">
            <div 
              ref={languagesContainerRef}
              className="flex gap-6 py-6 whitespace-nowrap"
              style={{ transform: `translateX(${positionLanguages}px)` }}
            >
              {loopedLanguages.map((skill, index) => (
                <SkillCard key={index} skill={skill} />
              ))}
            </div>
          </div>
        </div>
        
        {/* Tools & Software Section */}
        <div>
          <h3 className="text-3xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-[#6366f1]/80 to-[#a855f7]/80 bg-clip-text text-transparent">
              Tools & Software
            </span>
          </h3>
          <div className="overflow-hidden relative">
            <div 
              ref={toolsContainerRef}
              className="flex gap-6 py-6 whitespace-nowrap"
              style={{ transform: `translateX(${positionTools}px)` }}
            >
              {loopedTools.map((skill, index) => (
                <SkillCard key={index} skill={skill} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 