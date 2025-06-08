import { ReactElement, useState } from 'react'
import { NextPageWithLayout } from '../_app'
import AdminLayout from '@/components/layout/AdminLayout'
import classNames from 'classnames'
import { MdEdit, MdDelete, MdLink } from "react-icons/md"
import AddLessonPost from '@/admin/addLessonPost'

const AdminLesson: NextPageWithLayout = () => {
  const [currentTab, setCurrentTab] = useState(0)

  const links = [
    { id: 0, name: "Mevcut Dersler" },
    { id: 1, name: "Ders Yazısı Ekle" },
    { id: 2, name: "Ders Ekle" },
  ]

  const eduList = [
    { name: "HTML 101", iconName: "html", link: "html" },
    { name: "CSS 101", iconName: "css", link: "css" },
    { name: "JavaScript 101", iconName: "js", link: "js" },
    { name: "TypeScript 101", iconName: "ts", link: "ts" },
  ]

  return (
    <div>
      <nav className="flex items-center gap-4 pb-6 text-textColor font-medium">
        {links.map((link) => (

          <button
            key={link.id}
            onClick={() => setCurrentTab(link.id)}
            className={classNames(
              "py-1 px-3 rounded-sm cursor-pointer transition-all",
              {
                "bg-primary text-background": currentTab === link.id,
              }
            )}
          >
            {link.name}
          </button>

        ))}
      </nav>

      {currentTab === 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          {eduList.map((edu, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-4 p-6 border border-neutral-200 rounded-md"
            >
              <img
                src={`https://skillicons.dev/icons?i=${edu.iconName}`}
                alt={`${edu.name} logo`}
                className="w-24 h-24"
              />
              <span className="font-medium text-textColor">{edu.name}</span>
              <div className="flex gap-4 text-xl text-gray-600">
                <button className="hover:text-blue-500 transition cursor-pointer" aria-label="Edit">
                  <MdEdit />
                </button>
                <button className="hover:text-red-500 transition cursor-pointer" aria-label="Delete">
                  <MdDelete />
                </button>
                <button className="hover:text-green-500 transition cursor-pointer -rotate-45" aria-label="Link">
                  <MdLink />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {currentTab === 1 && <AddLessonPost />}

    </div>
  )
}

AdminLesson.getLayout = function PageLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}

export default AdminLesson
