import React, { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabaseClient'

type YoutubeVideo = {
  id: number
  video_name: string
  video_link: string
  video_desc: string
  show: boolean
}

const YoutubeData = () => {
  const [videos, setVideos] = useState<YoutubeVideo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVideos = async () => {
      const { data, error } = await supabase
        .from('youtube')
        .select('*')
        .eq('show', true)
        .order('id', { ascending: false })
      setVideos(data || [])
      setLoading(false)
    }
    fetchVideos()
  }, [])

  // YouTube linkinden video ID'sini al ve Shorts kontrolü yap
  const getYoutubeEmbed = (url: string) => {
    // Shorts URL kontrolü
    if (url.includes('/shorts/')) {
      const shortsId = url.split('/shorts/')[1].split('?')[0]
      return `https://www.youtube.com/embed/${shortsId}?rel=0`
    }

    // Normal video URL kontrolü
    const match = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    )
    const videoId = match ? match[1] : ''
    return `https://www.youtube.com/embed/${videoId}?rel=0`
  }

  return (
    <section className='w-full'>
      {loading ? (
        <div>Yükleniyor...</div>
      ) : videos.length === 0 ? (
        <div>Henüz video eklenmemiş.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div key={video.id} className="border border-neutral-300 dark:border-neutral-600 rounded-md p-4 flex flex-col">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <iframe
                  src={getYoutubeEmbed(video.video_link)}
                  title={video.video_name}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded"
                />
              </div>
              <h3 className="text-lg font-semibold text-primary dark:text-primaryDark mb-2">{video.video_name}</h3>
              <p className="text-sm text-textColor dark:text-textColorDark">{video.video_desc}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default YoutubeData