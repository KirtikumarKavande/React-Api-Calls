import React, { useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(null);
  const [isError, setIsError] = useState(false);
  const [clearTimeInterval, setClearTimeInterval] = useState(false);

  useEffect(() => {
    if (isError) {
      const id = setInterval(async () => {
        const data = await fetch("https://swapi.dev/api/film");
      }, 1000);

      return () => {
        clearInterval(id);
      };
    }
  }, [isError, clearTimeInterval]);

  const HandlefetchMovieData = async () => {
    try {
      setIsLoading(true);
      const data = await fetch("https://swapi.dev/api/film");

      if (!data.ok) {
        setIsError(true);
        console.log("data ok", data.ok);
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
  };

  return (
    <React.Fragment>
      <section>
        <button onClick={HandlefetchMovieData}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && !showError && <p>Loading...</p>}
        {!isLoading && <MoviesList movies={movieList} />}
        {!isLoading && movieList.length === 0 && <p>click on fetch</p>}
        {showError && (
          <button
            onClick={() => {
              setIsError(false);
            }}
          >
            cancal
          </button>
        )}

        <p>{showError}</p>
      </section>
    </React.Fragment>
  );
}

export default App;
