import { MovieResult, MovieResultsResponse } from "moviedb-promise";
import { useState } from "react";

const useFetch = (url: string) => {
  const [data, setData] = useState<MovieResult[]>([]);
  const queryURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_THEMOVIEDB}&query=${url}&language=es`;

  const getData = () => {
    fetch(queryURL)
      .then((res) => res.json())
      .then((data: MovieResultsResponse) => {
        if (data.results) {
          setData(data.results);
        }
      });
  };
  return {
    data: data,
    getMovies: getData,
  };
};

export default useFetch;
