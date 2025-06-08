import { ReactElement, useState } from 'react'
import { NextPageWithLayout } from '../_app'
import AdminLayout from '@/components/layout/AdminLayout'
import classNames from 'classnames'

const AdminLesson : NextPageWithLayout = () => {

  const [currentTab, setCurrentTab] = useState(0)

  const links = [
    {
        id: 0,
        name: "Mevcut Dersler"
    },
    {
        id: 1,
        name: "Ders Yazısı Ekle"
    },
    {
        id: 2,
        name: "Ders Ekle"
    },
]

  return (
    <div>
        <nav className="flex items-center gap-4 pb-6 text-textColor font-medium">
            {
            links.map((link) => (
                <button key={link.id} onClick={() => setCurrentTab(link.id)} className={classNames(
                  "py-1 px-3 rounded-sm cursor-pointer transition-all",
                  {
                    "bg-primary text-background": currentTab == link.id
                  }
                )}>{link.name}</button>
            ))
           }
        </nav>
    </div>
  )
}

AdminLesson.getLayout = function PageLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AdminLesson