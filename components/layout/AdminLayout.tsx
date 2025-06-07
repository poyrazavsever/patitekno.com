import React, { ReactNode } from 'react'
import SidebarAdmin from './SidebarAdmin'

type AdminLayoutProps = {
    children : ReactNode;
};

const AdminLayout = ({children} : AdminLayoutProps) => {
  return (
    <div className='font-nunito'>
        <SidebarAdmin />

        <main>
            {children}
        </main>
    </div>
  )
}

export default AdminLayout