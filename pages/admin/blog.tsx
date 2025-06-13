import { ReactElement, useState, useEffect } from "react"
import { NextPageWithLayout } from "../_app"
import AdminLayout from "@/components/layout/AdminLayout"
import classNames from "classnames"
import { supabase } from "@/utils/supabaseClient"
import { MdEdit, MdDelete, MdLink } from "react-icons/md"
import AddBlog from "@/components/admin/addBlog"
import Categories from "@/components/admin/categories"
import AddCategory from "@/components/admin/addCategory"
import toast from "react-hot-toast"
import dynamic from "next/dynamic"

const MdEditor = dynamic(() => import('react-markdown-editor-lite'), { ssr: false })
import 'react-markdown-editor-lite/lib/index.css'

type BlogPost = {
    id: number
    title: string
    content: string
    description?: string
    slug: string
    created_at: string
    category_id: number
    category: {
        name: string
    }
}

const links = [
    {
        id: 0,
        name: "Blog Yazıları"
    },
    {
        id: 1,
        name: "Blog Yazısı Ekle"
    },
    {
        id: 2,
        name: "Kategoriler"
    },
    {
        id: 3,
        name: "Kategori Ekle"
    }
]

const AdminBlog: NextPageWithLayout = () => {
    const [currentTab, setCurrentTab] = useState(0)
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [loading, setLoading] = useState(true)
    const [deleteModal, setDeleteModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

    // Blogları getir
    const fetchPosts = async () => {
        try {
            const { data, error } = await supabase
                .from('blog_posts')
                .select(`
          *,
          category:categories(name)
        `)
                .order('created_at', { ascending: false })

            if (error) throw error
            setPosts(data || [])
        } catch (error: any) {
            toast.error('Bloglar yüklenirken bir hata oluştu')
        } finally {
            setLoading(false)
        }
    }

    // Blog sil
    const handleDelete = async () => {
        if (!selectedPost) return

        try {
            const { error } = await supabase
                .from('blog_posts')
                .delete()
                .eq('id', selectedPost.id)

            if (error) throw error

            setPosts(posts.filter(post => post.id !== selectedPost.id))
            toast.success('Blog yazısı başarıyla silindi')
            setDeleteModal(false)
            setSelectedPost(null)
        } catch (error: any) {
            toast.error('Blog silinirken bir hata oluştu')
        }
    }

    // Blog güncelle
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selectedPost) return

        try {
            const slug = selectedPost.title
                .toLowerCase()
                .replace(/[^a-z0-9]/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '')

            const { error } = await supabase
                .from('blog_posts')
                .update({
                    title: selectedPost.title,
                    content: selectedPost.content,
                    slug,
                    category_id: selectedPost.category_id
                })
                .eq('id', selectedPost.id)

            if (error) throw error

            setPosts(posts.map(post =>
                post.id === selectedPost.id ? { ...selectedPost, slug } : post
            ))
            toast.success('Blog yazısı başarıyla güncellendi')
            setEditModal(false)
            setSelectedPost(null)
        } catch (error: any) {
            toast.error('Blog güncellenirken bir hata oluştu')
        }
    }

    useEffect(() => {
        if (currentTab === 0) {
            fetchPosts()
        }
    }, [currentTab])

    return (
        <div>
            <nav className="flex items-center gap-4 pb-6 text-textColor font-medium">
                {links.map((link) => (
                    <button
                        key={link.id}
                        onClick={() => setCurrentTab(link.id)}
                        className={classNames(
                            "py-1 px-3 rounded-sm cursor-pointer transition-all",
                            {
                                "bg-primary text-background": currentTab === link.id
                            }
                        )}
                    >
                        {link.name}
                    </button>
                ))}
            </nav>

            {currentTab === 0 && (
                <>
                    <h1 className="text-2xl font-semibold text-primary mt-8">Blog Yazıları</h1>

                    <div className="flex flex-wrap gap-4 mt-8">
                        {loading ? (
                            <p>Yükleniyor...</p>
                        ) : posts.length === 0 ? (
                            <p>Henüz blog yazısı bulunmuyor.</p>
                        ) : (
                            posts.map((post) => (
                                <div key={post.id} className="w-72 rounded-md border border-neutral-200">
                                    <div className="flex flex-col items-start gap-2 p-4">
                                        {post.category?.name && (
                                            <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded-full">
                                                {post.category.name}
                                            </span>
                                        )}
                                        <h3 className="w-full text-xl font-semibold mb-2 text-primary">
                                            {post.title}
                                        </h3>
                                        <div className="mt-auto w-full flex items-center justify-end gap-4">
                                            <button
                                                onClick={() => {
                                                    setSelectedPost(post)
                                                    setEditModal(true)
                                                }}
                                            >
                                                <MdEdit className="text-sky-400 text-xl" />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSelectedPost(post)
                                                    setDeleteModal(true)
                                                }}
                                            >
                                                <MdDelete className="text-red-400 text-xl" />
                                            </button>
                                            <a href={`/blog/${post.slug}`} target="_blank">
                                                <MdLink className="text-neutral-400 -rotate-45 text-xl" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </>
            )}

            {currentTab === 1 && <AddBlog />}
            {currentTab === 2 && <Categories />}
            {currentTab === 3 && <AddCategory />}

            {/* Delete Modal */}
            {deleteModal && selectedPost && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                        <h3 className="text-lg font-semibold mb-4">Blog Yazısını Sil</h3>
                        <p className="mb-4">
                            &quot;{selectedPost.title}&quot; başlıklı blog yazısını silmek istediğinizden emin misiniz?
                        </p>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => {
                                    setDeleteModal(false)
                                    setSelectedPost(null)
                                }}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                            >
                                İptal
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Sil
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {editModal && selectedPost && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 max-w-4xl w-full">
                        <h3 className="text-lg font-semibold mb-4">Blog Yazısını Düzenle</h3>
                        <form onSubmit={handleUpdate}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Başlık</label>
                                    <input
                                        type="text"
                                        value={selectedPost.title}
                                        onChange={(e) => setSelectedPost({
                                            ...selectedPost,
                                            title: e.target.value
                                        })}
                                        className="w-full border rounded px-3 py-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">İçerik</label>
                                    <MdEditor
                                        style={{ height: '500px' }}
                                        value={selectedPost.content}
                                        renderHTML={(text) => text}
                                        onChange={({ text }) => setSelectedPost({
                                            ...selectedPost,
                                            content: text
                                        })}
                                        className="mb-4"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 mt-6">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditModal(false)
                                        setSelectedPost(null)
                                    }}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                                >
                                    İptal
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-primary text-white rounded hover:opacity-90"
                                >
                                    Güncelle
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

AdminBlog.getLayout = function PageLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>
}

export default AdminBlog