import React, { useContext } from "react";
import { extractFromDraft } from "./Jumbotron";
import { DataContext } from "contexts/dataContext";
import { BlogType } from "./Blog";

type Props = {
  post: BlogType
}
export const CardPost: React.FC<Props> = ({ post }) => (
    <a className="latest__card" href={`/blog/${extractFromDraft(post.content).title.split(' ').join('-')}`}>
          <img
            className="latest__card__img"
            src={extractFromDraft(post.content).url}
            alt="related post"
          />
          <div className="latest__card__body" >
          <p className="latest__card__text">{extractFromDraft(post.content).title}</p>
          </div>
    </a>
);

export const LastPost = () => {
  const { data: { blogs } } = useContext(DataContext)

  const lastPosts = blogs.slice(0, 3)

  return(
    <div className="latest">
      <h2 className="latest__text" >Latest posts</h2>
      <span className="latest__line" ></span>
      <div className="latest__posts" >
      {lastPosts.map((blog: BlogType) => 
      <CardPost key={blog.id} post={blog} />
      )}
      </div>
    </div>
  );
}

