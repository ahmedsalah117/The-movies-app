import { createContext, useEffect, useState } from "react";
import axios from "axios";

export let MediaContext = createContext(0);

export default function MediaContextProvider(props) {
  async function getTrending(mediaType, callback) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=caaf94e3a87d727fa6476ee89f042772`
    );

    await callback(data.results);
  }

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingPeople, setTrendingPeople] = useState([]);
  const [trendingTV, setTrendingTV] = useState([]);
  const [loadingSpinner, setLoadingSpinner] = useState(true);

  useEffect(() => {
    getTrending("movie", setTrendingMovies);
    getTrending("person", setTrendingPeople);
    getTrending("tv", setTrendingTV);
    setLoadingSpinner(false);
  }, []);

  return (
    <>
      <MediaContext.Provider
        value={{ trendingMovies, trendingPeople, trendingTV, loadingSpinner }}
      >
        {props.children}
      </MediaContext.Provider>
    </>
  );
}
