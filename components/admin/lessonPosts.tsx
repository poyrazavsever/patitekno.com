import React, { useState, useEffect } from 'react'
import { supabase } from '@/utils/supabaseClient'
import { toast } from 'react-hot-toast'
import { MdEdit, MdDelete } from 'react-icons/md'

type Lesson = {
  id: number
  title: string
}

type LessonPost = {
  id: number
  title: string
  content: string
  video_link: string
  created_at: string
  lesson_id: number
  lesson: Lesson
}

const LessonsPosts = () => {
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [posts, setPosts] = useState<LessonPost[]>([])
  const [selectedLessonId, setSelectedLessonId] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<LessonPost | null>(null)
  const [editForm, setEditForm] = useState({
    title: '',
    content: '',
    video_link: ''
  })

  const handleDelete = async (post: LessonPost) => {
    if (!confirm('Bu yazıyı silmek istediğinizden emin misiniz?')) return

    setLoading(true)
    const { error } = await supabase
      .from('lesson_posts')
      .delete()
      .eq('id', post.id)

    setLoading(false)

    if (error) {
      toast.error('Yazı silinirken hata oluştu')
    } else {
      toast.success('Yazı başarıyla silindi')
      // Listeyi güncelle
      const updatedPosts = posts.filter(p => p.id !== post.id)
      setPosts(updatedPosts)
    }
  }

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPost) return

    setLoading(true)
    const { error } = await supabase
      .from('lesson_posts')
      .update({
        title: editForm.title,
        content: editForm.content,
        video_link: editForm.video_link
      })
      .eq('id', selectedPost.id)

    setLoading(false)

    if (error) {
      toast.error('Yazı güncellenirken hata oluştu')
    } else {
      toast.success('Yazı başarıyla güncellendi')
      setIsEditModalOpen(false)
      // Listeyi güncelle
      const updatedPosts = posts.map(post => 
        post.id === selectedPost.id 
          ? { ...post, ...editForm }
          : post
      )
      setPosts(updatedPosts)
    }
  }

  const openEditModal = (post: LessonPost) => {
    setSelectedPost(post)
    setEditForm({
      title: post.title,
      content: post.content,
      video_link: post.video_link
    })
    setIsEditModalOpen(true)
  }

  // Dersleri yükle
  useEffect(() => {
    const fetchLessons = async () => {
      const { data, error } = await supabase
        .from('lessons')
        .select('id, title')
        .order('title')

      if (error) {
        toast.error('Dersler yüklenirken hata oluştu')
      } else {
        setLessons(data || [])
      }
    }

    fetchLessons()
  }, [])

  // Seçili derse göre yazıları yükle
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      console.log('Fetching posts, selectedLessonId:', selectedLessonId)
      
      const query = supabase
        .from('lesson_posts')
        .select(`
          id,
          title,
          content,
          video_link,
          created_at,
          lesson_id,
          lesson:lessons (id, title)
        `)
        .order('created_at', { ascending: false })
  
      if (selectedLessonId !== 0) {
        query.eq('lesson_id', selectedLessonId)
      }
  
      const { data, error } = await query
      console.log('Query result:', { data, error })
  
      setLoading(false)
  
      if (error) {
        toast.error('Yazılar yüklenirken hata oluştu')
        console.error('Error fetching posts:', error)
      } else {
        setPosts(
          (data || []).map((post: any) => ({
            ...post,
            lesson: Array.isArray(post.lesson) ? post.lesson[0] : post.lesson
          }))
        )
      }
    }
  
    fetchPosts()
  }, [selectedLessonId])

  return (
    <div className="space-y-6">
    <div>
      <label className="block mb-1 font-semibold" htmlFor="lesson">Ders Seçin</label>
      <select
        id="lesson"
        value={selectedLessonId}
        onChange={(e) => setSelectedLessonId(Number(e.target.value))}
        className="w-full border border-gray-300 rounded px-3 py-2"
      >
        <option value="0">Tüm Dersler</option>
        {lessons.map((lesson) => (
          <option key={lesson.id} value={lesson.id}>
            {lesson.title}
          </option>
        ))}
      </select>
    </div>

    {loading ? (
        <div className="text-center py-4">Yükleniyor...</div>
      ) : (
        <div className="grid gap-4">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <div 
                key={post.id} 
                className="border border-gray-200 rounded-lg p-4 space-y-2"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{post.title}</h3>
                    <div className="text-sm text-gray-500 space-x-4">
                      <span>Ders: {post.lesson?.title}</span>
                      <span>Tarih: {new Date(post.created_at).toLocaleDateString('tr-TR')}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(post)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                    >
                      <MdEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(post)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                    >
                      <MdDelete size={20} />
                    </button>
                  </div>
                </div>
                {post.video_link && (
                  <a 
                    href={post.video_link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-sm"
                  >
                    Video Link
                  </a>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500">
              {selectedLessonId !== 0 ? 'Bu derse ait yazı bulunamadı' : 'Hiç ders yazısı bulunamadı'}
            </div>
          )}
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <h2 className="text-xl font-semibold mb-4">Yazıyı Düzenle</h2>
            <form onSubmit={handleEdit} className="space-y-4">
              <div>
                <label className="block mb-1">Başlık</label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={e => setEditForm({...editForm, title: e.target.value})}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">İçerik</label>
                <textarea
                  value={editForm.content}
                  onChange={e => setEditForm({...editForm, content: e.target.value})}
                  className="w-full border rounded p-2 h-32"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Video Link</label>
                <input
                  type="url"
                  value={editForm.video_link}
                  onChange={e => setEditForm({...editForm, video_link: e.target.value})}
                  className="w-full border rounded p-2"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border rounded"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-primary text-white rounded"
                >
                  {loading ? 'Kaydediliyor...' : 'Kaydet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
  </div>
  )
}

export default LessonsPosts