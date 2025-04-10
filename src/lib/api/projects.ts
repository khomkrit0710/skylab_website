import { supabase } from '../supabase';

// ประเภทข้อมูลของ Section
export type Section = {
  title?: string;          // หัวข้อของ section
  description?: string;    // คำอธิบายของ section
  image_url?: string;      // URL รูปภาพของ section
}

// ประเภทข้อมูลของ Project
export type Project = {
  id: number;
  title?: string;          // ชื่อโครงการ
  sections: Section[];     // array ของ sections
  created_at?: string;
}

// ดึงข้อมูลโครงการทั้งหมด
export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
  
  return data || [];
}

// ดึงข้อมูลโครงการตาม ID
export async function getProjectById(id: number): Promise<Project | null> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching project:', error);
    return null;
  }
  
  return data;
}

// สร้างโครงการใหม่
export async function createProject(
  project: Omit<Project, 'id' | 'created_at' | 'sections'> & { sections?: Section[] }
): Promise<Project | null> {
  // ตั้งค่าเริ่มต้นสำหรับฟิลด์ที่ไม่ได้ระบุ
  const defaultProject = {
    title: '',
    sections: project.sections || [],
  };

  const { data: userData, error: userError } = await supabase.auth.getUser();
  
  if (userError || !userData.user) {
    console.error('Error getting user: Not authenticated');
    return null;
  }

  const { data, error } = await supabase
    .from('projects')
    .insert([{
      ...defaultProject,
      user_id: userData.user.id  // เพิ่ม user_id เพื่อให้ตรงตาม RLS policy
    }])
    .select();
  
  if (error) {
    console.error('Error creating project:', error);
    return null;
  }
  
  return data?.[0] || null;
}

// อัพโหลดรูปภาพไปยัง storage
export async function uploadImage(file: File): Promise<string> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}-${Date.now()}.${fileExt}`;
    const filePath = `projects/${fileName}`;

    const { error } = await supabase.storage
      .from('project-images')
      .upload(filePath, file, {
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
}

// อัพเดทโครงการ
export async function updateProject(
  id: number, 
  project: Partial<Omit<Project, 'id' | 'created_at'>>
): Promise<Project | null> {
  const { data, error } = await supabase
    .from('projects')
    .update(project)
    .eq('id', id)
    .select();
  
  if (error) {
    console.error('Error updating project:', error);
    return null;
  }
  
  return data?.[0] || null;
}

// ลบโครงการ
export async function deleteProject(id: number): Promise<boolean> {
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting project:', error);
    return false;
  }
  
  return true;
} 