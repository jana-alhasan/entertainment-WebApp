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
    <Link to={to}>
      <div
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isHovered ? (
          media_type === "movie" ? (
            <VideoHover videoId={id} fallbackSrc={imageSrc} />
          ) : (
            <TVHover tvId={id} fallbackSrc={imageSrc} />
          )
        ) : (
          <Image src={imageSrc} />
        )}

        <div className="card-txtContainer">
          <p>
            {(release_date && release_date.substring(0, 4)) ||
              (first_air_date && first_air_date.substring(0, 4))}
          </p>
          <span></span>
          {media_type === "movie" ? <FilmIcon /> : <TVIcon />}

          <p>{media_type}</p>
          <span></span>
          <div className="rating">
            <i className="fa fa-star"></i>
            <p>{element.vote_average}</p>
          </div>
        </div>
        <h3>{title}</h3>
        <button
          className="card-bookedMark"
          onClick={(event) => {
            event.preventDefault();
            indicateBookedMarkedBtn(element, media_type);
          }}
        >
          <i
            className={`${isBookedMarked ? "fas" : "far"} fa-bookmark`}
            aria-hidden="true"
          ></i>
        </button>
        <div className="play-container">
          <button>
            <i className="fa-solid fa-play"></i>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Card;
