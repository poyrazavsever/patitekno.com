import { ReactElement, useState, useEffect } from 'react'
import { NextPageWithLayout } from '../_app'
import AdminLayout from '@/components/layout/AdminLayout'
import classNames from 'classnames'
import { MdEdit, MdDelete, MdLink } from "react-icons/md"
import AddLessonPost from '@/components/admin/addLessonPost'
import AddLesson from '@/components/admin/addLesson'
import Modal from '@/components/shared/modal'
import { supabase } from '@/utils/supabaseClient'
import { toast } from 'react-hot-toast'

type Lesson = {
  id: number
  title: string
  icon_name: string
  slug: string
}

const AdminLesson: NextPageWithLayout = () => {
  const [currentTab, setCurrentTab] = useState(0)
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const links = [
    { id: 0, name: "Mevcut Dersler" },
    { id: 1, name: "Ders Yazısı Ekle" },
    { id: 2, name: "Ders Ekle" },
  ]

  useEffect(() => {
    fetchLessons()
  }, [])

  const fetchLessons = async () => {
    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .order('title')

    if (error) {
      toast.error('Dersler yüklenirken hata oluştu')
    } else {
      setLessons(data || [])
    }
  }

  const handleDelete = async () => {
    if (!selectedLesson) return

    setLoading(true)
    const { error } = await supabase
      .from('lessons')
      .delete()
      .eq('id', selectedLesson.id)

    setLoading(false)
    setIsDeleteModalOpen(false)

    if (error) {
      toast.error('Ders silinirken hata oluştu')
    } else {
      toast.success('Ders başarıyla silindi')
      fetchLessons()
    }
  }

  const handleEdit = async (updatedLesson: Partial<Lesson>) => {
    if (!selectedLesson) return

    setLoading(true)
    const { error } = await supabase
      .from('lessons')
      .update(updatedLesson)
      .eq('id', selectedLesson.id)

    setLoading(false)
    setIsEditModalOpen(false)

    if (error) {
      toast.error('Ders güncellenirken hata oluştu')
    } else {
      toast.success('Ders başarıyla güncellendi')
      fetchLessons()
    }
  }


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
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="flex flex-col items-center gap-4 p-6 border border-neutral-200 rounded-md"
            >
              <img
                src={`https://skillicons.dev/icons?i=${lesson.icon_name}`}
                alt={`${lesson.title} logo`}
                className="w-24 h-24"
              />
              <span className="font-medium text-textColor">{lesson.title}</span>
              <div className="flex gap-4 text-xl text-gray-600">
                <button 
                  onClick={() => {
                    setSelectedLesson(lesson)
                    setIsEditModalOpen(true)
                  }}
                  className="hover:text-blue-500 transition cursor-pointer" 
                  aria-label="Edit"
                >
                  <MdEdit />
                </button>
                <button 
                  onClick={() => {
                    setSelectedLesson(lesson)
                    setIsDeleteModalOpen(true)
                  }}
                  className="hover:text-red-500 transition cursor-pointer" 
                  aria-label="Delete"
                >
                  <MdDelete />
                </button>
                <a 
                  href={`/egitim/${lesson.slug}`}
                  className="hover:text-green-500 transition cursor-pointer -rotate-45" 
                  aria-label="Link"
                >
                  <MdLink />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Dersi Düzenle"
      >
        {selectedLesson && (
          <form onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            handleEdit({
              title: formData.get('title') as string,
              icon_name: formData.get('icon_name') as string,
              slug: formData.get('slug') as string,
            })
          }}>
            <div className="space-y-4">
              <div>
                <label className="block mb-1">Ders Adı</label>
                <input
                  name="title"
                  defaultValue={selectedLesson.title}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block mb-1">İkon Adı</label>
                <input
                  name="icon_name"
                  defaultValue={selectedLesson.icon_name}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block mb-1">Slug</label>
                <input
                  name="slug"
                  defaultValue={selectedLesson.slug}
                  className="w-full border p-2 rounded"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-2 rounded"
              >
                {loading ? 'Kaydediliyor...' : 'Kaydet'}
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* Delete Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Dersi Sil"
      >
        <div className="space-y-4">
          <p>Bu dersi silmek istediğinizden emin misiniz?</p>
          <div className="flex gap-4">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="flex-1 bg-gray-200 py-2 rounded"
            >
              İptal
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="flex-1 bg-red-500 text-white py-2 rounded"
            >
              {loading ? 'Siliniyor...' : 'Sil'}
            </button>
          </div>
        </div>
      </Modal>


      {currentTab === 1 && <AddLessonPost />}

      {currentTab === 2 && <AddLesson />}

    </div>
  )
}

AdminLesson.getLayout = function PageLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}

export default AdminLesson
