import React, { useState, FormEvent, ChangeEvent } from 'react'
import dynamic from 'next/dynamic'
import { supabase } from '@/utils/supabaseClient'
import toast from 'react-hot-toast'
import 'react-markdown-editor-lite/lib/index.css'
import MarkdownIt from 'markdown-it'

const mdParser = new MarkdownIt()

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), { ssr: false })


const skillIcons = [
  'html',
  'css',
  'js',
  'ts',
  'react',
  'nextjs',
  'nodejs',
  'express',
  'mongodb',
  'postgres',
  'tailwind',
  'git',
  'github',
  'vscode',
  'redux',
  'docker',
  'mysql',
  'firebase',
  'supabase',
  'graphql',
  'sass',
  'webpack',
  'vite',
  'linux',
  'figma',
  'python',
  'django',
  'jest',
  'c#',
  'dotnet',
  'java',
  'androidstudio',
  'flutter',
  'kotlin',
  'azure',
  'aws',
] as const


type SkillIcon = typeof skillIcons[number]

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
  const [loading, setLoading] = useState(false)
  const [iconName, setIconName] = useState<SkillIcon>('html')

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')

      const { data, error } = await supabase
        .from('lessons')
        .insert([
          {
            title,
            content,
            video_link: videoLink,
            extra_links: extraLinks,
            icon_name: iconName, // Add icon name
            slug,
            created_at: new Date().toISOString(),
          }
        ])
        .select()

      if (error) throw error

      toast.success('Ders başarıyla eklendi!')

      // Reset form
      setTitle('')
      setContent('')
      setVideoLink('')
      setExtraLinks([{ label: '', url: '' }])
      setIconName('html') // Reset icon

    } catch (error: any) {
      toast.error('Ders eklenirken bir hata oluştu')
      console.error('Ders ekleme hatası:', error.message)
    } finally {
      setLoading(false)
    }
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
          renderHTML={text => mdParser.render(text)}
          onChange={handleEditorChange}
          className="border border-gray-300 rounded"
          view={{ menu: true, md: true, html: true }}
          canView={{
            menu: true,
            md: true,
            html: true,
            both: true,
            fullScreen: true,
            hideMenu: true
          }}
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Teknoloji İkonu</label>
        <div className="flex flex-wrap gap-2 p-2 border border-neutral-300 rounded">
          {skillIcons.map((icon) => (
            <button
              key={icon}
              type="button"
              onClick={() => setIconName(icon)}
              className={`p-2 rounded hover:bg-sky-100 transition-all ${iconName === icon ? 'bg-sky-100 ring-2 ring-primary' : ''
                }`}
            >
              <img
                src={`https://skillicons.dev/icons?i=${icon}`}
                alt={icon}
                className="w-8 h-8"
              />
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Seçili: {iconName}
        </p>
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
        disabled={loading}
        className="bg-primary rounded-full text-white font-semibold py-2 hover:opacity-80 cursor-pointer transition"
      >
        {loading ? 'Ekleniyor...' : 'Dersi Kaydet'}
      </button>
    </form>
  )
}

export default AddLesson
