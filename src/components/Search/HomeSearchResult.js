import React from "react";
import Card from "../common/Card";
import { isBookMarked } from "../../utils/utils";

const HomeSearchResult = ({
  result,
  bookMarkedMovies,
  bookMarkedTVs,
  indicateBookedMarkedBtn,
}) => {
  const renderCard = (element) => {
    const { media_type, id, ...rest } = element;

    if (media_type === "person") {
      return null;
    }

    const isBookedMarked =
      media_type === "movie"
        ? isBookMarked(id, bookMarkedMovies)
        : isBookMarked(id, bookMarkedTVs);

    const detailsPageType = media_type === "movie" ? "movies" : "series";
    const title =
      element.title ||
      element.name ||
      element.original_title ||
      element.original_name;

    return (
      <Card
        key={`${media_type}-${id}`}
        {...rest}
        element={element}
        id={id}
        media_type={media_type}
        title={title}
        isBookedMarked={isBookedMarked}
        indicateBookedMarkedBtn={indicateBookedMarkedBtn}
        className="card"
        to={`/${detailsPageType}/${id}`}
      />
    );
  };

  return (
    <div className="card-container card-container-margin">
      {result.map(renderCard)}
    </div>
  );
};

export default HomeSearchResult;
