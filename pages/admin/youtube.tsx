import React, { ReactElement, useEffect, useState } from 'react'
import { supabase } from '@/utils/supabaseClient'
import toast from 'react-hot-toast'
import AdminLayout from '@/components/layout/AdminLayout'
import { NextPageWithLayout } from '../_app'


type YoutubeVideo = {
  id: number
  video_name: string
  video_link: string
  video_desc: string
  show: boolean
  created_at?: string
}

const initialForm: Omit<YoutubeVideo, 'id'> = {
  video_name: '',
  video_link: '',
  video_desc: '',
  show: true,
}

const Youtube :  NextPageWithLayout = () => {
  const [videos, setVideos] = useState<YoutubeVideo[]>([])
  const [form, setForm] = useState<Omit<YoutubeVideo, 'id'>>(initialForm)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  // Videoları çek
  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('youtube')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) toast.error('Videolar alınamadı!')
    setVideos(data || [])
    setLoading(false)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement
    const { name, value, type } = target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? target.checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (editingId) {
        // Güncelle
        const { error } = await supabase
          .from('youtube')
          .update(form)
          .eq('id', editingId)
        if (error) throw error
        toast.success('Video güncellendi!')
      } else {
        // Ekle
        const { error } = await supabase
          .from('youtube')
          .insert([form])
        if (error) throw error
        toast.success('Video eklendi!')
      }
      setForm(initialForm)
      setEditingId(null)
      fetchVideos()
    } catch (error: any) {
      toast.error('Bir hata oluştu')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (video: YoutubeVideo) => {
    setForm({
      video_name: video.video_name,
      video_link: video.video_link,
      video_desc: video.video_desc,
      show: video.show,
    })
    setEditingId(video.id)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Silmek istediğinize emin misiniz?')) return
    setLoading(true)
    try {
      const { error } = await supabase.from('youtube').delete().eq('id', id)
      if (error) throw error
      toast.success('Video silindi!')
      fetchVideos()
    } catch (error: any) {
      toast.error('Silinemedi!')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl p-6 border border-neutral-200 rounded-md mt-10">
      <h1 className="text-2xl font-semibold mb-6 text-primary">
        YouTube Video Yönetimi
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 text-sm font-medium text-textColor">
            Video Adı
          </label>
          <input
            type="text"
            name="video_name"
            className="w-full border border-neutral-300 rounded px-3 py-2"
            value={form.video_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-textColor">
            YouTube Linki
          </label>
          <input
            type="text"
            name="video_link"
            className="w-full border border-neutral-300 rounded px-3 py-2"
            value={form.video_link}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-textColor">
            Açıklama
          </label>
          <textarea
            name="video_desc"
            className="w-full border border-neutral-300 rounded px-3 py-2"
            value={form.video_desc}
            onChange={handleChange}
            rows={3}
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="show"
            checked={form.show}
            onChange={handleChange}
            id="show"
          />
          <label htmlFor="show" className="text-sm text-textColor">
            Sitede göster
          </label>
        </div>
        <button
          type="submit"
          className="w-full rounded-full px-6 py-2 bg-primary text-white cursor-pointer hover:opacity-90 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (editingId ? 'Güncelleniyor...' : 'Ekleniyor...') : (editingId ? 'Güncelle' : 'Ekle')}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setForm(initialForm)
              setEditingId(null)
            }}
            className="text-sm text-gray-500 underline"
          >
            İptal
          </button>
        )}
      </form>

      <div className="mt-10 space-y-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="border border-neutral-200 rounded p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-2 bg-white dark:bg-neutral-900"
          >
            <div>
              <div className="font-semibold text-primary">{video.video_name}</div>
              <div className="text-sm text-gray-500 mb-1">{video.video_desc}</div>
              <a
                href={video.video_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline text-sm"
              >
                İzle
              </a>
              <span
                className={`ml-2 text-xs px-2 py-1 rounded ${
                  video.show
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}
              >
                {video.show ? 'Yayında' : 'Gizli'}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(video)}
                className="px-3 py-1 rounded bg-yellow-400 text-white hover:bg-yellow-500 text-sm"
              >
                Düzenle
              </button>
              <button
                onClick={() => handleDelete(video.id)}
                className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 text-sm"
              >
                Sil
              </button>
            </div>
          </div>
        ))}
        {!loading && videos.length === 0 && (
          <div className="text-center text-gray-500">Hiç video eklenmemiş.</div>
        )}
      </div>
    </div>
  )
}

Youtube.getLayout = function PageLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
  };
export default Youtube