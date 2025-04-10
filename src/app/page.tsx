import React from 'react'
import HeroSection from './component/HeroSection';
import AboutSection from './component/AboutSection';
import ProjectsSection from './component/ProjectsSection';
import SkillsSection from './component/SkillsSection';
import ContactSection from './component/ContactSection';

function Page() {
  return (
    <main className="min-h-screen bg-[#030014] overflow-hidden">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}

export default Page