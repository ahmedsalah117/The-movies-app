import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import MediaItem from "../MediaItem/MediaItem";
import { MediaContext } from "../Context/MediaContext";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import MultiSearchResults from "../MultiSearchResults/MultiSearchResults";
import { SearchContext } from "./../Context/SearchContext";
// async function getTrending(mediaType, callback) {
//   let { data } = await axios.get(
//     `https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=caaf94e3a87d727fa6476ee89f042772`
//   );

//   callback(data.results);
//   console.log(data.results);
// }

function Home() {
  let { trendingMovies, trendingPeople, trendingTV, loadingSpinner } =
    useContext(MediaContext);

  let { searchResults, searchedValue } = useContext(SearchContext);
  // console.log(searchResults);
  // const [trendingMovies, setTrendingMovies] = useState([]);
  // const [trendingPeople, setTrendingPeople] = useState([]);
  // const [trendingTV, setTrendingTV] = useState([]);

  // useEffect(() => {
  //   getTrending("movie", setTrendingMovies);
  //   getTrending("person", setTrendingPeople);
  //   getTrending("tv", setTrendingTV);
  // }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home Page</title>
      </Helmet>

      {searchedValue !== null ? (
        <MultiSearchResults />
      ) : loadingSpinner ? (
        <LoadingScreen />
      ) : (
        <>
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
              {trendingMovies?.slice(0, 10).map((item, index) => {
                return <MediaItem key={index} props={item} />;
              })}
            </div>
          </section>
          {/* Trending TV section */}
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

              {trendingTV?.slice(0, 10).map((item, index) => {
                return <MediaItem key={index} props={item} />;
              })}
            </div>
          </section>
          {/*Trending People section*/}
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
                ?.filter((item) => {
                  return (
                    item.profile_path !== null &&
                    item.profile_path !== undefined
                  );
                })
                .slice(0, 10)
                .map((item, index) => {
                  return <MediaItem key={index} props={item} />;
                })}
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default Home;
