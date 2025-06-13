import { useEffect, useState } from "react";
import BlogCard from "@/components/shared/blogCard";
import { supabase } from "@/utils/supabaseClient";


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

const BlogList = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

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
          .order('created_at', { ascending: false });

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

  return (
    <div className="flex flex-col items-start gap-4 mt-16">
      <h1 className="text-2xl font-semibold text-primary">Blog Yazıları</h1>

      {loading ? (
        <div>Yükleniyor...</div>
      ) : posts.length === 0 ? (
        <div>Henüz blog yazısı bulunmuyor.</div>
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
  );
};

export default BlogList;
