import React, { useContext, useEffect, useState } from "react";
import MediaItem from "./../MediaItem/MediaItem";
import { MediaContext } from "./../Context/MediaContext";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { SearchContext } from "./../Context/SearchContext";
import TVSearchResults from "../TVSearchResults/TVSearchResults";
import { Helmet } from "react-helmet";
function TV() {
  let { trendingTV, loadingSpinner } = useContext(MediaContext);
  let { TVSearch } = useContext(SearchContext);

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
        <title>TV</title>
      </Helmet>
      {TVSearch.length > 0 ? (
        <TVSearchResults />
      ) : newSpinner ? (
        <LoadingScreen />
      ) : (
        <section className="container pt-5">
          <div className="row gx-5">
            <div className="col-md-4 mt-5 pt-5">
              <div className="trending">
                <h2 className="h1">
                  Trending<br></br> Tv<br></br> to watch now
                  <p className="text-muted fs-5 mt-2">
                    most watched TV by days
                  </p>
                </h2>
              </div>
            </div>

            {trendingTV.map((item, index) => {
              return <MediaItem key={index} props={item} />;
            })}
          </div>
        </section>
      )}
    </>
  );
}

export default TV;
