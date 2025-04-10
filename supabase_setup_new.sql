-- ลบตารางเดิม (ถ้ามี)
DROP TABLE IF EXISTS public.projects CASCADE;

-- สร้างตาราง projects ใหม่
CREATE TABLE public.projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) DEFAULT '',                    -- ชื่อโครงการ
    sections JSONB DEFAULT '[]'::jsonb,              -- เก็บข้อมูล sections เป็น array ในรูปแบบ JSON
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    user_id UUID REFERENCES auth.users(id)
);

-- ตรวจสอบว่ามี storage bucket สำหรับรูปภาพหรือไม่
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'project-images') THEN
        INSERT INTO storage.buckets (id, name, public) 
        VALUES ('project-images', 'project-images', true);
    END IF;
END $$;

-- เปิดใช้งาน RLS (Row Level Security)
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- สร้าง policy ต่างๆ
CREATE POLICY "Projects are viewable by everyone" 
    ON public.projects 
    FOR SELECT 
    USING (true);

CREATE POLICY "Users can insert their own projects" 
    ON public.projects 
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects" 
    ON public.projects 
    FOR UPDATE 
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects" 
    ON public.projects 
    FOR DELETE 
    USING (auth.uid() = user_id);

-- สร้าง policy สำหรับ storage
CREATE POLICY "Public read access for project images"
    ON storage.objects
    FOR SELECT
    USING (bucket_id = 'project-images');

CREATE POLICY "Authenticated users can upload project images"
    ON storage.objects
    FOR INSERT
    WITH CHECK (
        bucket_id = 'project-images' 
        AND auth.role() = 'authenticated'
    );

CREATE POLICY "Users can update their own project images"
    ON storage.objects
    FOR UPDATE
    USING (
        bucket_id = 'project-images' 
        AND auth.uid() = owner
    );

CREATE POLICY "Users can delete their own project images"
    ON storage.objects
    FOR DELETE
    USING (
        bucket_id = 'project-images' 
        AND auth.uid() = owner
    ); 