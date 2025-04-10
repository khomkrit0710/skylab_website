'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getProjectById, Project } from '@/lib/api/projects';
import EditProjectForm from './EditProjectForm';

export default function ProjectPage() {
  const params = useParams();
  const projectId = parseInt(params.id as string);
  
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProject() {
      try {
        const projectData = await getProjectById(projectId);
        setProject(projectData);
      } catch (err) {
        console.error('Error loading project:', err);
        setError('Failed to load project');
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [projectId]);

  if (loading) {
    return (
      <div className="px-6 py-8 flex items-center justify-center h-[50vh]">
        <div className="w-12 h-12 border-4 border-t-[#6366f1] border-r-transparent border-b-[#a855f7] border-l-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-6 py-8">
        <div className="p-4 bg-red-400/10 border border-red-400/30 rounded-lg text-red-400">
          {error}
        </div>
      </div>
    );
  }
  
  return (
    <div className="px-6 py-8">
      <EditProjectForm initialProject={project} projectId={projectId} />
    </div>
  );
} 