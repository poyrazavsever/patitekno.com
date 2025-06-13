import EduCard from '@/components/shared/eduCard'
import React, { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabaseClient'

type Lesson = {
  id: number
  title: string
  icon_name: string
  slug: string
}

const Egitim = () => {
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const { data, error } = await supabase
          .from('lessons')
          .select('id, title, icon_name, slug')
          .order('title')

        if (error) throw error
        setLessons(data || [])
      } catch (error) {
        console.error('Error fetching lessons:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLessons()
  }, [])

  return (
    <div>
      <div className="flex flex-col items-start gap-6 mt-12">
        <h1 className="text-2xl font-semibold text-primary">Youtube Eğitimleri</h1>
        
        {loading ? (
          <div className="w-full text-center py-8">Yükleniyor...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
            {lessons.map((lesson) => (
              <EduCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Egitim