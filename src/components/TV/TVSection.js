import React from "react";
import { isBookMarked } from "../../utils/utils";
import Card from "../common/Card";

const TVSection = ({ tvs, indicateBookedMarkedBtn, bookMarked, className }) => {
  return (
    <div className={className}>
      {tvs.map((element) => {
        const {
          id,
          poster_path,
          release_date,
          original_name,
          first_air_date,
        } = element;
        const isBookedMarked = isBookMarked(id, bookMarked);

        return (
          <Card
            element={element}
            title={original_name}
            media_type="tv"
            release_date={release_date}
            id={id}
            key={id}
            first_air_date={first_air_date}
            poster_path={poster_path}
            isBookedMarked={isBookedMarked}
            indicateBookedMarkedBtn={indicateBookedMarkedBtn}
            className="card"
            to={`/series/${id}`}
          />
        );
      })}
    </div>
  );
};

export default TVSection;
