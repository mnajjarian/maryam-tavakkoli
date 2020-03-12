import React from "react";
import CardPost from "./CardPost";
import { BlogType } from "./Blog";

type Props = {
  posts: BlogType[];
};
const BlogBody = (props: Props) => {
  const { posts } = props;
  
  if (!posts.length) {
    return (
      <div className="blog">
        <div className="blog__empty">
          <div>There is nothing here!</div>
          <div>You can create new post through your <a className="blog__empty__link" href="/dashboard/create">Dashboard</a>.</div>
        </div>
      </div>
    );
  }
  return (
    <div className="blog">
      <div className="blog__posts">
        {posts.map(post => (
          <CardPost key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default BlogBody;
