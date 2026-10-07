import React, { useContext } from "react";
import SectionTitle from "../common/SectionTitle";
import { useFetch } from "../../hooks/useFetch";
import { MOVIES_LATEST_API } from "../../utils/utils";
import Loader from "../common/Loader";
import { BookMarkedContext } from "../../context/BookMarkedContext";
import CardSlider from "../common/CardSlider";

const NowPlaying = () => {
  const { bookMarkedMovies, indicateBookedMarkedBtn } =
    useContext(BookMarkedContext);
  const { data: moviesLatest, loading: moviesLatestLoading } =
    useFetch(MOVIES_LATEST_API);

  return (
    <section>
      <SectionTitle
        className="section-title"
        content="Now Playing Movies"
      />
      {moviesLatestLoading ? (
        <Loader />
      ) : (
        moviesLatest && (
          <div className="home-slider">
            <CardSlider
              items={moviesLatest.results}
              className="card"
              bookMarked={bookMarkedMovies}
              indicateBookedMarkedBtn={indicateBookedMarkedBtn}
              media_type="movie"
            />
          </div>
        )
      )}
    </section>
  );
};

export default NowPlaying;
