'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { getProjects, Project, Section } from '@/lib/api/projects';

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const projectsLoaded = useRef(false);

  useEffect(() => {
    // Create an intersection observer to detect when the section comes into view
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          // Only fetch projects once when the section becomes visible
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

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  async function fetchProjects() {
    try {
      // Add a small timeout to prevent UI blocking during navigation
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

  // แสดงภาพแรกที่พบใน sections (ถ้ามี)
  const getFirstImage = (project: Project): string | undefined => {
    if (!project.sections || project.sections.length === 0) return undefined;
    
    for (const section of project.sections) {
      if (section.image_url) return section.image_url;
    }
    
    return undefined;
  };

  // แสดงชื่อของโปรเจกต์หรือหัวข้อแรกใน sections
  const getDisplayTitle = (project: Project): string => {
    if (project.title) return project.title;
    
    if (project.sections && project.sections.length > 0) {
      const firstSection = project.sections[0];
      if (firstSection.title) return firstSection.title;
    }
    
    return 'ไม่มีชื่อ';
  };

  // แสดงคำอธิบายแรกที่พบใน sections
  const getFirstDescription = (project: Project): string | undefined => {
    if (!project.sections || project.sections.length === 0) return undefined;
    
    for (const section of project.sections) {
      if (section.description) return section.description;
    }
    
    return undefined;
  };
  
  // ตรวจสอบว่าโปรเจกต์มีเนื้อหาที่จะแสดงหรือไม่
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

  // Optimize rendering by memoizing the project card
  const ProjectCard = React.memo(({ project }: { project: Project }) => (
    <div className="group relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="bg-black/30 border border-white/10 rounded-xl overflow-hidden relative backdrop-blur-sm group-hover:border-white/30 transition-all duration-300">
        {getFirstImage(project) && (
          <div className="h-48 w-full bg-gradient-to-br from-[#6366f1]/10 to-[#a855f7]/10 flex items-center justify-center">
            <img 
              src={getFirstImage(project)} 
              alt={getDisplayTitle(project)} 
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        )}
        <div className="p-6">
          <h3 className="text-xl font-semibold text-white mb-2">{getDisplayTitle(project)}</h3>

          {getFirstDescription(project) && (
            <p className="text-gray-400 mb-4 line-clamp-2">
              {getFirstDescription(project)}
            </p>
          )}
          
          <div className="flex justify-between items-center">
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
                ผลงานของเรา
              </span>
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            รวมผลงานที่น่าสนใจ
          </p>
        </div>
        
        {!isVisible ? (
          <div className="h-64"></div> // Placeholder before section is visible
        ) : loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-t-[#6366f1] border-r-transparent border-b-[#a855f7] border-l-transparent rounded-full animate-spin"></div>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-400">ไม่มีโปรเจกต์ในขณะนี้</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.filter(hasContent).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
} 