import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useRouter } from 'next/router';
import { supabase } from '@/utils/supabaseClient';
import { toast } from 'react-hot-toast';


type BlogPost = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  slug: string;
  category: {
    name: string;
  };
};

const BlogDetail = () => {
  const router = useRouter();
  const { slug } = router.query; // Changed from slugRoute to slug to match file name
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!router.isReady) return; // Add check for router readiness
      if (!slug) return;

      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select(`
            id,
            title,
            content,
            created_at,
            slug,
            category:categories(name)
          `)
          .eq('slug', slug)
          .single();

        if (error) throw error;
        setPost({
          ...data,
          category: Array.isArray(data.category) ? data.category[0] : data.category
        });
      } catch (error) {
        console.error('Error fetching post:', error);
        toast.error('Blog yazısı yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, router.isReady]);

  if (loading) {
    return (
      <>
        <div className="max-w-6xl mx-auto pt-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 dark:bg-primary rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-primary rounded w-1/4"></div>
            <div className="h-96 bg-gray-200 dark:bg-primary rounded"></div>
          </div>
        </div>
      </>
    );
  }

  if (!post) {
    return (
      <div className="max-w-6xl mx-auto pt-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-200">Blog yazısı bulunamadı</h1>
        <button
          onClick={() => router.push('/blog')}
          className="mt-4 text-primary dark:text-primaryDark hover:underline"
        >
          ← Blog'a Dön
        </button>
      </div>
    );
  }

  return (
    <article className="max-w-6xl mx-auto pt-8 px-4 md:px-0">
      <div className="space-y-8">
        {/* Header */}
        <header className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-200">{post.title}</h1>
          <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
            <time dateTime={post.created_at}>
              {new Date(post.created_at).toLocaleDateString('tr-TR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <span>•</span>
            <span>{post.category.name}</span>
          </div>
        </header>

        {/* Content */}
        <div className="md-custom">
          <ReactMarkdown>
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-8 border-t border-neutral-300">
          <button
            onClick={() => router.push('/blog')}
            className="text-primary hover:underline cursor-pointer"
          >
            ← Blog'a Dön
          </button>
        </div>
      </div>
    </article>
  );
};

export default BlogDetail;