import React from "react";
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
    <section style={{ flexDirection: props.flexDirect } as React.CSSProperties}>
      <img
        style={{ borderRadius: props.borderRadius }}
        src={props.imgUrl}
        alt="biography image"
      />
      <article>
        <h2>{props.title}</h2>
        <span></span>
        <p>{props.text}</p>
        <div>
          <Link to={props.href}>{props.btnText}</Link>
        </div>
      </article>
    </section>
  </div>
);

export default Section;
