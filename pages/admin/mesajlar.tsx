import { ReactElement, useState, useEffect } from 'react'
import AdminLayout from '@/components/layout/AdminLayout'
import { NextPageWithLayout } from '../_app'
import { Dialog } from '@headlessui/react'
import { supabase } from '@/utils/supabaseClient'
import { toast } from 'react-hot-toast'

interface Message {
  id: number
  name: string
  email: string
  message: string
  created_at: string
}


const Mesajlar: NextPageWithLayout = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error
        setMessages(data || [])
      } catch (error) {
        console.error('Error fetching messages:', error)
        toast.error('Mesajlar yüklenirken bir hata oluştu')
      } finally {
        setLoading(false)
      }
    }

    fetchMessages()
  }, [])

  const openModal = (msg: Message) => {
    setSelectedMessage(msg)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setSelectedMessage(null)
  }

  return (
    <div className='max-w-5xl p-6'>
    <h1 className="text-2xl text-primary font-semibold mb-4">Gelen Mesajlar</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className="border border-neutral-300 rounded p-4 hover:shadow-sm transition cursor-pointer"
          onClick={() => openModal(msg)}
        >
          <h2 className="text-lg font-medium">{msg.name || 'İsimsiz'}</h2>
          <a
            href={`mailto:${msg.email}`}
            onClick={(e) => e.stopPropagation()}
            className="text-primary hover:underline text-sm"
          >
            {msg.email}
          </a>
          <p className="text-sm text-neutral-600 mt-2 line-clamp-2">
            {msg.message}
          </p>
          <p className="text-xs text-gray-400 mt-2">
            {new Date(msg.created_at).toLocaleDateString('tr-TR')}
          </p>
        </div>
      ))}
    </div>


      {/* Modal */}
      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-md max-w-md w-full p-6">
            <Dialog.Title className="text-xl font-semibold mb-2">
              {selectedMessage?.name}
            </Dialog.Title>
            <p className="text-sm text-neutral-600 mb-1">
              <span className="font-medium">Mail:</span>{' '}
              <a
                href={`mailto:${selectedMessage?.email}`}
                className="text-primary hover:underline"
              >
                {selectedMessage?.email}
              </a>
            </p>
            <div className="mt-4">
              <p className="whitespace-pre-line">{selectedMessage?.message}</p>
            </div>
            <button
              onClick={closeModal}
              className="mt-6 px-4 py-2 bg-primary text-white rounded hover:bg-blue-700"
            >
              Kapat
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  )
}

Mesajlar.getLayout = function PageLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}

export default Mesajlar
