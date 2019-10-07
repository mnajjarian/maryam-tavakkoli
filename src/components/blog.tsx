import React, { Fragment } from "react";
import BlogHeader from "./blog-header";
import posts from "../db.json";
import Nav from "./navbar";

const Blog = () => (
  <Fragment>
    <Nav />
    <BlogHeader posts={posts.posts[0]} />
  </Fragment>
);

export default Blog;
