import React from "react";
import Post from "./post";

interface Paragraph {
  title: string;
  text: string[];
}
interface Props {
  posts: {
    id: string;
    author: string;
    authorImg: string;
    authorBio: string;
    title: string;
    shortDescription: string;
    paragraph: Paragraph[];
    imgUrl: string;
    tags: string[];
    createdAt: string;
  }[];
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
