'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { PlusCircle, Trash2, Edit, ExternalLink } from 'lucide-react';
import { getProjects, deleteProject, Project } from '@/lib/api/projects';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    setLoading(true);
    const data = await getProjects();
    setProjects(data);
    setLoading(false);
  }

  async function handleDeleteProject(id: number) {
    setIsDeleting(true);
    const success = await deleteProject(id);
    if (success) {
      setProjects(projects.filter(project => project.id !== id));
    }
    setDeleteConfirm(null);
    setIsDeleting(false);
  }

  // แสดงชื่อของโปรเจกต์หรือหัวข้อแรกใน sections
  const getDisplayTitle = (project: Project): string => {
    if (project.title) return project.title;
    
    if (project.sections && project.sections.length > 0) {
      const firstSection = project.sections[0];
      if (firstSection.title) return firstSection.title;
    }
    
    return 'ไม่มีชื่อ';
  };

  return (
    <div className="px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-gray-400 mt-1">Manage your portfolio projects</p>
        </div>
        <Link 
          href="/admin/projects/new"
          className="inline-flex items-center px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 text-white border border-white/10 hover:border-white/30 transition-all"
        >
          <PlusCircle className="mr-2 w-4 h-4" />
          Add New Project
        </Link>
      </div>

      <div className="bg-black/30 border border-white/10 rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-t-[#6366f1] border-r-transparent border-b-[#a855f7] border-l-transparent rounded-full animate-spin"></div>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">You haven't created any projects yet</p>
            <Link 
              href="/admin/projects/new"
              className="inline-flex items-center px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 text-white border border-white/10 hover:border-white/30 transition-all"
            >
              <PlusCircle className="mr-2 w-4 h-4" />
              Create Your First Project
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black/40 border-b border-white/10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Created At</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-white/5">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{getDisplayTitle(project)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {project.created_at ? new Date(project.created_at).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <Link 
                          href={`/projects/${project.id}`} 
                          className="p-1 text-gray-400 hover:text-white rounded-md"
                          target="_blank"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <Link 
                          href={`/admin/projects/${project.id}`} 
                          className="p-1 text-gray-400 hover:text-white rounded-md"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        {deleteConfirm === project.id ? (
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleDeleteProject(project.id)}
                              disabled={isDeleting}
                              className="p-1 text-red-400 hover:text-red-300 rounded-md"
                            >
                              {isDeleting ? '...' : 'Confirm'}
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="p-1 text-gray-400 hover:text-white rounded-md"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(project.id)}
                            className="p-1 text-gray-400 hover:text-red-400 rounded-md"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 