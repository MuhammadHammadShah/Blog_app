import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import { Blog } from "@/interface/Blog";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";
import { use } from "react";

const markdownToHTML = async (markdown: string) => {
  const result = await remark().use(html).use(remarkGfm).process(markdown);

  return result.toString();
};

const getDir = (path: string) => {
  return join(process.cwd(), path);
};

const blog_Dir = getDir("/content/blog");

const getFileNames = (dir: string): string[] => {
  return fs.readdirSync(dir);
};

const getBlogFileNames = () => {
  return getFileNames(blog_Dir);
};

const getItemInPath = (filepath: string) => {
  const fileContent = fs.readFileSync(filepath, "utf8");
  const { data, content } = matter(fileContent);
  return { ...data, content } as Blog;
};
const getBlog = (nameofFile: string) => {
  const blog = getItemInPath(join(blog_Dir, nameofFile));
  blog.slug = nameofFile.replace(/\.md$/, "");
  return blog;
};

const getBlogBySlog = async (slug: string) => {
  const fileName = slug + ".md";
  const blog = getBlog(fileName);
  blog.content = await markdownToHTML(blog.content);
  return blog;
};

const getBlogs = () => {
  const names = getBlogFileNames();
  const items = names.map(getBlog);
  return items;
};

export { getBlogFileNames, getBlogs, getBlogBySlog };
