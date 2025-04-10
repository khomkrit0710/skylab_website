'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { ExternalLink, ArrowUp } from 'lucide-react';
import { getProjects, Project, Section } from '@/lib/api/projects';

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const projectsLoaded = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          if (!projectsLoaded.current) {
            fetchProjects();
            projectsLoaded.current = true;
          }
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  async function fetchProjects() {
    try {
      setTimeout(async () => {
        const data = await getProjects();
        setProjects(data);
        setLoading(false);
      }, 100);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setLoading(false);
    }
  }

  const getFirstImage = (project: Project): string | undefined => {
    if (!project.sections || project.sections.length === 0) return undefined;
    
    for (const section of project.sections) {
      if (section.image_url) return section.image_url;
    }
    
    return undefined;
  };

  const getDisplayTitle = (project: Project): string => {
    if (project.title) return project.title;
    
    if (project.sections && project.sections.length > 0) {
      const firstSection = project.sections[0];
      if (firstSection.title) return firstSection.title;
    }
    
    return 'ไม่มีชื่อ';
  };

  const getFirstDescription = (project: Project): string | undefined => {
    if (!project.sections || project.sections.length === 0) return undefined;
    
    for (const section of project.sections) {
      if (section.description) return section.description;
    }
    
    return undefined;
  };

  const hasContent = (project: Project): boolean => {
    if (project.title) return true;
    if (!project.sections || project.sections.length === 0) return false;
    
    for (const section of project.sections) {
      if (section.title || section.description || section.image_url) {
        return true;
      }
    }
    
    return false;
  };

  const ProjectCard = React.memo(({ project }: { project: Project }) => (
    <div className="group relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      {/* Desktop version - hidden on small screens */}
      <div className="hidden sm:flex bg-black/30 border border-white/10 rounded-xl overflow-hidden relative backdrop-blur-sm group-hover:border-white/30 transition-all duration-300 h-[400px] flex-col">
        {getFirstImage(project) ? (
          <div className="h-48 w-full bg-gradient-to-br from-[#6366f1]/10 to-[#a855f7]/10 flex items-center justify-center">
            <img 
              src={getFirstImage(project)} 
              alt={getDisplayTitle(project)} 
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="h-48 w-full bg-gradient-to-br from-[#6366f1]/10 to-[#a855f7]/10 flex items-center justify-center">
            <div className="text-white/20 text-sm">ไม่มีรูปภาพ</div>
          </div>
        )}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-semibold text-white mb-2">{getDisplayTitle(project)}</h3>

          {getFirstDescription(project) ? (
            <p className="text-gray-400 mb-4 line-clamp-2">
              {getFirstDescription(project)}
            </p>
          ) : (
            <p className="text-gray-500 mb-4 text-sm italic">ไม่มีคำอธิบาย</p>
          )}
          
          <div className="flex justify-between items-center mt-auto">
            <div>.</div>
            <div className="flex gap-2">
              <a 
                href={`/projects/${project.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile version - visible only on small screens */}
      <div className="sm:hidden bg-black/30 border border-white/10 rounded-xl overflow-hidden relative backdrop-blur-sm group-hover:border-white/30 transition-all duration-300 flex flex-row h-[160px]">
        {getFirstImage(project) ? (
          <div className="h-full w-[120px] bg-gradient-to-br from-[#6366f1]/10 to-[#a855f7]/10 flex items-center justify-center">
            <img 
              src={getFirstImage(project)} 
              alt={getDisplayTitle(project)} 
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="h-full w-[120px] bg-gradient-to-br from-[#6366f1]/10 to-[#a855f7]/10 flex items-center justify-center">
            <div className="text-white/20 text-xs">ไม่มีรูปภาพ</div>
          </div>
        )}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-1">{getDisplayTitle(project)}</h3>

          {getFirstDescription(project) ? (
            <p className="text-gray-400 mb-2 line-clamp-2 text-sm">
              {getFirstDescription(project)}
            </p>
          ) : (
            <p className="text-gray-500 mb-2 text-xs italic">ไม่มีคำอธิบาย</p>
          )}
          
          <div className="flex justify-end items-center mt-auto">
            <a 
              href={`/projects/${project.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  ));

  ProjectCard.displayName = 'ProjectCard';

  return (
    <section 
      id="Projects"
      ref={sectionRef}
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
          </p>
        </div>
        
        {!isVisible ? (
          <div className="h-64"></div>
        ) : loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-t-[#6366f1] border-r-transparent border-b-[#a855f7] border-l-transparent rounded-full animate-spin"></div>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-400">ไม่มีโปรเจกต์ในขณะนี้</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {projects.filter(hasContent).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-r from-[#6366f1]/80 to-[#a855f7]/80 flex items-center justify-center text-white shadow-lg hover:from-[#6366f1] hover:to-[#a855f7] transition-all duration-300 z-50 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="กลับไปด้านบน"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </section>
  );
} 