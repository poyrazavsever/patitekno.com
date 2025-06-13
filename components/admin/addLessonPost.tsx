import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import 'react-markdown-editor-lite/lib/index.css'
import { supabase } from '@/utils/supabaseClient'
import { toast } from 'react-hot-toast'

// SSR uyumluluğu için dinamik import
const MdEditor = dynamic(() => import('react-markdown-editor-lite'), { ssr: false })

type Lesson = {
  id: number
  title: string
}

const AddLessonPost = () => {
  const [lessonName, setLessonName] = useState('')
  const [content, setContent] = useState('')
  const [videoLink, setVideoLink] = useState('')
  const [loading, setLoading] = useState(false)
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [selectedLessonId, setSelectedLessonId] = useState<number>(0)



  const handleEditorChange = ({ text } : any) => {
    setContent(text)
  }

  useEffect(() => {
    const fetchLessons = async () => {
      const { data, error } = await supabase
        .from('lessons')
        .select('id, title')
        .order('title')

      if (error) {
        toast.error('Dersler yüklenirken hata oluştu: ' + error.message)
      } else {
        setLessons(data || [])
      }
    }

    fetchLessons()
  }, [])


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedLessonId) {
      toast.error('Lütfen bir ders seçin')
      return
    }

    setLoading(true)
  
    const { error } = await supabase.from('lesson_posts').insert([
      {
        lesson_id: selectedLessonId,
        title: lessonName,
        content,
        video_link: videoLink,
      },
    ])
  
    setLoading(false)
  
    if (error) {
      toast.error('Kayıt başarısız: ' + error.message)
    } else {
      toast.success('Ders yazısı kaydedildi!')
      setLessonName('')
      setContent('')
      setVideoLink('')
      setSelectedLessonId(0)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl border border-neutral-200 p-6 flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-primary">Yeni Ders Yazısı Ekle</h1>
      <div>
        <label className="block mb-1 font-semibold" htmlFor="lessonName">Ders İsmi</label>
        <input
          id="lessonName"
          type="text"
          value={lessonName}
          onChange={(e) => setLessonName(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Ders ismini girin"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold" htmlFor="lesson">Ana Ders</label>
        <select
          id="lesson"
          value={selectedLessonId}
          onChange={(e) => setSelectedLessonId(Number(e.target.value))}
          className="w-full border border-gray-300 rounded px-3 py-2"
          required
        >
          <option value="">Ders Seçin</option>
          {lessons.map((lesson) => (
            <option key={lesson.id} value={lesson.id}>
              {lesson.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 font-semibold">İçerik (Markdown)</label>
        <MdEditor
          style={{ height: '300px' }}
          value={content}
          renderHTML={(text) => <div dangerouslySetInnerHTML={{ __html: text }} />}
          onChange={handleEditorChange}
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold" htmlFor="videoLink">Video Linki</label>
        <input
          id="videoLink"
          type="url"
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="https://..."
        />
      </div>

      <button
        type="submit"
        className="bg-primary text-white font-semibold py-2 rounded-full cursor-pointer hover:bg-primary-dark transition"
      >
        Kaydet
      </button>
    </form>
  )
}

export default AddLessonPost
