import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

function ItemDetails() {
  const [itemDetails, setItemDetails] = useState({});
  let { id, mediaType } = useParams();

  async function getItemDetails(id, mediaType) {
    let { data } = await axios.get(`
    https://api.themoviedb.org/3/${mediaType}/${id}?api_key=caaf94e3a87d727fa6476ee89f042772`);
    // setItemDetails(data.results);
    setItemDetails(data);
    // console.log(data);
  }

  useEffect(() => {
    getItemDetails(id, mediaType);
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {itemDetails.title ? `${itemDetails.title}` : `${itemDetails.name}`}
        </title>
        {/* <title>{itemDetails.title}</title> */}
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>

      <section className="container">
        <div className="row">
          <div className="col-md-3">
            <img
              className="w-100 mt-3"
              src={`https://image.tmdb.org/t/p/w500/${itemDetails.poster_path}`}
              alt=""
            />
            <img
              className="w-100 mt-3"
              src={`https://image.tmdb.org/t/p/w500/${itemDetails.profile_path}`}
              alt=""
            />
          </div>

          <div className="col-md-9">
            <h6 className="h1 my-4">{itemDetails.title}</h6>
            <p className="text-muted mb-5">{itemDetails.overview}</p>
            {itemDetails.genres?.map((item, index) => (
              <span index={index} className="bg-info me-4 p-2 rounded-3 ">
                {item.name}
              </span>
            ))}
            {/* checking the vote incase of a clicked movie  */}

            {itemDetails.vote_average ? (
              <p className="mt-5">vote: &nbsp;{itemDetails.vote_average}</p>
            ) : (
              ""
            )}

            {itemDetails.vote_count ? (
              <p>vote count:&nbsp; {itemDetails.vote_count}</p>
            ) : (
              ""
            )}
            {/**Displaying the popularity of the movie depending on the profile_path to differentiate between the popularity of the movie and the one of the actor */}
            {itemDetails.poster_path ? (
              <p>popularity:&nbsp; {itemDetails.popularity}</p>
            ) : (
              ""
            )}
            {itemDetails.release_date ? (
              <p>release date:&nbsp; {itemDetails.release_date}</p>
            ) : (
              ""
            )}

            {/**Incase clicked on an actor's image */}

            {/* checking the actor's name incase of a clicked movie  */}
            {/**Here I used the poster_path to differentiate between the name of the movie and the name o the actor  */}
            {itemDetails.profile_path ? (
              <h1 className="mt-5">Name: &nbsp;{itemDetails.name}</h1>
            ) : (
              ""
            )}

            {itemDetails.biography ? (
              <p className="text-muted mt-4">
                <span className="mt-5 text-white">Biography:</span> &nbsp;
                {itemDetails.biography}
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default ItemDetails;
