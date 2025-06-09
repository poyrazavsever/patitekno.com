import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import 'react-markdown-editor-lite/lib/index.css'

// SSR uyumluluğu için dinamik import
const MdEditor = dynamic(() => import('react-markdown-editor-lite'), { ssr: false })

const AddLessonPost = () => {
  const [lessonName, setLessonName] = useState('')
  const [content, setContent] = useState('')
  const [videoLink, setVideoLink] = useState('')

  const handleEditorChange = ({ text } : any) => {
    setContent(text)
  }

  const handleSubmit = (e : any) => {
    e.preventDefault()
    // Burada verileri backend'e gönderme işlemi yapılabilir
    console.log({
      lessonName,
      content,
      videoLink,
    })
    alert('Ders yazısı kaydedildi!')
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
