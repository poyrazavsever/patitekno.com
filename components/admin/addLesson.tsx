import React, { useState, FormEvent, ChangeEvent } from 'react'
import dynamic from 'next/dynamic'
import 'react-markdown-editor-lite/lib/index.css'

// Dinamik import - SSR hatası olmaması için
const MdEditor = dynamic(() => import('react-markdown-editor-lite'), { ssr: false })

// Tipler
interface ExtraLink {
  label: string
  url: string
}

const AddLesson: React.FC = () => {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [videoLink, setVideoLink] = useState<string>('')
  const [extraLinks, setExtraLinks] = useState<ExtraLink[]>([{ label: '', url: '' }])

  const handleEditorChange = ({ text }: { text: string }) => {
    setContent(text)
  }

  const handleExtraLinkChange = (
    index: number,
    field: keyof ExtraLink,
    value: string
  ) => {
    const updatedLinks = [...extraLinks]
    updatedLinks[index][field] = value
    setExtraLinks(updatedLinks)
  }

  const addExtraLink = () => {
    setExtraLinks([...extraLinks, { label: '', url: '' }])
  }

  const removeExtraLink = (index: number) => {
    setExtraLinks(extraLinks.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const lessonData = {
      title,
      content,
      video_link: videoLink,
      extra_links: extraLinks,
    }

    console.log('Yeni Ders:', lessonData)
    alert('Ders başarıyla eklendi.')

    // Supabase gönderimi vs. burada yapılabilir
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl border border-neutral-200 rounded-md p-6 flex flex-col gap-6"
    >
      <div>
        <label className="block mb-1 font-semibold">Ders Başlığı</label>
        <input
          type="text"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          className="w-full border border-neutral-300 rounded px-3 py-2"
          placeholder="Örn: React Giriş"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">İçerik (Markdown)</label>
        <MdEditor
          style={{ height: '300px' }}
          value={content}
          renderHTML={(text) => <div>{text}</div>}
          onChange={handleEditorChange}
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Video Linki</label>
        <input
          type="url"
          value={videoLink}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setVideoLink(e.target.value)}
          className="w-full border border-neutral-300 rounded px-3 py-2"
          placeholder="https://..."
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold">Ek Linkler</label>
        {extraLinks.map((link, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <input
              type="text"
              value={link.label}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleExtraLinkChange(index, 'label', e.target.value)
              }
              placeholder="Etiket (örn: Kaynak)"
              className="w-1/3 border border-neutral-300 px-2 py-1 rounded"
            />
            <input
              type="url"
              value={link.url}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleExtraLinkChange(index, 'url', e.target.value)
              }
              placeholder="https://..."
              className="w-2/3 border border-neutral-300 px-2 py-1 rounded"
            />
            <button
              type="button"
              onClick={() => removeExtraLink(index)}
              className="text-red-500 rounded-full w-6 h-6 flex items-center justify-center border border-red-500 text-lg cursor-pointer hover:bg-red-100 transition-all"
            >
              ×
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addExtraLink}
          className="text-sm text-primary rounded-full mt-1 cursor-pointer p-2 hover:bg-sky-200 transition-all"
        >
          + Link Ekle
        </button>
      </div>

      <button
        type="submit"
        className="bg-primary rounded-full text-white font-semibold py-2 hover:opacity-80 cursor-pointer transition"
      >
        Dersi Kaydet
      </button>
    </form>
  )
}

export default AddLesson
