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
      className="w-60 sm:w-72 rounded-md border border-neutral-200 dark:border-gray-600 hover:shadow-xs transition cursor-pointer"
    >
      <div className="flex flex-col items-start gap-2 p-4">
        {category && (
          <span className="text-xs text-primary dark:text-primaryDark bg-primary/10 dark:bg-primaryDark/10 px-2 py-1 rounded-full">
            {category}
          </span>
        )}
        <h3 className="text-xl font-semibold mb-2 text-primary dark:text-primaryDark line-clamp-1">{title}</h3>
        <p className="text-textColor dark:text-textColorDark text-sm mb-3 line-clamp-2">{description}</p>
        <span className="text-xs text-gray-400 md:text-gray-100">{date}</span>
      </div>
    </Link>
  );
};

export default BlogCard;
