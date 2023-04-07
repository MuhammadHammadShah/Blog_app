import { getBlogBySlog, getBlogs } from "@/lib/blog";
import { NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import React, { use } from "react";
import BlogHeader from "../BlogHeader";

interface Params extends ParsedUrlQuery {
  slug: string;
}

type Props = {
  params: Params;
};
const getInitialBlog = async (slug: string) => {
  const blog = getBlogBySlog(slug);
  return blog;
};

const BlogDetails: NextPage<Props> = ({ params }) => {
  const blog = use(getInitialBlog(params.slug));
  return (
    <div className="w-2/3 m-auto">
      <BlogHeader blog={blog} />
      <article className="prose lg:prose-xl">
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </article>
    </div>
  );
};

export function generateStaticParams() {
  const blogs = getBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default BlogDetails;
