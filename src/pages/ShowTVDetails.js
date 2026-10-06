import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import ShowDetailsSection from "../components/common/ShowDetailsSection";
import YoutubeEmbed from "../components/common/YoutubeEmbed";
import { useFetch } from "../hooks/useFetch";
import { API_KEY, DETAILS_API, isBookMarked } from "../utils/utils";
import { BookMarkedContext } from "../context/BookMarkedContext";
import Loader from "../components/common/Loader";

const ShowTVDetails = () => {
  const { bookMarkedTVs, indicateBookedMarkedBtn } =
    useContext(BookMarkedContext);
  const { id } = useParams();
  const { data: details } = useFetch(`${DETAILS_API}/tv/${id}${API_KEY}`);
  const { data: videos } = useFetch(
    `${DETAILS_API}/tv/${id}/videos${API_KEY}`
  );
  const { data: similarSeries, loading: similarLoading } = useFetch(
    `${DETAILS_API}/tv/${id}/similar${API_KEY}`
  );

  const isBookedMark = isBookMarked(details && details.id, bookMarkedTVs);

  if (details != null) {
    return (
      <main>
        <div className="container">
          <div className="video-responsive">
            {videos?.results?.length > 0 && (
              <YoutubeEmbed embedId={videos.results[0].key} />
            )}
          </div>
          <section>
            <ShowDetailsSection
              name={details.name}
              year={details.first_air_date?.substring(0, 4)}
              genres={details.genres}
              mediaType="tv"
              element={details}
              poster_path={details.poster_path}
              similar={(similarSeries && similarSeries.results) || []}
              overview={details.overview}
              episode_run_time={details.episode_run_time}
              similarLoading={similarLoading}
              indicateBookedMarkedBtn={indicateBookedMarkedBtn}
              bookMarked={bookMarkedTVs}
              isBookMarked={isBookedMark}
              vote_average={details.vote_average}
              vote_count={details.vote_count}
            />
          </section>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="container">
        <div className="loader-wrapper">
          <Loader />
        </div>
      </div>
    </main>
  );
};

export default ShowTVDetails;
