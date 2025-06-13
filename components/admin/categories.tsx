import React, { useEffect, useState } from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';
import { supabase } from '@/utils/supabaseClient';
import toast from 'react-hot-toast';

type Category = {
  id: number;
  name: string;
  description: string;
  slug: string;
  created_at: string;
};

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [editModal, setEditModal] = useState(false);


  // Kategorileri getir
  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCategories(data || []);
    } catch (error: any) {
      toast.error('Kategoriler yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  // Kategori sil
  const handleDelete = async () => {
    if (!selectedCategory) return;

    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', selectedCategory.id);

      if (error) throw error;

      setCategories(categories.filter(cat => cat.id !== selectedCategory.id));
      toast.success('Kategori başarıyla silindi');
      setDeleteModal(false);
      setSelectedCategory(null);
    } catch (error: any) {
      toast.error('Kategori silinirken bir hata oluştu');
    }
  };

  // Kategori güncelle
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;

    try {
      const slug = editingCategory.name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

      const { error } = await supabase
        .from('categories')
        .update({
          name: editingCategory.name,
          description: editingCategory.description,
          slug
        })
        .eq('id', editingCategory.id);

      if (error) throw error;

      setCategories(categories.map(cat =>
        cat.id === editingCategory.id ? { ...editingCategory, slug } : cat
      ));
      setEditModal(false);
      setEditingCategory(null);
      toast.success('Kategori başarıyla güncellendi');
    } catch (error: any) {
      toast.error('Kategori güncellenirken bir hata oluştu');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) return <div>Yükleniyor...</div>;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="border border-neutral-300 rounded-md p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-textColor">{cat.name}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingCategory(cat);
                    setEditModal(true);
                  }}
                  className="text-blue-600 cursor-pointer hover:opacity-60 transition"
                >
                  <MdEdit size={20} />
                </button>
                <button
                  onClick={() => {
                    setSelectedCategory(cat);
                    setDeleteModal(true);
                  }}
                  className="text-red-600 cursor-pointer hover:opacity-60 transition"
                >
                  <MdDelete size={20} />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600">{cat.description}</p>
          </div>
        ))}
      </div>

      {/* Silme Modalı */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Kategoriyi Sil</h3>
            <p className="mb-4">
              &quot;{selectedCategory?.name}&quot; kategorisini silmek istediğinizden emin misiniz?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setDeleteModal(false);
                  setSelectedCategory(null);
                }}
                className="px-4 py-2 cursor-pointer text-gray-600 hover:bg-gray-100 rounded"
              >
                İptal
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 cursor-pointer bg-red-600 text-white rounded hover:bg-red-700"
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Düzenleme Modalı */}
      {editModal && editingCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Kategoriyi Düzenle</h3>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Kategori Adı
                </label>
                <input
                  type="text"
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory({
                    ...editingCategory,
                    name: e.target.value
                  })}
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Açıklama
                </label>
                <textarea
                  value={editingCategory.description}
                  onChange={(e) => setEditingCategory({
                    ...editingCategory,
                    description: e.target.value
                  })}
                  className="w-full border rounded px-3 py-2"
                  rows={3}
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditModal(false);
                    setEditingCategory(null);
                  }}
                  className="px-4 py-2 text-gray-600 cursor-pointer hover:bg-gray-100 rounded"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded hover:opacity-90 cursor-pointer"
                >
                  Güncelle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Categories;
