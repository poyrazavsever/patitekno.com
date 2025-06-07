import React from "react";
import BlogCard from "@/components/shared/blogCard";

type BlogItem = {
  title: string;
  description: string;
  date: string;
  imageUrl?: string;
};

const BlogList = () => {
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
    <div className="flex flex-col items-start gap-4 mt-16">
      <h1 className="text-2xl font-semibold text-primary">Son Yazılarımız</h1>
      <div className="w-full flex flex-wrap items-start justify-between gap-3">
        {blogList.map((item, index) => (
          <BlogCard
            key={index}
            title={item.title}
            description={item.description}
            date={item.date}
            imageUrl={item.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogList;
