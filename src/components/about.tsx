import React, { Fragment } from "react";
import Section from "./section";
import Header from "./header";
import Footer from "./footer";

const bioImage = require("../assets/images/bio-image.jpg");

const About = () => (
  <Fragment>
    <Header />
    <Section
      imgUrl={bioImage}
      title="About Me"
      href="/"
      btnText="download full CV"
      flexDirect="row-reverse"
      borderRadius="0"
      text='I am a second-year master student in "Cloud computing and services"
    with minors in "Entrepreneurship and business". I am doing my
    studies in “EIT Digital Master School”, where I will obtain a
    double-degree from two universities which I have studied in: Aalto
    University in Finland, and TU Delft in the Netherlands. Currently, I
    am working at Nokia Bell Labs, in Finland, as a thesis writer. In
    this position, I am conducting a research study on containerizing of
    a current telco IoT publish/subscribe application, and suitability
    of Kubernetes to be used for its deployment. Docker, Kubernetes,
    Nokia’s cloud environment (NESC), Apache Kafka and GIT are
    technologies and tools which I am using during my work in Nokia.'
    />
    <Footer />
  </Fragment>
);

export default About;
