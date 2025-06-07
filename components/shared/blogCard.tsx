import React from "react";

type BlogCardProps = {
  title: string;
  description: string;
  date: string;
  imageUrl?: string;
};

const BlogCard: React.FC<BlogCardProps> = ({ title, description, date, imageUrl }) => {
  return (
    <a href={`/blog/${title}`} className="w-72 rounded-md border border-neutral-200 hover:shadow-sm transition cursor-pointer">
      {imageUrl && (
        <img src={imageUrl} alt={title} className="w-full h-40 object-cover rounded-t-md"/>
      )}
      <div className="flex flex-col items-start gap-2 p-4">
        <h3 className="text-xl font-semibold mb-2 text-primary">{title}</h3>
        <p className="text-textColor text-sm mb-3 line-clamp-1">{description}</p>
        <span className="text-xs text-gray-400">{date}</span>
      </div>
    </a>
  );
};

export default BlogCard;
