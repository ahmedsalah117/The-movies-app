import React, { useContext, useState, useEffect } from "react";
import { MediaContext } from "./../Context/MediaContext";
import MediaItem from "./../MediaItem/MediaItem";
import LoadingScreen from "./../LoadingScreen/LoadingScreen";
import PeopleSearchResults from "./../PeopleSearchResults/PeopleSearchResults";
import { SearchContext } from "./../Context/SearchContext";
import { Helmet } from "react-helmet";
function People() {
  let { trendingPeople } = useContext(MediaContext);
  let { PeopleSearch, SearchedValue } = useContext(SearchContext);

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
        <title>People</title>
      </Helmet>
      {PeopleSearch.length > 0 ? (
        <PeopleSearchResults />
      ) : newSpinner ? (
        <LoadingScreen />
      ) : (
        <section className="container pt-5">
          <div className="row">
            <div className="col-md-4 mt-5 pt-5">
              <div className="trending">
                <h2 className="h1">
                  Trending<br></br> people<br></br> to watch now
                  <p className="text-muted fs-5 mt-2">
                    most watched people by days
                  </p>
                </h2>
              </div>
            </div>
            {trendingPeople
              .filter((item) => {
                return (
                  item.profile_path !== null && item.profile_path !== undefined
                );
              })
              .slice(0, 10)
              .map((item, index) => {
                return <MediaItem key={index} props={item} />;
              })}
          </div>
        </section>
      )}

      {/* {loadingSpinner ? (
        <LoadingScreen />
      ) : (
        <section className="container pt-5">
          <div className="row">
            <div className="col-md-4 mt-5 pt-5">
              <div className="trending">
                <h2 className="h1">
                  Trending<br></br> people<br></br> to watch now
                  <p className="text-muted fs-5 mt-2">
                    most watched people by days
                  </p>
                </h2>
              </div>
            </div>
            {trendingPeople
              .filter((item) => {
                return (
                  item.profile_path !== null && item.profile_path !== undefined
                );
              })
              .slice(0, 10)
              .map((item, index) => {
                return <MediaItem key={index} props={item} />;
              })}
          </div>
        </section>
      )} */}
    </>
  );
}

export default People;
