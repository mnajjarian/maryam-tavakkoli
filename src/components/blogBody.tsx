import React from "react";
import Post from "./BlogPost";
import { BlogType } from './Blog';


type Props = {
  posts: BlogType[]
}
const BlogPosts = (props: Props) => {
  const { posts } = props;
const sortPosts = posts.sort((a, b) =>  new Date(b.createdAt).getDate() - new Date(a.createdAt).getDate());

  return (
    <div className="blog">
      <div className="blog__posts">
        {sortPosts.map(post =>
          <Post post={post} />
        )}
      </div>
    </div>
  );
};

export default BlogPosts;
