import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const getDir = (path: string) => {
  return join(process.cwd(), path);
};

const blog_Dir = getDir("/content/blogs");

const getFileNames = (dir: string): string[] => {
  return fs.readdirSync(dir);
};

const getBlogFileNames = () => {
  return getFileNames(blog_Dir);
};

const getItemInPath = (filepath: string) => {
  const fileContent = fs.readFileSync(filepath, "utf8");
  const { data, content } = matter(fileContent);
  return fileContent;
};

const getBlogs = () => {
  const names = getBlogFileNames();
  const items = names.map((name) => getItemInPath(join(blog_Dir, name)));
  return items;
};

export { getBlogFileNames, getBlogs };
