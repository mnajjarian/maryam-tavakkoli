import React, { Fragment, useContext, useEffect, useState } from "react";
import db from "../db.json";
import Nav from "./navbar";
import { DataContext } from "../contexts/dataContext";
import { convertFromRaw, EditorState } from "draft-js";
import renderHTML from 'react-render-html';
import { stateToHTML } from "draft-js-export-html";

/* interface Paragraph {
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
            <h1 className="post__title" >{post.title}</h1>
            <div className="post__author">
              <img className="post__author__img" src={require(`../${post.authorImg}`)} alt="author" />
              <p>
                Written by:
                <br />
                <strong className="post__author--name" >{post.author}</strong>
              </p>
            </div>
            <p className="post__short" >{post.shortDescription}</p>
            <img className="post__img" src={require(`../${post.imgUrl}`)} alt="post"/>
          </header>
          {post.paragraph.map(p => (
            <div key={p.title}>
              <h2 className="post__paragraph__title" >{p.title}</h2>
              {p.text.map(text => (
                <p>{text}</p>
              ))}
            </div>
          ))}
          <footer className="post__footer" >
            <section className="post__footer__content" >
              <h2  >About the author</h2>
              <img className="post__footer__img" src={require(`../${post.authorImg}`)} alt="author" />
              <p className="post__author--name" >
                <strong>{post.author}</strong>
              </p>
              <p></p>
              <p className="post__footer__text" >{post.authorBio}</p>
            </section>
            <div className="post__social">
              <span className="post__social__title" >Share the blog post</span>
              <div className="post__social__buttons">
                <div className="post__social__facebook"></div>
                <div className="post__social__linkedin"></div>
                <div className="post__social__twitter"></div>
              </div>
            </div>
          </footer>
        </article>
        <div className="related__posts">
          <h2 className="related__posts__title" >Related blog posts</h2>
          <span className="related__posts--line" ></span>
          <div className="related__posts__card">
            <ul className="related__posts__list" >
              <li className="related__posts__items" >
                <img className="related__posts--img" src={require(`../${post.imgUrl}`)} alt="related post"/>
                <p className="related__posts--text" >{post.title}</p>
              </li>
              <li className="related__posts__items" >
                <img className="related__posts--img" src={require(`../${post.imgUrl}`)} alt="related post"/>
                <p className="related__posts--text" >{post.title}</p>
              </li>
              <li className="related__posts__items" >
                <img className="related__posts--img" src={require(`../${post.imgUrl}`)} alt="related post" />
                <p className="related__posts--text" >{post.title}</p>
              </li>
              <li className="related__posts__items" >
                <img className="related__posts--img" src={require(`../${post.imgUrl}`)} alt="related post"/>
                <p className="related__posts--text" >{post.title}</p>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </Fragment>
  );
}; */


const Post = () => {
  const[posts, setposts] = useState()
    const { data, dataService } = useContext(DataContext);
    console.log(data)
 
    console.log(data.blogs[0].content)

    if(!data.blogs[0]) {
      return <div></div>
    }
    const content = convertFromRaw(data.blogs[0].content);
    const editorState = EditorState.createWithContent(content)
    const editorContentHtml = stateToHTML(editorState.getCurrentContent())
    return(
        <div>
            {renderHTML(editorContentHtml)}
        </div>
    )
};
export default Post;
