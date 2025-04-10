import React from 'react'
import HeroSection from './component/HeroSection';
import AboutSection from './component/AboutSection';
import ProjectsSection from './component/ProjectsSection';
import SkillsSection from './component/SkillsSection';
import ContactSection from './component/ContactSection';
import Navbar from './component/Navbar';
import Footer from './component/Footer';

function Page() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#030014] overflow-hidden">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

export default Page