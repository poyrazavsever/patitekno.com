'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), { ssr: false });
import 'react-markdown-editor-lite/lib/index.css';

const BlogEkle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const blogData = {
      title,
      content,
      tags: tags.split(',').map((tag) => tag.trim()),
      category
    };
    console.log("Yeni blog eklendi:", blogData);
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
          <label className="block mb-1 text-sm font-medium text-textColor">İçerik</label>
          <MdEditor
            style={{ height: '300px' }}
            value={content}
            renderHTML={(text) => text}
            onChange={({ text }) => setContent(text)}
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

        <div>
          <label className="block mb-1 text-sm font-medium text-textColor">Kategori</label>
          <input
            type="text"
            className="w-full border border-neutral-300 rounded px-3 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-full px-6 py-2 bg-primary text-white cursor-pointer hover:opacity-90 transition"
        >
          Blogu Ekle
        </button>
      </form>
    </div>
  );
};

export default BlogEkle;
