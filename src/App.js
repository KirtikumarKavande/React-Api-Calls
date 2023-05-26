import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const HandlefetchMovieData = async () => {
    setIsLoading(true);
    const data = await fetch("https://swapi.dev/api/films");
    const gotData = await data.json();
    console.log("---------------------")

    setIsLoading(false);

    const updatedArray = gotData.results.map((item) => {
      return {
        id: item.episode_id,
        title: item.title,
        openingText: item.opening_crawl,
        releaseDate: item.release_date,
      };
    });
    setMovieList(updatedArray);
  };
  console.log("re-evalute")

  return (
    <React.Fragment>
      {console.log("render")}
      <section>
        <button onClick={HandlefetchMovieData}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && <p>Loading...</p>}
        {!isLoading && <MoviesList movies={movieList} />}
      </section>
    </React.Fragment>
  );
}

export default App;
