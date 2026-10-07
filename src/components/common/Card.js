import React, { useEffect, useState } from "react";
import Image from "./Image";
import { API_IMG } from "../../utils/utils";
import FilmIcon from "../Movies/FilmIcon";
import TVIcon from "../TV/TVIcon";
import { Link } from "react-router-dom";
import VideoHover from "../Movies/VideoHover";
import TVHover from "../TV/TVHover";
import useDebounce from "../../hooks/useDebounce";

const Card = ({
  element,
  className,
  backdrop_path,
  title,
  media_type,
  release_date,
  first_air_date,
  poster_path,
  isBookedMarked,
  indicateBookedMarkedBtn,
  to,
  id,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseStillHovered, setIsMouseStillHovered] = useState(false);
  const imageSrc = API_IMG + (poster_path || backdrop_path);
  const itemTitle = title || "Entertainment title";

  const debouncedHover = useDebounce(() => {
    if (isMouseStillHovered) {
      setIsHovered(true);
    }
  }, 2000);

  const handleMouseEnter = () => {
    setIsMouseStillHovered(true);
    debouncedHover();
  };

  const handleMouseLeave = () => {
    setIsMouseStillHovered(false);
    setIsHovered(false);
  };

  useEffect(() => {
    if (!isMouseStillHovered) {
      setIsHovered(false);
    }
  }, [isMouseStillHovered]);

  return (
    <div
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        to={to}
        className="card-details-link"
        aria-label={`View details for ${itemTitle}`}
      >
        {isHovered ? (
          media_type === "movie" ? (
            <VideoHover videoId={id} fallbackSrc={imageSrc} />
          ) : (
            <TVHover tvId={id} fallbackSrc={imageSrc} />
          )
        ) : (
          <Image src={imageSrc} alt={`${itemTitle} poster`} />
        )}

        <div className="card-txtContainer">
          <p>
            {(release_date && release_date.substring(0, 4)) ||
              (first_air_date && first_air_date.substring(0, 4))}
          </p>
          <span aria-hidden="true"></span>
          {media_type === "movie" ? <FilmIcon /> : <TVIcon />}

          <p>{media_type}</p>
          <span aria-hidden="true"></span>
          <div className="rating">
            <i className="fa fa-star" aria-hidden="true"></i>
            <p>{element.vote_average}</p>
          </div>
        </div>
        <h3>{title}</h3>
        <div className="play-container" aria-hidden="true">
          <span className="play-indicator">
            <i className="fa-solid fa-play"></i>
          </span>
        </div>
      </Link>

      <button
        type="button"
        className="card-bookedMark"
        aria-label={`${isBookedMarked ? "Remove" : "Add"} ${itemTitle} ${
          isBookedMarked ? "from" : "to"
        } bookmarks`}
        aria-pressed={Boolean(isBookedMarked)}
        onClick={() => indicateBookedMarkedBtn(element, media_type)}
      >
        <i
          className={`${isBookedMarked ? "fas" : "far"} fa-bookmark`}
          aria-hidden="true"
        ></i>
      </button>
    </div>
  );
};

export default Card;
