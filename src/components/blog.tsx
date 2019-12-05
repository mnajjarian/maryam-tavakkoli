import React, { Fragment, useContext } from "react";
import BlogHeader from "./Jumbotron";
import BlogBody from "./BlogBody";
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
  const {
    data: { blogs }
  } = useContext(DataContext);

  return (
    <Fragment>
      <Nav />
      <BlogHeader posts={blogs} />
      <BlogBody posts={blogs} />
      <Footer />
    </Fragment>
  );
};

export default Blog;
