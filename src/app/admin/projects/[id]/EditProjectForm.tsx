'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { updateProject, deleteProject, Project, Section } from '@/lib/api/projects';
import { supabase } from '@/lib/supabase';

interface EditProjectFormProps {
  initialProject: Project | null;
  projectId: number;
}

export default function EditProjectForm({ initialProject, projectId }: EditProjectFormProps) {
  const router = useRouter();
  
  const [formData, setFormData] = useState<Omit<Project, 'id' | 'created_at'>>({
    title: initialProject?.title || '',
    sections: initialProject?.sections || []
  });
  
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialProject?.sections?.[0]?.image_url || null
  );
  const [uploadProgress, setUploadProgress] = useState(0);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData(prev => ({ ...prev, title: value }));
  };

  const handleSectionChange = (
    index: number,
    field: keyof Section,
    value: string
  ) => {
    const newSections = [...formData.sections];
    if (!newSections[index]) {
      newSections[index] = {};
    }
    newSections[index] = { ...newSections[index], [field]: value };
    setFormData(prev => ({ ...prev, sections: newSections }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (): Promise<string> => {
    if (!imageFile) return formData.sections[0]?.image_url || '';

    try {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}-${Date.now()}.${fileExt}`;
      const filePath = `projects/${fileName}`;

      const { error } = await supabase.storage
        .from('project-images')
        .upload(filePath, imageFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) throw error;

      const { data } = supabase.storage.from('project-images').getPublicUrl(filePath);
      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setUploadProgress(0);

    try {
      let imageUrl = formData.sections[0]?.image_url || '';
      if (imageFile) {
        setUploadProgress(20);
        imageUrl = await uploadImage();
        setUploadProgress(60);
      }

      const sections = [...formData.sections];
      if (sections.length === 0) {
        sections.push({});
      }
      sections[0] = { 
        ...sections[0], 
        image_url: imageUrl 
      };

      const projectData = {
        ...formData,
        sections
      };

      setUploadProgress(80);
      const updatedProject = await updateProject(projectId, projectData);
      
      if (!updatedProject) {
        throw new Error('Failed to update project');
      }

      setUploadProgress(100);
      router.push('/admin/projects');
    } catch (error: any) {
      setError(error.message || 'An error occurred while updating the project');
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setSubmitting(true);
    try {
      const success = await deleteProject(projectId);
      if (!success) {
        throw new Error('Failed to delete project');
      }
      router.push('/admin/projects');
    } catch (error: any) {
      setError(error.message || 'An error occurred while deleting the project');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="w-12 h-12 border-4 border-t-[#6366f1] border-r-transparent border-b-[#a855f7] border-l-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!initialProject) {
    return (
      <div className="p-4 bg-red-400/10 border border-red-400/30 rounded-lg text-red-400">
        Project not found
      </div>
    );
  }

  const section = formData.sections[0] || {};

  return (
    <>
      <div className="mb-6">
        <Link
          href="/admin/projects"
          className="inline-flex items-center text-gray-400 hover:text-white mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Projects
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Edit Project</h1>
            <p className="text-gray-400 mt-1">Make changes to your project</p>
          </div>
          {!deleteConfirm ? (
            <button
              type="button"
              onClick={() => setDeleteConfirm(true)}
              className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors flex items-center"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Project
            </button>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handleDelete}
                disabled={submitting}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                {submitting ? '...' : 'Confirm Delete'}
              </button>
              <button
                type="button"
                onClick={() => setDeleteConfirm(false)}
                className="px-4 py-2 bg-black/20 text-gray-300 border border-white/10 rounded-lg hover:bg-black/30 transition-colors"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-400/10 border border-red-400/30 rounded-lg text-red-400">
          {error}
        </div>
      )}

      <div className="bg-black/30 border border-white/10 rounded-xl p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                  Project Title*
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title || ''}
                  onChange={handleTitleChange}
                  className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:ring-[#6366f1] focus:border-[#6366f1] text-white"
                />
              </div>

              <div>
                <label htmlFor="section-title" className="block text-sm font-medium text-gray-300 mb-1">
                  Section Title*
                </label>
                <input
                  type="text"
                  id="section-title"
                  name="section-title"
                  required
                  value={section.title || ''}
                  onChange={(e) => handleSectionChange(0, 'title', e.target.value)}
                  className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:ring-[#6366f1] focus:border-[#6366f1] text-white"
                />
              </div>

              <div>
                <label htmlFor="section-description" className="block text-sm font-medium text-gray-300 mb-1">
                  Section Description*
                </label>
                <textarea
                  id="section-description"
                  name="section-description"
                  required
                  value={section.description || ''}
                  onChange={(e) => handleSectionChange(0, 'description', e.target.value)}
                  rows={5}
                  className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:ring-[#6366f1] focus:border-[#6366f1] text-white"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Section Image
                </label>
                <div className="border-2 border-dashed border-white/10 rounded-lg p-4 hover:border-white/20 transition-colors">
                  {imagePreview ? (
                    <div className="relative">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImageFile(null);
                          setImagePreview(null);
                          handleSectionChange(0, 'image_url', '');
                        }}
                        className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-black/80"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="mx-auto h-12 w-12 text-gray-400 mb-2">📷</div>
                      <div className="text-sm text-gray-400">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-[#6366f1]/20 rounded-md px-3 py-2 text-sm text-[#a393f5] hover:bg-[#6366f1]/30">
                          <span>Upload a file</span>
                          <input 
                            id="file-upload" 
                            name="file-upload" 
                            type="file" 
                            className="sr-only"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </label>
                        <p className="mt-2">or drag and drop</p>
                        <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {submitting && (
                <div className="mt-4">
                  <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 text-center">
                    {uploadProgress === 100 ? 'Complete!' : 'Updating...'}
                  </p>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-white/10">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full px-4 py-3 flex items-center justify-center text-white bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-lg hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-2 focus:ring-offset-[#030014]"
                >
                  {submitting ? (
                    <>
                      <Loader className="w-5 h-5 mr-2 animate-spin" />
                      Updating Project...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
} 