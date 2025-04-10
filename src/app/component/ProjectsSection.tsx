'use client';

import React from 'react';

export default function ProjectsSection() {
  const projects = [
    { id: 1, title: "Project 1", category: "Web Development" },
    { id: 2, title: "Project 2", category: "Mobile App" },
    { id: 3, title: "Project 3", category: "UI/UX Design" }
  ];

  return (
    <section 
      id="Projects"
      className="min-h-screen w-full flex justify-center items-center relative py-20" 
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
                Projects
              </span>
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Featured projects and work would be showcased here.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="group relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="bg-black/30 border border-white/10 rounded-xl overflow-hidden relative backdrop-blur-sm group-hover:border-white/30 transition-all duration-300">
                <div className="h-48 w-full bg-gradient-to-br from-[#6366f1]/10 to-[#a855f7]/10 flex items-center justify-center">
                  <span className="text-4xl">🖼️</span>
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 text-xs rounded-full bg-white/10 text-gray-300 backdrop-blur-sm mb-3">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4">
                    Project description would go here.
                  </p>
                  <div className="flex justify-between items-center">
                    <button className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 text-white border border-white/10 hover:border-white/30 backdrop-blur-sm transition-all duration-300">
                      View Details
                    </button>
                    <div className="flex gap-2">
                      <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
                        🔗
                      </span>
                      <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
                        💻
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 