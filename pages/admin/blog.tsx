import { ReactElement, useState } from "react"
import { NextPageWithLayout } from "../_app"
import AdminLayout from "@/components/layout/AdminLayout"
import classNames from "classnames";

import { MdEdit, MdDelete, MdLink } from "react-icons/md";
import AddBlog from "@/admin/addBlog";
import Categories from "@/admin/categories";
import AddCategory from "@/admin/addCategory";

type BlogItem = {
  title: string;
  description: string;
  date: string;
  imageUrl?: string;
};

const blogList: BlogItem[] = [
    {
      title: "HTML 101",
      description: "HTML'in temellerini ve web'deki rolünü öğrenin.",
      date: "07 Haziran 2025",
      imageUrl: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fgaleri8.uludagsozluk.com%2F446%2Fresim-cizmek_698899.jpg&f=1&nofb=1&ipt=0201288d9417837cfb5faf5a31579819dcec485da99642dc6cfc5f301265aa33",
    },
    {
      title: "CSS ile Stil Verme",
      description: "Web sitenizi güzelleştirmek için CSS'in gücünü keşfedin.",
      date: "05 Haziran 2025",
      imageUrl: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fgaleri8.uludagsozluk.com%2F446%2Fresim-cizmek_698899.jpg&f=1&nofb=1&ipt=0201288d9417837cfb5faf5a31579819dcec485da99642dc6cfc5f301265aa33",
    },
    {
      title: "JavaScript'e Giriş",
      description: "Sayfanıza etkileşim kazandırmak artık çok kolay!",
      date: "03 Haziran 2025",
      imageUrl: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fgaleri8.uludagsozluk.com%2F446%2Fresim-cizmek_698899.jpg&f=1&nofb=1&ipt=0201288d9417837cfb5faf5a31579819dcec485da99642dc6cfc5f301265aa33",
    },
];

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

const AdminBlog : NextPageWithLayout = () => {

    const [currentTab, setCurrentTab] = useState(0)


    return (
        <div>
            <nav className="flex items-center gap-4 pb-6 text-textColor font-medium">
                {
                    links.map((link) => (
                        <button key={link.id} onClick={() => setCurrentTab(link.id)} className={classNames(
                            "py-1 px-3 rounded-sm cursor-pointer transition-all",
                            {
                                "bg-primary text-background": currentTab == link.id
                            }
                        )}>{link.name}</button>
                    ))
                }
            </nav>

            {
                currentTab === 0 ? (
                    <>
                        <h1 className="text-2xl font-semibold text-primary mt-8">Blog Yazıları</h1>

                        <div className="flex flex-wrap gap-4 mt-8">
                            {
                                blogList?.map((item, index) => (
                                    <div key={index} className="w-72 rounded-md border border-neutral-200">
                                        {item.imageUrl && (
                                            <img src={item.imageUrl} alt={item.title} className="w-full h-40 object-cover rounded-t-md"/>
                                        )}
                                        <div className="flex flex-col items-end gap-2 p-4">
                                            <h3 className="w-full text-start text-xl font-semibold mb-2 text-primary">{item.title}</h3>
                                            <div className="text-xl flex items-center gap-4">  
                                                <button><MdEdit className="text-sky-400"/></button>
                                                <button><MdDelete className="text-red-400"/></button>
                                                <a href="#"><MdLink className="text-neutral-400 -rotate-45"/></a>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </>
                ) : ""
            }

            {
                currentTab === 1 ? (
                    <AddBlog />
                ) : ""
            }

            {
                currentTab === 2 ? (
                    <Categories />
                ) : ""
            }

            {
                currentTab === 3 ? (
                    <AddCategory/>
                ) : ""
            }

            
        </div>
    )
}

AdminBlog.getLayout = function PageLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AdminBlog