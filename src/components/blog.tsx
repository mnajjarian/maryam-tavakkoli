import React, { Fragment } from "react";
import BlogHeader from "./blog-header";
import BlogPosts from "./blog-posts";
import posts from "../db.json";
import Nav from "./navbar";

const Blog = () => (
  <Fragment>
    <Nav />
    <BlogHeader posts={posts.posts[0]} />
    <BlogPosts posts={posts.posts} />
  </Fragment>
);

export default Blog;
