import React from "react";
import Link from "next/link";

type BlogCardProps = {
  title: string;
  description: string;
  date: string;
  slug: string;
  category?: string;
};

const BlogCard = ({ title, description, date, slug, category }: BlogCardProps) => {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group w-60 sm:w-72 rounded-lg border-1 border-neutral-200 dark:border-sky-800 hover:border-primary dark:hover:border-primaryDark transition-all duration-300 cursor-pointer bg-background dark:bg-backgroundDark hover:translate-y-[-2px] relative overflow-hidden"
    >
      <div className="flex flex-col items-start p-5 space-y-3 relative z-10">
        {category && (
          <span className="text-xs font-medium text-primary dark:text-primaryDark bg-primary/5 dark:bg-primaryDark/5 px-3 py-1 rounded-full group-hover:bg-primary/10 dark:group-hover:bg-primaryDark/10 transition-colors">
            {category}
          </span>
        )}
        <h3 className="text-xl font-bold text-textColor dark:text-textColorDark line-clamp-2 group-hover:text-primary dark:group-hover:text-primaryDark transition-colors">{title}</h3>
        <p className="text-textColor/80 dark:text-textColorDark/80 text-sm line-clamp-2">{description}</p>
        <span className="text-xs font-medium text-textColor/60 dark:text-textColorDark/60">{date}</span>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 dark:to-primaryDark/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </Link>
  );
};

export default BlogCard;
