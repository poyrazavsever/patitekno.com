import Button from "@/components/ui/button";
import { useEffect, useState } from "react";
import Head from "next/head";

import EduCard from "@/components/shared/eduCard";
import YoutubeData from "@/components/shared/youtubeData";

import { supabase } from "@/utils/supabaseClient";
import BlogCard from "@/components/shared/blogCard";


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

export default function Home() {

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
            category: Array.isArray(post.category) ? post.category[0] : post.category,
          }))
        );
      } catch (error) {
        console.error('Error fetching posts:', error);
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
        console.error('Error fetching lessons:', error);
      } finally {
        setLessonsLoading(false);
      }
    };

    fetchLessons();
  }, []);

  return (
    <>
      <Head>
        <title>Pati Tekno | Teknoloji | Tasarım | Yazılım</title>
        <meta name="description" content="Pati Tekno: Teknoloji, tasarım ve yazılım dünyasına eğlenceli bir pencereden bak!" />
      </Head>
      <div>

        {/* Hero Section */}
        <div className="relative flex items-center justify-center my-16 md:my-48">
          <img src="/Logos/LogoWithoutBg.png" alt="background logo" className='w-48 md:w-[600px] absolute top-0 left-1/4 opacity-5 -z-10' />

          <div className="flex flex-col items-center gap-4 px-3 w-full md:w-2/3 text-center">
            <h1 className="text-lg md:text-2xl font-semibold text-primary dark:text-primaryDark">Teknoloji, Tasarım ve Yazılım Trendlerini Kaçırma!</h1>
            <p className="text-sm md:text-base font-medium text-textColor dark:text-textColorDark">Patitekno; yazılım, tasarım ve teknoloji dünyasını senin için sadeleştiriyor. YouTube videolarımla eş zamanlı yayınlanan yazılı içeriklerle istediğin türden kaynaklara ulaşabilirsin. Son güncellemeleri kaçırmamak için bültene kayıt olmayı unutma!</p>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Button name="Bültene Abone Ol" type={false} Icon size="normal" />
              <Button name="Eğitimleri İncele" type={true} Icon size="normal" />
            </div>
          </div>

        </div>


        <div className="flex flex-col items-start gap-6 mt-36">
        <h1 className="text-2xl font-semibold text-primary  dark:text-primaryDark">Popüler Eğitim Serileri</h1>
        {lessonsLoading ? (
          <div>Yükleniyor...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
            {lessons.map((lesson) => (
              <EduCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        )}
      </div>


        <div className="flex flex-col items-start gap-6 mt-36">
          <h1 className="text-2xl font-semibold text-primary dark:text-primaryDark">Son Yüklenen Videolar</h1>
          <YoutubeData />
        </div>

        <div className="flex flex-col items-start gap-4 mt-36">
          <h1 className="text-2xl font-semibold text-primary dark:text-primaryDark">Son Yazılar</h1>
          {loading ? (
            <div>Yükleniyor...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      </div>
    </>
  );
}
