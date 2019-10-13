import React, { Fragment } from "react";
import BlogHeader from "./blogHeader";
import BlogPosts from "./blogBody";
import posts from "../db.json";
import Nav from "./navbar";
import Footer from "./footer";

const Blog = () => (
  <Fragment>
    <Nav />
    <BlogHeader posts={posts.posts[0]} />
    <BlogPosts posts={posts.posts} />
    <Footer />
  </Fragment>
);

export default Blog;
