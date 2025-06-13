import React, { ReactElement, useEffect, useState } from 'react'
import AdminLayout from '@/components/layout/AdminLayout'
import { NextPageWithLayout } from '../_app'
import { supabase } from '@/utils/supabaseClient'
import { toast } from 'react-hot-toast'
import { FiCopy, FiMail } from 'react-icons/fi'

type Subscriber = {
  email: string
  created_at: string
}

const Bulten: NextPageWithLayout = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const { data, error } = await supabase
          .from('newsletter_subscribers')
          .select('email, created_at')
          .order('created_at', { ascending: false })

        if (error) throw error
        setSubscribers(data || [])
      } catch (error) {
        console.error('Error fetching subscribers:', error)
        toast.error('Aboneler yüklenirken bir hata oluştu')
      } finally {
        setLoading(false)
      }
    }

    fetchSubscribers()
  }, [])

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email)
    toast.success('Email kopyalandı!')
  }

  const copyAllEmails = () => {
    const allEmails = subscribers.map(sub => sub.email).join('\n')
    navigator.clipboard.writeText(allEmails)
    toast.success('Tüm emailler kopyalandı!')
  }

  return (
    <div className="p-6 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-primary">Bülten Aboneleri</h1>
        <button
          onClick={copyAllEmails}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors cursor-pointer"
        >
          <FiCopy className="w-4 h-4" />
          Tümünü Kopyala ({subscribers.length})
        </button>
      </div>

      {loading ? (
        <div>Yükleniyor...</div>
      ) : (
        <div className="grid gap-2">
          {subscribers.map((subscriber) => (
            <div 
              key={subscriber.email}
              className="flex items-center justify-between p-3 bg-white rounded-lg border border-neutral-200 hover:border-primary transition-colors group"
            >
              <div className="flex items-center gap-2">
                <FiMail className="text-gray-400" />
                <span>{subscriber.email}</span>
              </div>
              <button
                onClick={() => copyEmail(subscriber.email)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:text-primary cursor-pointer"
                title="Email'i kopyala"
              >
                <FiCopy className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

Bulten.getLayout = function PageLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}

export default Bulten