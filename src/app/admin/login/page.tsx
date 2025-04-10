'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      router.push('/admin/dashboard');
    } catch (error: any) {
      setError(error.message || 'An error occurred during sign in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#030014]">
      <div className="w-full max-w-md p-8 space-y-8 bg-black/30 backdrop-blur-xl rounded-xl border border-white/10">
        <div className="text-center">
          <Link href="/" className="inline-block mb-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 flex items-center justify-center">
              <span className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent text-2xl font-bold">SL</span>
            </div>
          </Link>
          <h2 className="text-3xl font-bold text-white">Admin Login</h2>
          <p className="mt-2 text-gray-400">Sign in to access the dashboard</p>
        </div>
        
        {error && (
          <div className="p-4 text-sm text-red-400 border border-red-400/30 rounded-lg bg-red-400/10">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 mt-1 bg-black/20 border border-white/10 rounded-lg focus:ring-[#6366f1] focus:border-[#6366f1] text-white"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 mt-1 bg-black/20 border border-white/10 rounded-lg focus:ring-[#6366f1] focus:border-[#6366f1] text-white"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full h-12 overflow-hidden rounded-lg bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-medium"
          >
            <span className="absolute inset-0 flex items-center justify-center w-full h-full transition-all duration-300 ease-out">
              {loading ? 'Signing in...' : 'Sign in'}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
} 