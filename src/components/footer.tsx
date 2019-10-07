import React from "react";

const Footer = () => (
  <div className="footer">
    <section>
      <h2>Contact</h2>
      <ul>
        <li>
          <a
            href="https://www.linkedin.com/in/maryam-tavakoli/"
            target="_blank"
          >
            <div className="linkedin"></div>
          </a>
        </li>
        <li>
          <a
            href="https://www.facebook.com/maryam.tavakkoli.39566"
            target="_blank"
          >
            <div className="facebook"></div>
          </a>
        </li>
      </ul>
      <span>
        site by{" "}
        <a href="https://github.com/mnajjarian" target="_blank">
          mahdi najjarian
        </a>
      </span>
    </section>
  </div>
);

export default Footer;
