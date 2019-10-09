import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import db from "../db.json";
import Nav from "./navbar";

interface Paragraph {
  title: string;
  text: string[];
}
interface Props {
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
}
const Post = ({ match }: { match: any }) => {
  const {
    params: { id }
  } = match;
  if (!id) {
    return <div></div>;
  }
  const { posts } = db;
  const title = id.split("-").join(" ");
  const post = posts.find(p => p.title === title);
  if (!post) {
    return <div></div>;
  }
  console.log(match);
  return (
    <Fragment>
      <div className="nav__wrapper">
        <Nav />
      </div>
      <main className="post">
        <article className="post__article">
          <header className="post__header">
            <time className="post__time">
              Published on{" "}
              {new Intl.DateTimeFormat("en-us", {
                year: "numeric",
                month: "long",
                day: "2-digit"
              }).format(new Date(post.createdAt))}
            </time>
            <h1>{post.title}</h1>
            <div className="post__author">
              <img src={require(`../${post.authorImg}`)} alt="author image" />
              <p>
                Written by:
                <br />
                <strong>{post.author}</strong>
              </p>
            </div>
            <p>{post.shortDescription}</p>
            <img src={require(`../${post.imgUrl}`)} />
          </header>
          {post.paragraph.map(p => (
            <Fragment key={p.title}>
              <h2>{p.title}</h2>
              {p.text.map(text => (
                <p>{text}</p>
              ))}
            </Fragment>
          ))}
          <footer>
            <section>
              <h2>About the author</h2>
              <img src={post.authorImg} alt="author image" />
              <p>
                <strong>{post.author}</strong>
              </p>
              <p></p>
              <p>{post.authorBio}</p>
            </section>
            <div className="social__share">
              <span>Share the blog post</span>
              <div className="social__buttons">
                <div className="facebook__icon"></div>
                <div className="linkedin__icon"></div>
                <div className="twitter__icon"></div>
              </div>
              <div className="blog__spc"></div>
            </div>
          </footer>
        </article>
        <div className="related__posts">
          <h2>Related blog posts</h2>
          <span></span>
          <div className="card__wrapper">
            <ul>
              <li>
                <img src={require(`../${post.imgUrl}`)} />
                <p>{post.title}</p>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default Post;
