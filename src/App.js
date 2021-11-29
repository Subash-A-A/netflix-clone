import React from "react";
import "./App.css";
import Row from "./Row";
import requests from "./request";
import Banner from "./Banner";

function App() {
  return (
    <div className="App">
      {/* NavBar */}
      {/* Banner */}
      <Banner />
      {/* Rows */}
      <Row
        title="NETFLIX ORIGINALS"
        fetchURL={requests.fetchNetflixOrginals}
        isLargeRow={true}
      />
      <Row title="Trending NOW" fetchURL={requests.fetchTrending} />
      <Row title="Top Rated" fetchURL={requests.fetchTopRated} />
      <Row title="Action Movies" fetchURL={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchURL={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchURL={requests.fetchHorrorMovies} />
      <Row title="Romantic Movies" fetchURL={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchURL={requests.fetchDocumentaries} />
    </div>
  );
}

export default App;
