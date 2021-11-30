import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";
import MovieTrailer from "movie-trailer";

const base_url = "http://image.tmdb.org/t/p/original/";

function Row({ title, fetchURL, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

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
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const closeTrailer = () => {
    setTrailerUrl("");
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      MovieTrailer(movie?.name || movie?.original_name || movie?.title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

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
            onClick={() => handleClick(movie)}
          ></img>
        ))}
      </div>
      {/* When trailerUrl is available, play the youtube video */}
      {trailerUrl && (
        <div className="trailer__viewer">
          <img
            className="close__button"
            src="https://upload.wikimedia.org/wikipedia/commons/7/72/VisualEditor_-_Icon_-_Close_-_white.svg"
            alt="Close Button"
            onClick={() => closeTrailer()}
          />
          <YouTube videoId={trailerUrl} opts={opts}></YouTube>
        </div>
      )}
    </div>
  );
}

export default Row;
