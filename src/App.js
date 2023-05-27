import React, { useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import { useCallback } from "react";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(null);
  const [clearTimeInterval, setClearTimeInterval] = useState(false);
  const clearTimeIntervalFunc = () => {
    setClearTimeInterval(true);
  };

  

  const dataStored = useCallback(async () => {
    try {
      setIsLoading(true);

      const data = await fetch("https://swapi.dev/api/films");

      if (!data.ok) {
        throw new Error("something went retrying");
      }

      const gotData = await data.json();

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
    } catch (error) {
      setShowError(error.message);
    }
  },[]);
  useEffect(() => {
    dataStored();
  }, [dataStored]);

  return (
    <React.Fragment>
      <section></section>
      <section>
        {isLoading && !showError && <p>Loading...</p>}
        {!isLoading && <MoviesList movies={movieList} />}
        {!isLoading && movieList.length === 0 && <p>click on fetch</p>}
        {showError && <button onClick={clearTimeIntervalFunc}>cancal</button>}

        <p>{showError}</p>
      </section>
    </React.Fragment>
  );
}

export default App;
