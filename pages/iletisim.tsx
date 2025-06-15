import React, { useState } from 'react'
import { supabase } from '@/utils/supabaseClient'
import { toast } from 'react-hot-toast'
import RecaptchaModal from '@/components/shared/reCaptcha'


const logos = [
  {
    name: "youtube",
    link: "https://www.youtube.com/@patitekno"
  },
  {
    name: "instagram",
    link: "https://www.instagram.com/patitekno"
  },
  {
    name : "github",
    link: "https://www.github.com/organization/patitekno"
  }
]

const Iletisim = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsModalOpen(true)
  }

  const handleVerify = async (token: string | null) => {
    if (!token) {
      toast.error('Lütfen robot olmadığınızı doğrulayın')
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase
        .from('messages')
        .insert([
          {
            name: formData.name || "Anonim",
            email: formData.email,
            message: formData.message,
            created_at: new Date().toISOString()
          }
        ])

      if (error) throw error

      toast.success('Mesajınız başarıyla gönderildi!')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('Error sending message:', error)
      toast.error('Mesaj gönderilirken bir hata oluştu')
    } finally {
      setLoading(false)
      setIsModalOpen(false)
    }
  }

  return (
    <section className='pt-12 sm:pt-24 text-textColor'>

      {/* Başlık */}
      <div className='mb-8'>
        <h1 className='text-2xl font-semibold text-primary dark:text-primaryDark mb-4'>İletişim</h1>
        <p className='text-base text-textColor dark:text-textColorDark max-w-lg'>
          Görüş, öneri ya da iş birliği teklifin mi var? Aşağıdaki formu doldur veya sosyal medya hesaplarımızdan bize ulaş!
        </p>
      </div>

       <div className='items-start justify-between grid grid-cols-1 md:grid-cols-2 gap-16'>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <input
            type='text'
            name='name'
            placeholder='Adınız (Opsiyonel)'
            value={formData.name}
            onChange={handleChange}
            className='border border-neutral-300 dark:border-neutral-600 dark:text-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm'
          />

          <input
            type='email'
            name='email'
            placeholder='E-posta adresiniz'
            required
            value={formData.email}
            onChange={handleChange}
            className='border border-neutral-300 dark:border-neutral-600 dark:text-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm'
          />

          <textarea
            name='message'
            rows={6}
            placeholder='Mesajınız'
            required
            value={formData.message}
            onChange={handleChange}
            className='border border-neutral-300 dark:border-neutral-600 dark:text-gray-300 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none'
          />

          <button 
            type="submit"
            disabled={loading}
            className="w-full md:w-auto px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
          >
            {loading ? "Gönderiliyor..." : "Gönder"}
          </button>

        </form>

        {/* ...existing social media section... */}
      </div>

      <RecaptchaModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onVerify={handleVerify}
      />
    </section>
  )
}

export default Iletisim
