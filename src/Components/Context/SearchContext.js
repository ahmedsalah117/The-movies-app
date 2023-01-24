import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { useState } from "react";
import { useEffect, createContext } from "react";

export let SearchContext = createContext(null);

// console.log(searchInput);

export default function SearchContextProvider(props) {
  const [MultiSearch, setMultiSearch] = useState([]);
  const [PeopleSearch, setPeopleSearch] = useState([]);
  const [MovieSearch, setMovieSearch] = useState([]);
  const [TVSearch, setTVSearch] = useState([]);
  const [searchedValue, setSearchedValue] = useState(null);
  async function getSearch(value, type, callback) {
    if (value !== null) {
      let { data } = await axios.get(`
    
      https://api.themoviedb.org/3/search/${type}?api_key=caaf94e3a87d727fa6476ee89f042772&language=en-US&query=${value}&page=1&include_adult=false`);

      callback(data.results);
    }
  }

  useEffect(() => {
    getSearch(searchedValue, "multi", setMultiSearch);
    getSearch(searchedValue, "movie", setMovieSearch);
    getSearch(searchedValue, "person", setPeopleSearch);
    getSearch(searchedValue, "tv", setTVSearch);
  }, []);

  useEffect(() => {
    getSearch(searchedValue, "multi", setMultiSearch);
    getSearch(searchedValue, "movie", setMovieSearch);
    getSearch(searchedValue, "person", setPeopleSearch);
    getSearch(searchedValue, "tv", setTVSearch);
  }, [searchedValue]);

  console.log(searchedValue);
  console.log(PeopleSearch);
  return (
    <>
      <SearchContext.Provider
        value={{
          getSearch,
          searchedValue,
          setSearchedValue,
          MultiSearch,
          MovieSearch,
          PeopleSearch,
          setMovieSearch,
          setPeopleSearch,
          setMultiSearch,
          TVSearch,
          setTVSearch,
        }}
      >
        {props.children}
      </SearchContext.Provider>
    </>
  );
}
