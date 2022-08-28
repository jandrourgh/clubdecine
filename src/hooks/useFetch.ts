import { useState, useEffect } from "react";

const useFetch = (url: string, shouldFetch: boolean) => {
  const [data, setData] = useState(null);
  const queryURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_THEMOVIEDB}&query=${url}`

  useEffect(() => {
    if(shouldFetch){
      fetch(queryURL)
        .then((res) => res.json())
        .then((data: any) => setData(data.results));
    }
  }, [queryURL, shouldFetch]);

  return [data];
};

export default useFetch;