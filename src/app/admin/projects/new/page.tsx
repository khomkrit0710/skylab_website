'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { createProject, uploadImage, Section } from '@/lib/api/projects';

export default function NewProjectPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [sections, setSections] = useState<Section[]>([{ title: '', description: '', image_url: '' }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // เพิ่ม section ใหม่
  const addSection = () => {
    setSections([...sections, { title: '', description: '', image_url: '' }]);
  };

  // ลบ section
  const removeSection = (index: number) => {
    if (sections.length === 1) {
      // อย่างน้อยต้องมี 1 section
      return;
    }
    const newSections = [...sections];
    newSections.splice(index, 1);
    setSections(newSections);
  };

  // อัพเดทข้อมูล section
  const updateSection = (index: number, field: keyof Section, value: string) => {
    const newSections = [...sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setSections(newSections);
  };

  // อัพโหลดรูปภาพสำหรับ section
  const handleImageUpload = async (index: number, file: File) => {
    try {
      const imageUrl = await uploadImage(file);
      updateSection(index, 'image_url', imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  // จัดการการเปลี่ยนแปลงของไฟล์รูปภาพ
  const handleImageChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      handleImageUpload(index, file);
    }
  };

  // ส่งข้อมูลโครงการไปยัง API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setUploadProgress(0);

    try {
      // กรองเอาเฉพาะ sections ที่มีข้อมูล (มีอย่างน้อย 1 ฟิลด์ที่ไม่ว่าง)
      const filteredSections = sections.filter(section => 
        section.title || section.description || section.image_url
      );

      setUploadProgress(50);
      const projectData = {
        title,
        sections: filteredSections,
      };

      setUploadProgress(75);
      const newProject = await createProject(projectData);
      
      if (!newProject) {
        throw new Error('ไม่สามารถสร้างโครงการได้');
      }

      setUploadProgress(100);
      router.push('/admin/projects');
    } catch (error: any) {
      setError(error.message || 'เกิดข้อผิดพลาดในการสร้างโครงการ');
      setLoading(false);
    }
  };

  return (
    <div className="px-6 py-8">
      <div className="mb-6">
        <Link
          href="/admin/projects"
          className="inline-flex items-center text-gray-400 hover:text-white mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          กลับไปยังหน้าโปรเจกต์
        </Link>
        <h1 className="text-2xl font-bold text-white">เพิ่มโปรเจกต์ใหม่</h1>
        <p className="text-gray-400 mt-1">เพิ่มรายละเอียดโปรเจกต์ของคุณ</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-400/10 border border-red-400/30 rounded-lg text-red-400">
          {error}
        </div>
      )}

      <div className="bg-black/30 border border-white/10 rounded-xl p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* ชื่อโครงการ */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                ชื่อโครงการ
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:ring-[#6366f1] focus:border-[#6366f1] text-white"
                placeholder="ใส่ชื่อโครงการ"
              />
            </div>

            {/* Sections */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">เนื้อหา</h2>
                <span className="text-sm text-gray-400">{sections.length} ส่วน</span>
              </div>

              {sections.map((section, index) => (
                <div key={index} className="p-4 border border-white/10 rounded-lg bg-black/20">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-sm font-medium text-gray-300">ส่วนที่ {index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeSection(index)}
                      className="p-1 text-gray-400 hover:text-red-400"
                      disabled={sections.length === 1}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    {/* หัวข้อ Section */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        หัวข้อ
                      </label>
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => updateSection(index, 'title', e.target.value)}
                        className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:ring-[#6366f1] focus:border-[#6366f1] text-white"
                        placeholder="ใส่หัวข้อ"
                      />
                    </div>

                    {/* คำอธิบาย Section */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        คำอธิบาย
                      </label>
                      <textarea
                        value={section.description}
                        onChange={(e) => updateSection(index, 'description', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-lg focus:ring-[#6366f1] focus:border-[#6366f1] text-white"
                        placeholder="อธิบายรายละเอียด"
                      />
                    </div>

                    {/* รูปภาพ Section */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        รูปภาพ
                      </label>
                      {section.image_url ? (
                        <div className="relative">
                          <img
                            src={section.image_url}
                            alt="Preview"
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => updateSection(index, 'image_url', '')}
                            className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1 hover:bg-black/80"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-white/10 rounded-lg p-4 hover:border-white/20 transition-colors">
                          <div className="text-center py-6">
                            <div className="mx-auto h-12 w-12 text-gray-400 mb-2">📷</div>
                            <div className="text-sm text-gray-400">
                              <label htmlFor={`file-upload-${index}`} className="relative cursor-pointer bg-[#6366f1]/20 rounded-md px-3 py-2 text-sm text-[#a393f5] hover:bg-[#6366f1]/30">
                                <span>อัพโหลดรูปภาพ</span>
                                <input
                                  id={`file-upload-${index}`}
                                  name={`file-upload-${index}`}
                                  type="file"
                                  className="sr-only"
                                  accept="image/*"
                                  onChange={(e) => handleImageChange(index, e)}
                                />
                              </label>
                              <p className="mt-2">หรือลากและวางที่นี่</p>
                              <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF ขนาดไม่เกิน 10MB</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* ปุ่มเพิ่ม Section */}
              <button
                type="button"
                onClick={addSection}
                className="w-full py-3 flex items-center justify-center text-white bg-black/20 border border-white/10 rounded-lg hover:bg-black/30 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                เพิ่มเนื้อหาใหม่
              </button>
            </div>

            {loading && (
              <div className="mt-4">
                <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-400 mt-1 text-center">
                  {uploadProgress === 100 ? 'เสร็จสิ้น!' : 'กำลังดำเนินการ...'}
                </p>
              </div>
            )}

            <div className="pt-4 border-t border-white/10">
              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-3 flex items-center justify-center text-white bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-lg hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-2 focus:ring-offset-[#030014]"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                    กำลังสร้างโปรเจกต์...
                  </>
                ) : (
                  'สร้างโปรเจกต์'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 