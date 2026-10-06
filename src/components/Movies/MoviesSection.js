import React from "react";
import Card from "../common/Card";
import { isBookMarked } from "../../utils/utils";

const MoviesSection = ({
  movies,
  indicateBookedMarkedBtn,
  bookMarked,
  className,
}) => {
  return (
    <div className={className}>
      {movies.map((element) => {
        const { id, ...rest } = element;
        const isBookedMarked = isBookMarked(id, bookMarked);

        return (
          <Card
            key={id}
            {...rest}
            element={element}
            id={id}
            title={element.title || element.original_title}
            media_type="movie"
            isBookedMarked={isBookedMarked}
            indicateBookedMarkedBtn={indicateBookedMarkedBtn}
            className="card"
            to={`/movies/${id}`}
          />
        );
      })}
    </div>
  );
};

export default MoviesSection;
