import React from "react";

import classes from "./Movie.module.css";
async function deleHandler(id) {
  console.log("delete id", id);

  const response = await fetch(
    `https://api-call-51521-default-rtdb.firebaseio.com/movies/${id}.json`,
    {
      method: "DELETE",
    }
  );
}

const Movie = (props) => {
  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button
        onClick={() => {
          deleHandler(props.id);
        }}
      >
        delete
      </button>
    </li>
  );
};

export default Movie;
