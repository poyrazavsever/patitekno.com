import React from "react";

type BlogItem = {
  title: string;
  description: string;
  date: string;
  imageUrl?: string;
};


const BlogData = () => {


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

  return (

    <div className="w-full flex flex-wrap items-start justify-between gap-3">
          {blogList.map((item, index) => (
            <a key={index} href={`/blog/${index}`} className="w-72 rounded-md border border-neutral-200 hover:shadow-sm transition cursor-pointer">
              {item.imageUrl && (
                <img src={item.imageUrl} alt={item.title} className="w-full h-40 object-cover rounded-t-md"/>
              )}
              <div className="flex flex-col items-start gap-2 p-4">
                <h3 className="text-xl font-semibold mb-2 text-primary">{item.title}</h3>
                <p className="text-textColor text-sm mb-3 line-clamp-1">{item.description}</p>
                <span className="text-xs text-gray-400">{item.date}</span>
              </div>
            </a>
          ))}
      </div>
  );
};

export default BlogData;
