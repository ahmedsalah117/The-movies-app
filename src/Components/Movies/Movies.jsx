import React, { useContext, useEffect, useState } from "react";
import { MediaContext } from "./../Context/MediaContext";
import MediaItem from "../MediaItem/MediaItem";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import MovieSearchResults from "../MovieSearchResults/MovieSearchResults";
import { SearchContext } from "./../Context/SearchContext";
import { Helmet } from "react-helmet";
function Movies() {
  let { trendingMovies } = useContext(MediaContext);
  let { searchedValue } = useContext(SearchContext);
  const [newSpinner, setNewSpinner] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setNewSpinner(false);
    }, 300);
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Movies</title>
      </Helmet>
      {searchedValue !== null ? (
        <MovieSearchResults />
      ) : newSpinner ? (
        <LoadingScreen></LoadingScreen>
      ) : (
        <section className="container pt-5">
          <div className="row gx-5">
            <div className="col-md-4 mt-5 pt-5">
              <div className="trending">
                <h2 className="h1">
                  Trending<br></br> movies<br></br> to watch now
                  <p className="text-muted fs-5 mt-2">
                    most watched movies by days
                  </p>
                </h2>
              </div>
            </div>
            {trendingMovies.map((item, index) => {
              return <MediaItem key={index} props={item} />;
            })}
          </div>
        </section>
      )}
    </>
  );
}

export default Movies;
