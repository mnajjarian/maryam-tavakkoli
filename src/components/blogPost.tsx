import React from "react";
import { Link, Route } from "react-router-dom";

const timeIcon = require("../assets/icons/time-3.svg");
const iconUser = require("../assets/icons/user.svg");
const iconBubble = require("../assets/icons/bubble.svg");

type Paragraph = {
  title: string;
  text: string[];
};

type PostProps = {
  post: {
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
  };
};
const Post = (props: PostProps) => {
  const formatDate = (date: string) =>
    new Intl.DateTimeFormat("en-us", {
      year: "numeric",
      month: "short",
      day: "2-digit"
    }).format(new Date(date));
  const { post } = props;

  return (
    <div className="posts">
      <section>
        <div className="posts__content">
          <h2>{post.title}</h2>
          <div className="posts__header">
            <span className="posts__icon">
              <img src={timeIcon} alt="clock icon" />
              <strong>
                <time dateTime="2019-09-12" itemProp={post.createdAt}>
                  {formatDate(post.createdAt)}
                </time>
              </strong>
            </span>
            <span className="posts__icon">
              <img src={iconUser} alt="user icon" />
              <strong>{post.author}</strong>
            </span>
            <span className="posts__icon">
              <img src={iconBubble} alt="comment icon" />
              <strong>3 Comments</strong>
            </span>
          </div>
          <div className="posts__items">
            <p>
              {post.paragraph[0].text[0].substring(0, 380) + "... "}
              <Link to={`/blog/${post.title.split(" ").join("-")}`}>
                read more
              </Link>
            </p>
            <img src={require(`../${post.imgUrl}`)} alt={post.title} />
          </div>
          <ul className="posts__tags">
            Tags:
            {post.tags.map(tag => (
              <li key={tag}>
                <a href="/">{tag}</a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Post;
