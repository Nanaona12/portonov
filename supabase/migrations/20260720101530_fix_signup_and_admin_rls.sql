-- Fix 1: Repair handle_new_user trigger function with proper search_path
-- The empty search_path '' caused signup to fail because the function couldn't resolve public.profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name, email)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'display_name', NEW.email);
  RETURN NEW;
END;
$$;

-- Fix 2: Create admin_users table to designate who can manage landing page content
CREATE TABLE IF NOT EXISTS public.admin_users (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Fix 3: Helper function to check admin status by checking admin_users table
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path TO public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE user_id = auth.uid()
  );
$$;

-- Enable RLS on admin_users
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Allow a user to check if they themselves are admin (self-service read)
CREATE POLICY "Users can check their own admin status" ON public.admin_users
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- Fix 4: Drop the overly permissive "Users can manage their own X" policies
-- These allowed ANY authenticated user to insert their own rows that show publicly
DROP POLICY IF EXISTS "Users can manage their own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can manage their own experience" ON public.experience;
DROP POLICY IF EXISTS "Users can manage their own certifications" ON public.certifications;
DROP POLICY IF EXISTS "Users can manage their own awards" ON public.awards;
DROP POLICY IF EXISTS "Users can manage their own organizations" ON public.organizations;

-- Fix 5: Create admin-only write policies (INSERT/UPDATE/DELETE) for each content table
-- Public SELECT remains so the landing page can display content to everyone

-- Projects: admin-only writes
CREATE POLICY "Admins can insert projects" ON public.projects
  FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update projects" ON public.projects
  FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins can delete projects" ON public.projects
  FOR DELETE TO authenticated USING (public.is_admin());

-- Experience: admin-only writes
CREATE POLICY "Admins can insert experience" ON public.experience
  FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update experience" ON public.experience
  FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins can delete experience" ON public.experience
  FOR DELETE TO authenticated USING (public.is_admin());

-- Certifications: admin-only writes
CREATE POLICY "Admins can insert certifications" ON public.certifications
  FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update certifications" ON public.certifications
  FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins can delete certifications" ON public.certifications
  FOR DELETE TO authenticated USING (public.is_admin());

-- Awards: admin-only writes
CREATE POLICY "Admins can insert awards" ON public.awards
  FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update awards" ON public.awards
  FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins can delete awards" ON public.awards
  FOR DELETE TO authenticated USING (public.is_admin());

-- Organizations: admin-only writes
CREATE POLICY "Admins can insert organizations" ON public.organizations
  FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update organizations" ON public.organizations
  FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins can delete organizations" ON public.organizations
  FOR DELETE TO authenticated USING (public.is_admin());

-- Profiles: keep own-user access (each user manages their own profile data)
-- but also allow admins to update any profile
CREATE POLICY "Admins can update any profile" ON public.profiles
  FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());