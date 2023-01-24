import React from "react";
import { Link } from "react-router-dom";

function MediaItem({ props }) {
  return (
    <>
      {props.poster_path ? (
        <div className="col-md-2 position-relative">
          <Link
            className="nav-link"
            to={`/itemDetails/${props.id}/${props.media_type}`}
          >
            <img
              className="w-100 mb-3"
              src={`https://image.tmdb.org/t/p/w500/${props.poster_path}`}
              alt=""
            />

            <img
              className="w-100 mb-3"
              src={`https://image.tmdb.org/t/p/w500/${props.profile_path}`}
              alt=""
            />
            <img
              className="w-100 mb-3"
              src={`https://image.tmdb.org/t/p/w500/${props.logo_path}`}
              alt=""
            />

            <h4 className="py-2">
              {props.title}
              {props.name}
            </h4>

            {props.vote_average ? (
              <>
                <div className="position-absolute vote bg-danger">
                  {props.vote_average.toFixed(2)}
                </div>
              </>
            ) : (
              ""
            )}
          </Link>
        </div>
      ) : (
        ""
      )}
      {props.profile_path ? (
        <div className="col-md-2 position-relative">
          <Link
            className="nav-link"
            to={`/itemDetails/${props.id}/${props.media_type}`}
          >
            <img
              className="w-100 mb-3"
              src={`https://image.tmdb.org/t/p/w500/${props.poster_path}`}
              alt=""
            />

            <img
              className="w-100 mb-3"
              src={`https://image.tmdb.org/t/p/w500/${props.profile_path}`}
              alt=""
            />
            <img
              className="w-100 mb-3"
              src={`https://image.tmdb.org/t/p/w500/${props.logo_path}`}
              alt=""
            />

            <h4 className="py-2">
              {props.title}
              {props.name}
            </h4>

            {props.vote_average ? (
              <>
                <div className="position-absolute vote bg-danger">
                  {props.vote_average.toFixed(2)}
                </div>
              </>
            ) : (
              ""
            )}
          </Link>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default MediaItem;
