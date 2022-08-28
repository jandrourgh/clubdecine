import { useState, useEffect } from "react";

const useConfig = (shouldFetch: boolean) => {
  const [config, setConfig] = useState<undefined | {images: {base_url: string}} >(undefined);
  const queryURL = `https://api.themoviedb.org/3/configuration?api_key=${process.env.REACT_APP_THEMOVIEDB}`

  useEffect(() => {
    if(shouldFetch){
      fetch(queryURL)
        .then((res) => res.json())
        .then((data) => setConfig(data));
    }
  }, [queryURL, shouldFetch]);

  return [config];
};

export default useConfig;