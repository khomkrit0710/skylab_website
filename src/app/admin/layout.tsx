'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { LayoutDashboard, FolderPlus, Folders, LogOut, Menu, X } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      } else if (pathname !== '/admin/login') {
        router.push('/admin/login');
      }
      setLoading(false);
    }
    getUser();
  }, [pathname, router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#030014]">
        <div className="w-12 h-12 border-4 border-t-[#6366f1] border-r-transparent border-b-[#a855f7] border-l-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (!user) {
    return null;
  }

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Projects', href: '/admin/projects', icon: Folders },
    { name: 'Add Project', href: '/admin/projects/new', icon: FolderPlus },
  ];

  const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`);

  return (
    <div className="flex h-screen bg-[#030014]">
      {/* Sidebar for mobile */}
      <div className={`
        fixed inset-0 z-50 lg:hidden bg-black/70 backdrop-blur-sm transition-opacity 
        ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `} onClick={() => setSidebarOpen(false)}>
        <div 
          className={`
            fixed inset-y-0 left-0 z-50 w-64 bg-[#070627] border-r border-white/10 
            transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <Link href="/" className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 flex items-center justify-center">
                <span className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent font-bold">SL</span>
              </div>
              <span className="ml-3 text-xl font-semibold text-white">Admin</span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="mt-4 px-2 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center px-3 py-3 text-sm font-medium rounded-md
                  ${isActive(item.href)
                    ? 'bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 text-white'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }
                `}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="absolute bottom-0 w-full border-t border-white/10 p-4">
            <button
              onClick={handleSignOut}
              className="flex w-full items-center px-3 py-3 text-sm font-medium text-red-400 hover:bg-red-400/10 rounded-md"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-[#070627] border-r border-white/10">
        <div className="flex-1 flex flex-col">
          <div className="flex items-center h-16 px-4 border-b border-white/10">
            <Link href="/" className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 flex items-center justify-center">
                <span className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent font-bold">SL</span>
              </div>
              <span className="ml-3 text-xl font-semibold text-white">Admin</span>
            </Link>
          </div>
          <nav className="mt-4 px-2 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center px-3 py-3 text-sm font-medium rounded-md
                  ${isActive(item.href)
                    ? 'bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 text-white'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }
                `}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleSignOut}
            className="flex w-full items-center px-3 py-3 text-sm font-medium text-red-400 hover:bg-red-400/10 rounded-md"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sign out
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        <header className="bg-[#070627] border-b border-white/10 lg:hidden">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="text-gray-400 hover:text-white focus:outline-none"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="ml-4">
                <Link href="/" className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 flex items-center justify-center">
                    <span className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent font-bold">SL</span>
                  </div>
                  <span className="ml-2 text-lg font-semibold text-white">Admin</span>
                </Link>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
} 