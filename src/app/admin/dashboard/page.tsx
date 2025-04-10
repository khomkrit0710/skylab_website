'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Folders, PlusCircle } from 'lucide-react';
import { getProjects, Project } from '@/lib/api/projects';

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      const data = await getProjects();
      setProjects(data);
      setLoading(false);
    }
    loadProjects();
  }, []);

  return (
    <div className="px-6 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Manage your website content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black/30 border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Projects</h2>
            <span className="px-3 py-1 text-xs rounded-full bg-[#6366f1]/20 text-[#a393f5]">
              {loading ? '...' : projects.length} total
            </span>
          </div>
          <p className="text-gray-400 mb-4">
            Manage your portfolio projects
          </p>
          <div className="flex space-x-3">
            <Link 
              href="/admin/projects"
              className="inline-flex items-center px-4 py-2 text-sm rounded-lg bg-white/5 text-white border border-white/10 hover:border-white/30 transition-all"
            >
              <Folders className="mr-2 w-4 h-4" />
              View Projects
            </Link>
            <Link 
              href="/admin/projects/new"
              className="inline-flex items-center px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 text-white border border-white/10 hover:border-white/30 transition-all"
            >
              <PlusCircle className="mr-2 w-4 h-4" />
              Add New
            </Link>
          </div>
        </div>

        <div className="bg-black/30 border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Quick Links</h2>
          </div>
          <div className="space-y-4">
            <Link 
              href="/"
              className="flex items-center px-4 py-3 text-sm rounded-lg bg-white/5 text-white hover:bg-white/10 transition-all"
              target="_blank"
            >
              <span className="mr-3">🏠</span>
              View Website
            </Link>
            <Link 
              href="/admin/projects"
              className="flex items-center px-4 py-3 text-sm rounded-lg bg-white/5 text-white hover:bg-white/10 transition-all"
            >
              <span className="mr-3">🗂️</span>
              All Projects
            </Link>
            <Link 
              href="/admin/projects/new"
              className="flex items-center px-4 py-3 text-sm rounded-lg bg-white/5 text-white hover:bg-white/10 transition-all"
            >
              <span className="mr-3">➕</span>
              Add New Project
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Recent Projects</h2>
          <Link 
            href="/admin/projects"
            className="text-sm text-[#a393f5] hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="bg-black/30 border border-white/10 rounded-xl overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-48">
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Created At</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {projects.slice(0, 5).map((project) => (
                    <tr key={project.id} className="hover:bg-white/5">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{project.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{project.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {project.created_at ? new Date(project.created_at).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link 
                          href={`/admin/projects/${project.id}`}
                          className="text-[#a393f5] hover:text-[#6366f1]"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 