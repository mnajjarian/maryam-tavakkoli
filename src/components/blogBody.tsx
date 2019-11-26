import React from "react";
import CardPost from "./CardPost";
import { BlogType } from './Blog';


type Props = {
  posts: BlogType[]
}
const BlogBody = (props: Props) => {
  const { posts } = props;

  return (
    <div className="blog">
      <div className="blog__posts">
        {posts.map(post =>
          <CardPost key={post.id} post={post} />
        )}
      </div>
    </div>
  );
};

export default BlogBody;
