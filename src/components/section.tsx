import React from "react";
import classNames from 'classnames';
import { Link } from "react-router-dom";

interface Props {
  imgUrl: string;
  title: string;
  href: string;
  btnText: string;
  text: string;
  flexDirect: string;
  borderRadius: string;
}
const Section = (props: Props) => (
  <div className="section">
    <section className={classNames({
      section__content: true,
      [`section__content--${props.flexDirect}`]: true
    })}>
      <img
      className="section__img"
        style={{ borderRadius: props.borderRadius }}
        src={props.imgUrl}
        alt="biography"
      />
      <article className="section__article" >
        <h2 className="section__article--title" >{props.title}</h2>
        <span className="section__article--span" ></span>
        <p className="section__article--text" >{props.text}</p>
        <div className="section__article__link" >
          <Link to={props.href}>{props.btnText}</Link>
        </div>
      </article>
    </section>
  </div>
);

export default Section;
