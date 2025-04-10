-- Create auth schema if not exists (this is typically automatically created by Supabase)
CREATE SCHEMA IF NOT EXISTS auth;

-- Enable RLS (Row Level Security) for tables
ALTER DATABASE postgres SET "app.settings.jwt_secret" TO 'your-jwt-secret';

-- Create projects table
CREATE TABLE public.projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) DEFAULT '',
    category VARCHAR(100) DEFAULT 'ทั่วไป',
    description TEXT DEFAULT '',
    image_url TEXT DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    user_id UUID REFERENCES auth.users(id)
);

-- Create storage bucket for project images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('project-images', 'project-images', true);

-- Enable security policies
-- RLS (Row Level Security) for projects table
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create policy for anonymous users to view projects
CREATE POLICY "Projects are viewable by everyone" 
    ON public.projects 
    FOR SELECT 
    USING (true);

-- Create policy for authenticated users to insert their own projects
CREATE POLICY "Users can insert their own projects" 
    ON public.projects 
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

-- Create policy for authenticated users to update their own projects
CREATE POLICY "Users can update their own projects" 
    ON public.projects 
    FOR UPDATE 
    USING (auth.uid() = user_id);

-- Create policy for authenticated users to delete their own projects
CREATE POLICY "Users can delete their own projects" 
    ON public.projects 
    FOR DELETE 
    USING (auth.uid() = user_id);

-- Create policy for public access to storage bucket
CREATE POLICY "Public read access for project images"
    ON storage.objects
    FOR SELECT
    USING (bucket_id = 'project-images');

-- Create policy for authenticated users to upload to storage bucket
CREATE POLICY "Authenticated users can upload project images"
    ON storage.objects
    FOR INSERT
    WITH CHECK (
        bucket_id = 'project-images' 
        AND auth.role() = 'authenticated'
    );

-- Create policy for users to update their own objects in storage
CREATE POLICY "Users can update their own project images"
    ON storage.objects
    FOR UPDATE
    USING (
        bucket_id = 'project-images' 
        AND auth.uid() = owner
    );

-- Create policy for users to delete their own objects in storage
CREATE POLICY "Users can delete their own project images"
    ON storage.objects
    FOR DELETE
    USING (
        bucket_id = 'project-images' 
        AND auth.uid() = owner
    ); 