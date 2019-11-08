import React, { Fragment, useContext } from "react";
import BlogHeader from "./BlogHeader";
import BlogPosts from "./BlogBody";
import posts from "../db.json";
import Nav from "./Navbar";
import Footer from "./Footer";
import { DataContext } from "../contexts/dataContext";
import { convertFromRaw, EditorState, RawDraftContentState } from "draft-js";

export interface BlogType {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
const Blog = () => {
  const {data: { blogs } } = useContext(DataContext)
  const lastPost: BlogType = blogs[0] ? blogs[0] : null

  return(
  <Fragment>
    <Nav />
    <BlogHeader post={lastPost} />
    <BlogPosts posts={blogs} />
    <Footer />
  </Fragment>
)};

export default Blog;
