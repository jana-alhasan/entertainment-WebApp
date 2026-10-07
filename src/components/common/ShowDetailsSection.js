import React from "react";
import { API_IMG, toHoursAndMinutes } from "../../utils/utils";
import CardSlider from "./CardSlider";
import Image from "./Image";
import Loader from "./Loader";

const ShowDetailsSection = (props) => {
  const timeObj = toHoursAndMinutes(props.runtime);

  return (
    <div className="details-wrapper">
      <div className="show-img-wrapper">
        <Image src={API_IMG + props.poster_path} />
        <button
          onClick={(event) => {
            event.preventDefault();
            props.indicateBookedMarkedBtn(props.element, props.mediaType);
          }}
        >
          {props.isBookMarked ? "Remove from BookMarked" : "Add to BookMarked"}
        </button>
      </div>
      <div className="show-info-wrapper">
        <div className="info-wrapper">
          <h1>{props.name}</h1>
          <div className="card-txtContainer">
            <p>{props.year}</p>
            <span></span>
            {props.runtime && (
              <>
                <p>{`${timeObj.hours} hr ${timeObj.minutes} min`}</p>
                <span></span>
              </>
            )}
            <p>{props.mediaType}</p>
            <span></span>
            <div className="rating">
              <i className="fa fa-star"></i>
              <p>{props.vote_average}</p>
            </div>
          </div>
          <div className="genres">
            {(props.genres || []).map((genre) => (
              <span key={genre.id || genre.name}>{genre.name}</span>
            ))}
          </div>
          <p className="show-overview">{props.overview}</p>
        </div>
        {!!props.similar.length && (
          <div className="similar-show-wrapper">
            <h1>You May Also Like</h1>
            {props.similarLoading ? (
              <Loader />
            ) : (
              <CardSlider
                items={props.similar}
                className="similar-card"
                indicateBookedMarkedBtn={props.indicateBookedMarkedBtn}
                bookMarked={props.bookMarked}
                media_type={props.mediaType}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowDetailsSection;
