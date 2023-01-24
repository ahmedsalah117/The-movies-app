import React, { useContext, useEffect } from "react";
import { SearchContext } from "../Context/SearchContext";
import MediaItem from "../MediaItem/MediaItem";

function SearchResults() {
  let { MultiSearch } = useContext(SearchContext);

  useEffect(() => {
    console.log("Hello from search results component");
  }, []);
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
          {MultiSearch.map((item, index) => {
            return <MediaItem key={index} props={item} />;
          })}
        </div>
      </section>
    </>
  );
}

export default SearchResults;
