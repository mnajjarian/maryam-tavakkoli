import React, { Fragment, useContext } from "react";
import BlogHeader from "./blogHeader";
import BlogPosts from "./blogBody";
import posts from "../db.json";
import Nav from "./navbar";
import Footer from "./footer";
import { DataContext } from "../contexts/dataContext";
import { convertFromRaw, EditorState, RawDraftContentState } from "draft-js";


const Blog = () => {
  const {data: { blogs } } = useContext(DataContext)
  const lastPost = blogs[0] ? blogs[0] : null

  return(
  <Fragment>
    <Nav />
    <BlogHeader post={lastPost} />
    <BlogPosts posts={blogs} />
    <Footer />
  </Fragment>
)};

export default Blog;
