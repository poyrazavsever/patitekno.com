import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BlogCard from "@/components/shared/blogCard";
import { supabase } from "@/utils/supabaseClient";

type Category = {
  id: number;
  name: string;
};

type BlogPost = {
  id: number;
  title: string;
  content: string;
  slug: string;
  created_at: string;
  tags: string[];
  category_id: number;
  category?: {
    id: number;
    name: string;
  };
};

const BlogList = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (!error && data) {
        setCategories(data);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let query = supabase
          .from('blog_posts')
          .select(`
            *,
            categories (
              id,
              name
            )
          `)
          .order('created_at', { ascending: false });

        if (selectedCategory !== "all") {
          query = query.eq('category_id', categories.find(c => c.name === selectedCategory)?.id);
        }

        const { data, error } = await query;

        if (error) throw error;

        let filteredPosts = (data || []).map((post: any) => ({
          id: post.id,
          title: post.title,
          content: post.content,
          slug: post.slug,
          created_at: post.created_at,
          tags: post.tags,
          category_id: post.category_id,
          // İlk paragrafı description olarak kullan
          description: post.content.split('\n')[0],
          // Kategori bilgisini categories join'inden al
          category: post.categories
        }));

        // Arama filtrelemesi
        if (searchTerm) {
          filteredPosts = filteredPosts.filter(post =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        setPosts(filteredPosts);
      } catch (error) {
        console.error('Blog yazıları yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [selectedCategory, searchTerm]);

  return (
    <div className="flex flex-col items-start gap-8 mt-16">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-semibold text-primary dark:text-primaryDark"
      >
        Blog Yazıları
      </motion.h1>

      <div className="w-full flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        {/* Arama Çubuğu */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative w-full md:w-72"
        >
          <input
            type="text"
            placeholder="Blog yazılarında ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 rounded-lg border border-neutral-200 dark:border-sky-800 bg-background dark:bg-backgroundDark text-textColor dark:text-textColorDark focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primaryDark placeholder:text-textColor/60 dark:placeholder:text-textColorDark/60"
          />
        </motion.div>

        {/* Kategori Filtreleme */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-wrap gap-2"
        >
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === "all"
              ? "bg-primary dark:bg-primaryDark text-white dark:text-white"
              : "bg-background dark:bg-backgroundDark border border-neutral-200 dark:border-sky-800 text-textColor dark:text-textColorDark hover:bg-primary/10 dark:hover:bg-primaryDark/10"
              }`}
          >
            Tümü
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category.name
                ? "bg-primary dark:bg-primaryDark text-white dark:text-white"
                : "bg-background dark:bg-backgroundDark border border-neutral-200 dark:border-sky-800 text-textColor dark:text-textColorDark hover:bg-primary/10 dark:hover:bg-primaryDark/10"
                }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>
      </div>

      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full flex justify-center py-12"
        >
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary dark:border-primaryDark border-t-transparent"></div>
        </motion.div>
      ) : posts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full text-center py-12 text-textColor/60 dark:text-textColorDark/60"
        >
          {searchTerm ? "Aramanızla eşleşen yazı bulunamadı." : "Henüz blog yazısı bulunmuyor."}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
        >
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
              category={post.category?.name || ''}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default BlogList;