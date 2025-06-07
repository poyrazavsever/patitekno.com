import React, { ReactNode } from 'react'
import SidebarAdmin from './SidebarAdmin'
import { Toaster } from 'react-hot-toast';

type AdminLayoutProps = {
    children : ReactNode;
};

const AdminLayout = ({children} : AdminLayoutProps) => {
  return (
    <div className='font-nunito'>
        <SidebarAdmin />

        <Toaster position='top-right'/>

        <main className='pl-72 pt-16'>
            {children}
        </main>
    </div>
  )
}

export default AdminLayout