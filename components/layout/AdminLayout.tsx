import React, { ReactNode, useEffect } from 'react'
import SidebarAdmin from './SidebarAdmin'
import { Toaster } from 'react-hot-toast';
import { supabase } from '@/utils/supabaseClient';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

type AdminLayoutProps = {
  children: ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        toast.error('Bu sayfaya erişmek için giriş yapmalısınız!');
        router.push('/');
      }
    };

    checkAuth();
  }, [router]);

  return (
    <div className='font-nunito'>
      <SidebarAdmin />

      <Toaster position='top-right' />

      <main className='pl-72 pt-16'>
        {children}
      </main>
    </div>
  )
}

export default AdminLayout