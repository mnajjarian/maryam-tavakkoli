import React, { Fragment, useContext } from "react";
import Section from "../Section";
import Header from "../Header";

import { DataContext } from "../../contexts/dataContext";
import { AuthContext } from "../../contexts/authContext";

interface Profile {
  name: string;
  image: string;
  biography: string;
}
const Biography = () => {
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
      <Section
        imgUrl={imageUrl}
        title={fullname}
        href="/about"
        btnText="read more"
        flexDirect="row"
        borderRadius="50%"
        text={bio}
      />
  );
};

export default Biography;
