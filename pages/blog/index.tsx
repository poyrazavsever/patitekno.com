import React from "react";
import BlogData from "@/components/shared/blogData";


const BlogList = () => {

  return (
    <div className="flex flex-col items-start gap-4 mt-16">
      <h1 className="text-2xl font-semibold text-primary">Son Yazılar</h1>
      <BlogData/>
    </div>
  );
};

export default BlogList;
