import { ReactElement } from "react"
import { NextPageWithLayout } from "../_app"
import AdminLayout from "@/components/layout/AdminLayout"

import { MdEdit, MdDelete, MdLink } from "react-icons/md";

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


const AdminBlog : NextPageWithLayout = () => {

    return (
        <div>
            <h1 className="text-2xl font-semibold text-primary">Blog Yazıları</h1>

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

        </div>
    )
}

AdminBlog.getLayout = function PageLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AdminBlog