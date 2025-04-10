'use client';

import React, { useEffect, useState } from 'react';
import { ArrowLeft, Calendar } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getProjectById, Project, Section } from '@/lib/api/projects';
import Navbar from '@/app/component/Navbar';
import Footer from '@/app/component/Footer';

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = parseInt(params.id as string);
  
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProject() {
      try {
        const data = await getProjectById(projectId);
        setProject(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading project:', error);
        setError('ไม่สามารถโหลดข้อมูลโปรเจกต์ได้');
        setLoading(false);
      }
    }
    
    loadProject();
  }, [projectId]);

  const getFirstImage = (project: Project): string | undefined => {
    if (!project.sections || project.sections.length === 0) return undefined;
    
    for (const section of project.sections) {
      if (section.image_url) return section.image_url;
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

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen bg-[#030014]">
          <div className="w-12 h-12 border-4 border-t-[#6366f1] border-r-transparent border-b-[#a855f7] border-l-transparent rounded-full animate-spin"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !project) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#030014] px-6 text-center">
          <div className="text-6xl mb-4">😢</div>
          <h1 className="text-2xl font-bold text-white mb-2">ไม่พบโปรเจกต์</h1>
          <p className="text-gray-400 mb-6">{error || "โปรเจกต์ที่คุณกำลังค้นหาไม่มีอยู่หรือถูกลบไปแล้ว"}</p>
          <Link
            href="/#Projects"
            className="inline-flex items-center px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 text-white border border-white/10 hover:border-white/30 transition-all"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            กลับไปยังหน้าโปรเจกต์
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  if (!hasContent(project)) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#030014] px-6 text-center">
          <div className="text-6xl mb-4">🤔</div>
          <h1 className="text-2xl font-bold text-white mb-2">โปรเจกต์ไม่มีเนื้อหา</h1>
          <p className="text-gray-400 mb-6">โปรเจกต์นี้ยังไม่มีเนื้อหาที่จะแสดง</p>
          <Link
            href="/#Projects"
            className="inline-flex items-center px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 text-white border border-white/10 hover:border-white/30 transition-all"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            กลับไปยังหน้าโปรเจกต์
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const firstImage = getFirstImage(project);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#030014] pt-20 pb-16">
        <div className="container mx-auto px-[5%] sm:px-6">
          <Link
            href="/#Projects"
            className="inline-flex items-center text-gray-400 hover:text-white mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            กลับไปยังหน้าโปรเจกต์
          </Link>

          <div className="bg-black/30 border border-white/10 rounded-xl overflow-hidden">
            {/* แสดงรูปภาพหลักและชื่อโครงการ */}
            <div className="w-full relative">
              {firstImage && (
                <div className="w-full h-80 sm:h-96 relative">
                  <img 
                    src={firstImage} 
                    alt={project.title || "โปรเจกต์"} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
              )}
              
              <div className={`${firstImage ? 'absolute bottom-0 left-0' : ''} p-6 sm:p-8`}>
                {project.title && (
                  <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{project.title}</h1>
                )}
                {project.created_at && (
                  <div className="flex items-center text-gray-400 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(project.created_at).toLocaleDateString('th-TH')}
                  </div>
                )}
              </div>
            </div>

            {/* แสดงเนื้อหาแต่ละ section */}
            <div className="p-6 sm:p-8">
              {project.sections && project.sections.length > 0 && (
                <div className="space-y-12">
                  {project.sections.map((section, index) => (
                    section.title || section.description || section.image_url ? (
                      <div key={index} className="border-t border-white/10 pt-8 first:border-t-0 first:pt-0">
                        {section.title && (
                          <h2 className="text-2xl font-semibold text-white mb-4">{section.title}</h2>
                        )}
                        
                        {section.description && (
                          <div className="prose prose-invert max-w-none mb-6">
                            <p className="text-gray-300 whitespace-pre-line">{section.description}</p>
                          </div>
                        )}
                        
                        {section.image_url && section.image_url !== firstImage && (
                          <div className="mt-4 rounded-lg overflow-hidden">
                            <img 
                              src={section.image_url} 
                              alt={section.title || `ภาพประกอบส่วนที่ ${index + 1}`}
                              className="w-full h-auto" 
                            />
                          </div>
                        )}
                      </div>
                    ) : null
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
} 