import React from "react";
import Post from "./BlogPost";
import { BlogType } from './Blog';


type Props = {
  posts: BlogType[]
}
const BlogPosts = (props: Props) => {
  const { posts } = props;

  return (
    <div className="blog">
      <div className="blog__posts">
        {posts.map(post => (
          <Post post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
};

export default BlogPosts;
