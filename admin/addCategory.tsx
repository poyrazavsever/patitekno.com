'use client';

import React, { useState } from 'react';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newCategory = {
      name,
      description,
    };

    console.log('Yeni kategori eklendi:', newCategory);

    // Temizle
    setName('');
    setDescription('');
  };

  return (
    <div className="max-w-xl mt-10 p-6 border border-neutral-200 rounded-md">
      <h1 className="text-2xl font-semibold mb-6">Yeni Kategori Ekle</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 text-sm font-medium text-textColor">Kategori Adı</label>
          <input
            type="text"
            className="w-full border border-neutral-300 rounded px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-textColor">Açıklama</label>
          <textarea
            className="w-full border border-neutral-300 rounded px-3 py-2"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-full cursor-pointer px-6 py-2 bg-primary text-white hover:opacity-90 transition"
        >
          Kategoriyi Ekle
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
