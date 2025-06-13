import { useState, useEffect } from 'react';
import EduCard from '@/components/shared/eduCard';
import YoutubeData from '@/components/shared/youtubeData';
import BlogCard from '@/components/shared/blogCard';
import Button from '@/components/ui/button';
import { supabase } from '@/utils/supabaseClient';

type BlogPost = {
  id: number;
  title: string;
  description: string;
  slug: string;
  created_at: string;
  category: {
    name: string;
  };
};

type Lesson = {
  id: number;
  title: string;
  icon_name: string;
  slug: string;
};

export default function Bulten() {

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [lessonsLoading, setLessonsLoading] = useState(true);


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select(`
            id,
            title,
            content,
            slug,
            created_at,
            category:categories(name)
          `)
          .order('created_at', { ascending: false })
          .limit(3);

        if (error) throw error;
        setPosts(
          (data || []).map((post: any) => ({
            ...post,
            category: Array.isArray(post.category) ? post.category[0] : post.category
          }))
        );
      } catch (error) {
        console.error('Blog yazıları yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const { data, error } = await supabase
          .from('lessons')
          .select('id, title, icon_name, slug')
          .order('created_at', { ascending: false })
          .limit(3);

        if (error) throw error;
        setLessons(data || []);
      } catch (error) {
        console.error('Dersler yüklenirken hata:', error);
      } finally {
        setLessonsLoading(false);
      }
    };

    fetchLessons();
  }, []);


  return (
    <div className="py-12 space-y-20">

      <div className='flex flex-col items-start gap-4 mt-6 w-full'>

        <h3 className='text-2xl font-semibold text-primary'>Bültenimize Katıl</h3>

        <p className='text-textColor mb-2'>Yeni videolar, bloglar ve eğitimlerden ilk sen haberdar ol!</p>

        <form className='flex w-full md:w-1/2 gap-2 mt-2'>

          <input
            type="email"
            required
            placeholder="E-posta adresiniz"
            className='flex-1 px-4 py-2 border border-neutral-300 rounded-md text-sm text-textColor focus:outline-none focus:ring-2 focus:ring-primary'
          />

          <Button name='Kayıt Ol' type={false} Icon size="normal" />

        </form>

      </div>

      <div className="flex flex-col items-start gap-6 mt-36">
        <h1 className="text-2xl font-semibold text-primary">Son Videolardan Haberdar Ol!</h1>
        <YoutubeData />
      </div>

      <div className="flex flex-col items-start gap-6 mt-36">
        <h1 className="text-2xl font-semibold text-primary">Son Eğitimlerimizi Kaçırma!</h1>
        {lessonsLoading ? (
          <div>Yükleniyor...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
            {lessons.map((lesson) => (
              <EduCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col items-start gap-4 mt-36">
        <h1 className="text-2xl font-semibold text-primary">Son Yazılarımızı Kaçırma!</h1>
        {loading ? (
          <div>Yükleniyor...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {posts.map((post) => (
              <BlogCard
                key={post.id}
                title={post.title}
                description={post.description}
                date={new Date(post.created_at).toLocaleDateString('tr-TR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
                slug={post.slug}
                category={post.category?.name}
              />
            ))}
          </div>
        )}
      </div>

      {/* Yakında Podcast Serimi buraya koymak istiyorum. */}

    </div>
  );
}
