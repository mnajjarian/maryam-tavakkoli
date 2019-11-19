import React, { Fragment, useContext } from "react";
import BlogHeader from "./BlogHeader";
import BlogPosts from "./BlogBody";
import Nav from "./Navbar";
import Footer from "./Footer";
import { DataContext } from "../contexts/dataContext";

export interface BlogType {
  id: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}
const Blog = () => {
  const {data: { blogs } } = useContext(DataContext)
  const sortPosts = blogs.sort((a: any, b: any) =>  new Date(b.createdAt).getDate() - new Date(a.createdAt).getDate());

  return(
  <Fragment>
    <Nav />
    <BlogHeader post={sortPosts[0]} />
    <BlogPosts posts={sortPosts} />
    <Footer />
  </Fragment>
)};

export default Blog;
