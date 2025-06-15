import { useState, useEffect } from 'react';
import EduCard from '@/components/shared/eduCard';
import YoutubeData from '@/components/shared/youtubeData';
import BlogCard from '@/components/shared/blogCard';
import Button from '@/components/ui/button';
import { supabase } from '@/utils/supabaseClient';
import RecaptchaModal from '@/components/shared/reCaptcha'
import { toast } from 'react-hot-toast';

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

  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleVerify = async (token: string | null) => {
    if (!token) {
      toast.error('Lütfen robot olmadığınızı doğrulayın');
      return;
    }

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email }]);

      if (error) throw error;

      toast.success('Bültene başarıyla kaydoldunuz!');
      setEmail('');
    } catch (error) {
      console.error('Kayıt sırasında hata:', error);
      toast.error('Bir hata oluştu, lütfen tekrar deneyin');
    } finally {
      setIsModalOpen(false);
    }
  };


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
        <h3 className='text-2xl font-semibold text-primary dark:text-primaryDark'>Bültenimize Katıl</h3>
        <p className='text-textColor dark:text-textColorDark mb-2'>Yeni videolar, bloglar ve eğitimlerden ilk sen haberdar ol!</p>

        <form onSubmit={handleSubmit} className='flex w-full md:w-1/2 gap-2 mt-2'>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-posta adresiniz"
            className='w-36 md:w-fit flex-1 px-4 py-2 border border-neutral-300 dark:border-neutral-600 dark:placeholder:text-gray-400 rounded-md text-sm text-textColor focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primaryDark'
          />
          <button
            onClick={handleSubmit}
            className='text-xs md:text-base px-4 py-2 bg-primary dark:bg-primaryDark dark:text-backgroundDark text-background rounded-md hover:bg-primary/90 transition-colors'> Kayıt Ol </button>
        </form>
      </div>

      <RecaptchaModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onVerify={handleVerify}
      />

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
