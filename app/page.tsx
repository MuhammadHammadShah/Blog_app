import { getBlogs } from "@/lib/blog";
import { NextPage } from "next";
import Image from "next/image";
import React, { use } from "react";
import Link from "next/link";
async function getInitialBlogs() {
  const blog = getBlogs();
  return blog;
}
const Page: NextPage = () => {
  const blogs = use(getInitialBlogs());
  console.log(blogs);
  return (
    <div>
      <h2 className="sr-only">Products</h2>

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {blogs.map((blog) => (
          <Link key={blog.slug} href={`/blogs/${blog.slug}`} className="group">
            <div className="relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
              <Image
                fill
                src={blog.coverImage}
                alt=""
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{blog.title}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">
              {blog.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
