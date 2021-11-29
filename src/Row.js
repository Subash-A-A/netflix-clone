import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";

const base_url = "http://image.tmdb.org/t/p/original/";

function Row({ title, fetchURL, isLargeRow }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchURL);
      // console.log(request.data.results);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchURL]);

  // console.log(movies);

  return (
    <div className="row" key={title}>
      {/* Title */}
      <h2>{title}</h2>
      {/*Poster Container */}
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            src={
              isLargeRow
                ? base_url + movie?.poster_path
                : base_url + movie?.backdrop_path
            }
            alt={movie?.name}
            className={isLargeRow ? "poster" : "backdrop__poster"}
          ></img>
        ))}
      </div>
    </div>
  );
}

export default Row;
