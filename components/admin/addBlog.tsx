'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { supabase } from '@/utils/supabaseClient';
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), { ssr: false });
import 'react-markdown-editor-lite/lib/index.css';

type Category = {
  id: number;
  name: string;
};

const BlogEkle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const handleEditorChange = ({ text }: { text: string }) => {
    setContent(text);
  };

  const renderHTML = (text: string) => {
    return <ReactMarkdown>{text}</ReactMarkdown>;
  };

  // Kategorileri getir
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('id, name');

      if (error) {
        toast.error('Kategoriler yüklenirken hata oluştu');
        return;
      }

      setCategories(data || []);
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Slug oluştur
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

      const { data, error } = await supabase
        .from('blog_posts')
        .insert([
          {
            title,
            content,
            tags: tags.split(',').map(tag => tag.trim()),
            category_id: parseInt(categoryId),
            slug,
            created_at: new Date().toISOString(),
          }
        ])
        .select();

      if (error) throw error;

      toast.success('Blog yazısı başarıyla eklendi!');

      // Formu temizle
      setTitle('');
      setContent('');
      setTags('');
      setCategoryId('');

    } catch (error: any) {
      toast.error('Blog eklenirken bir hata oluştu');
      console.error('Blog ekleme hatası:', error.message || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl p-6 border border-neutral-200 rounded-md mt-10">
      <h1 className="text-2xl font-semibold mb-6 text-primary">Yeni Blog Ekle</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 text-sm font-medium text-textColor">Başlık</label>
          <input
            type="text"
            className="w-full border border-neutral-300 rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-textColor">Kategori</label>
          <select
            className="w-full border border-neutral-300 rounded px-3 py-2"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">Kategori Seçin</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-textColor">İçerik</label>
          <MdEditor
            style={{ height: '500px' }}
            value={content}
            renderHTML={renderHTML}
            onChange={handleEditorChange}
            className="mb-4"
            view={{ menu: true, md: true, html: true }}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-textColor">Etiketler (virgülle ayır)</label>
          <input
            type="text"
            className="w-full border border-neutral-300 rounded px-3 py-2"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-full px-6 py-2 bg-primary text-white cursor-pointer hover:opacity-90 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Ekleniyor...' : 'Blogu Ekle'}
        </button>
      </form>
    </div>
  );
};

export default BlogEkle;
