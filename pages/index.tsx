import Button from "@/components/ui/button";
import { useEffect, useState } from "react";
import Head from "next/head";

import EduCard from "@/components/shared/eduCard";
import YoutubeData from "@/components/shared/youtubeData";

import { supabase } from "@/utils/supabaseClient";
import BlogCard from "@/components/shared/blogCard";
import Link from "next/link";


type BlogPost = {
  id: number;
  title: string;
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
          .limit(4);

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
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative min-h-[70vh] flex items-center justify-center">
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8 w-full">
          <div className="flex flex-col items-start gap-6 lg:w-1/2">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary dark:text-primaryDark leading-tight">
                Teknoloji ve Yazılım Dünyasına <span className="text-textColor dark:text-textColorDark">Modern Bir Bakış</span>
              </h1>
              <p className="text-base md:text-lg text-textColor/80 dark:text-textColorDark/80 leading-relaxed">
                Patitekno ile yazılım, tasarım ve teknoloji dünyasını keşfedin. Video eğitimler ve detaylı blog yazıları ile öğrenme yolculuğunuzda yanınızdayız.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/bulten"
                className="group bg-primary dark:bg-primaryDark text-white rounded-lg hover:bg-primary/90 dark:hover:bg-primaryDark/90 transition-all duration-300"
              >
                <span className="block p-3">Bültene Abone Ol</span>
              </Link>
              <Link
                href="/egitim"
                className="p-3 border-2 border-primary dark:border-primaryDark text-primary dark:text-primaryDark rounded-lg hover:bg-primary/10 dark:hover:bg-primaryDark/10 transition-colors duration-300"
              >
                Eğitimleri İncele
              </Link>
            </div>
          </div>

          <div>
            <img
              src="/Logos/LogoWithoutBg.png"
              alt="Patitekno Logo"
              className="w-full max-w-[400px] animate-float"
            />
          </div>
        </div>
      </div>

      {/* Popular Education Series */}
      <section className="py-16">
        <div className="w-full space-y-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-primary dark:text-primaryDark">Popüler Eğitim Serileri</h2>
            <p className="text-textColor/80 dark:text-textColorDark/80">En çok tercih edilen eğitim serilerimizi keşfedin</p>
          </div>

          {lessonsLoading ? (
            <div className="flex items-center justify-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary dark:border-primaryDark border-t-transparent"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {lessons.map((lesson) => (
                <EduCard key={lesson.id} lesson={lesson} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Latest Videos */}
      <section className="py-16">
        <div className="w-full space-y-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-primary dark:text-primaryDark">Son Yüklenen Videolar</h2>
            <p className="text-textColor/80 dark:text-textColorDark/80">YouTube kanalımızdaki en güncel içerikler</p>
          </div>
          <YoutubeData />
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-16">
        <div className="w-full space-y-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-primary dark:text-primaryDark">Son Yazılar</h2>
            <p className="text-textColor/80 dark:text-textColorDark/80">En güncel blog yazılarımızı inceleyin</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary dark:border-primaryDark border-t-transparent"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {posts.map((post) => (
                <BlogCard
                  key={post.id}
                  title={post.title}
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
      </section>

    </div>
  );
}
