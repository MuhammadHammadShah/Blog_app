import { getBlogs } from "@/lib/blog";
import { NextPage } from "next";
import React, { use } from "react";

async function getInitialBlogs() {
  const blog = getBlogs();
  return blog;
}
const Page: NextPage = () => {
  const blogs = use(getInitialBlogs());
  return (
    <div>
      {blogs.map((blog, i) => (
        <div key={i}>
          {blog}
          <div className=" h-10 " />
        </div>
      ))}
    </div>
  );
};

export default Page;
