import React, { Fragment, useContext } from "react";
import Jumbotron from "./Jumbotron";
import BlogBody from "./BlogBody";
import Nav from "./Navbar";
import Footer from "./Footer";
import { DataContext } from "../contexts/dataContext";

export interface IComment {
  id: string;
  comment: string;
  post: string;
  commenter: string;
  email: string;
  createdAt: string;
}
export interface BlogType {
  id: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  comments: IComment[]
}

const Blog = () => {
  const {
    data: { blogs }
  } = useContext(DataContext);

  return (
    <Fragment>
      <Nav />
      <Jumbotron posts={blogs} />
      <BlogBody posts={blogs} />
      <Footer />
    </Fragment>
  );
};

export default Blog;
