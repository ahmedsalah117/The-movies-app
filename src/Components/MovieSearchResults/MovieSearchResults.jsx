import React, { useContext, useEffect } from "react";
import { SearchContext } from "../Context/SearchContext";
import MediaItem from "../MediaItem/MediaItem";

function MovieSearchResults() {
  let { MovieSearch } = useContext(SearchContext);

  return (
    <>
      <section className="container pt-5">
        <div className="row gx-5">
          {/* <div className="col-md-4 mt-5 pt-5">
            <div className="trending">
              <h2 className="h1">
                Trending<br></br> movies<br></br> to watch now
                <p className="text-muted fs-5 mt-2">
                  most watched movies by days
                </p>
              </h2>
            </div>
          </div> */}
          {MovieSearch?.map((item, index) => {
            return <MediaItem key={index} props={item} />;
          })}
        </div>
      </section>
    </>
  );
}

export default MovieSearchResults;
