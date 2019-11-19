import React, { useContext } from "react";
import { DataContext } from "../contexts/dataContext";

interface Props {
  name: String;
}
const Author = (props: Props) => {
  const {
    data: { profile }
  } = useContext(DataContext);
  if (!profile) {
    return <div></div>;
  }
  const author = profile.filter((p: any) => p.name === props.name)[0];

  return (
    <>
      <h2>About the author</h2>
      <img
        className="author__img"
        src={require(`../assets/images/bio-image.jpg`)}
        alt="author"
      />
      <p className="author__name">
        <strong>{author.name}</strong>
      </p>
      <p></p>
      <p className="author__bio">{author.biography}</p>
    </>
  );
};

export default Author;
