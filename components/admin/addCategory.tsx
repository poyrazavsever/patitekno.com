'use client';

import React, { useState } from 'react';
import { supabase } from '@/utils/supabaseClient';
import toast from 'react-hot-toast';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Slug oluştur
      const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

      const { data, error } = await supabase
        .from('categories')
        .insert([
          {
            name,
            description,
            slug,
            created_at: new Date().toISOString(),
          }
        ])
        .select();

      if (error) {
        throw error;
      }

      toast.success('Kategori başarıyla eklendi!');

      // Form temizle
      setName('');
      setDescription('');

    } catch (error: any) {
      toast.error(error.message || 'Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mt-10 p-6 border border-neutral-200 rounded-md">
      <h1 className="text-2xl font-semibold mb-6">Yeni Kategori Ekle</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 text-sm font-medium text-textColor">
            Kategori Adı
          </label>
          <input
            type="text"
            className="w-full border border-neutral-300 rounded px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-textColor">
            Açıklama
          </label>
          <textarea
            className="w-full border border-neutral-300 rounded px-3 py-2"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-full cursor-pointer px-6 py-2 bg-primary text-white hover:opacity-90 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Ekleniyor...' : 'Kategoriyi Ekle'}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
