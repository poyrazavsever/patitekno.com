import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import ReactMarkdown from 'react-markdown'
import { supabase } from '@/utils/supabaseClient'
import { toast } from 'react-hot-toast'
import Sidebar from '@/components/layout/Sibebar'
import { FaYoutube } from 'react-icons/fa'

type LessonPost = {
  id: number
  title: string
  content: string
  video_link: string
  lesson_id: number
  created_at: string
}

const Lesson = () => {
  const router = useRouter()
  const { lesson } = router.query
  console.log('Lesson slug:', lesson)
  
  const [posts, setPosts] = useState<LessonPost[]>([])
  const [selectedPost, setSelectedPost] = useState<LessonPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      if (!router.isReady || !lesson) return

      try {
        // First get the lesson_id from lessons table
        const { data: lessonData, error: lessonError } = await supabase
          .from('lessons')
          .select('id')
          .eq('slug', lesson)
          .single()

        if (lessonError) throw lessonError

        // Then get all posts for this lesson
        const { data: postsData, error: postsError } = await supabase
          .from('lesson_posts')
          .select('*')
          .eq('lesson_id', lessonData.id)
          .order('created_at')

        if (postsError) throw postsError

        setPosts(postsData)
        if (postsData && postsData.length > 0) {
          setSelectedPost(postsData[0])
        }
      } catch (error) {
        console.error('Error fetching posts:', error)
        toast.error('Dersler yüklenirken bir hata oluştu')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [lesson, router.isReady])

  return (
    <div className="flex">
      <Sidebar 
        title={`${lesson} Ders Notları`}
        items={posts}
        selectedItemId={selectedPost?.id}
        onItemClick={setSelectedPost}
      />

      <main className="lex-1 min-h-screen py-8 w-full">
        {selectedPost ? (
          <div className="w-full">

            <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-primaryDark mb-2">
                {selectedPost.title}
              </h1>
              {selectedPost.video_link && (
                <a
                  href={selectedPost.video_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 shadow-sm"
                >
                  <FaYoutube />
                  Video Dersini İzle
                </a>
              )}
            </div>

            <div className='flex items-center justify-between'>
              <p className="text-sm text-gray-500 dark:text-gray-200 mb-4">
                {new Date(selectedPost.created_at).toLocaleDateString('tr-TR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-200 mb-4">
                {selectedPost.content.length} karakter
              </p>
            </div>

            <hr className='border border-neutral-300 dark:border-gray-600'/>
            
            <div className="md-custom mt-8">
              <ReactMarkdown>{selectedPost.content}</ReactMarkdown>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Bu derse ait içerik bulunamadı
          </div>
        )}
      </main>
    </div>
  )
}

export default Lesson