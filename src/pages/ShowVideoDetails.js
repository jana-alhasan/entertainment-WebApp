import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import ShowDetailsSection from "../components/common/ShowDetailsSection";
import { useFetch } from "../hooks/useFetch";
import { API_KEY, DETAILS_API, isBookMarked } from "../utils/utils";
import { BookMarkedContext } from "../context/BookMarkedContext";
import Loader from "../components/common/Loader";
import YoutubeEmbed from "../components/common/YoutubeEmbed";

const ShowVideoDetails = () => {
  const { id } = useParams();
  const { data: details } = useFetch(
    `${DETAILS_API}/movie/${id}${API_KEY}`
  );
  const { data: videos } = useFetch(
    `${DETAILS_API}/movie/${id}/videos${API_KEY}`
  );
  const { data: similarMovies, loading: similarLoading } = useFetch(
    `${DETAILS_API}/movie/${id}/similar${API_KEY}`
  );
  const { bookMarkedMovies, indicateBookedMarkedBtn } =
    useContext(BookMarkedContext);
  const isBookedMark = isBookMarked(details && details.id, bookMarkedMovies);

  if (details) {
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
              name={details.original_title}
              year={details.release_date?.substring(0, 4)}
              genres={details.genres}
              overview={details.overview}
              runtime={details.runtime}
              mediaType="movie"
              element={details}
              poster_path={details.poster_path}
              similar={(similarMovies && similarMovies.results) || []}
              similarLoading={similarLoading}
              indicateBookedMarkedBtn={indicateBookedMarkedBtn}
              bookMarked={bookMarkedMovies}
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

export default ShowVideoDetails;
