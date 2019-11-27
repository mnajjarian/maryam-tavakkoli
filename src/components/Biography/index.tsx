import React, { Fragment, useContext } from "react";
import Section from "../Section";
import Header from "../Header";
import Footer from "../Footer";
import { DataContext } from "../../contexts/dataContext";
const baseUrl = 'http://localhost:3001/'


interface Profile {
  name: string;
  image: string;
  biography: string;
}
const Biography = () => {
  const { data: { profile } } = useContext(DataContext);

  if(!profile) {
    return <div></div>
  }
  const { name, image, biography }: Profile = profile[0];
  return(
  <Fragment>
    <Header />
    <Section
      imgUrl={baseUrl+image}
      title={name}
      href="/about"
      btnText="read more"
      flexDirect="row"
      borderRadius="50%"
      text={biography}
    />
    <Footer/>
  </Fragment>
)
};

export default Biography;
