import React, { useContext } from "react";
import Section from "./Section";

import { DataContext } from "../contexts/dataContext";
import { AuthContext } from "../contexts/authContext";
import Footer from "components/Footer";
import Nav from "components/Navbar";


const About = () => {
  const { authState } = useContext(AuthContext);

  const {
    data: { users }
  } = useContext(DataContext);

  if (!users.length || !authState) {
    return <div></div>;
  }

  //const user = users.filter((user: any) => user._id === authState.id)[0];

  const { firstName, lastName, bio, imageUrl } = users[0];
  const fullname = firstName + " " + lastName;

  return (
    <div className='about'>
      <Nav />
      <Section
        imgUrl={imageUrl}
        text={bio}
      />
      <Footer />
    </div>
  );
};

export default About;
