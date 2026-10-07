import React, { useContext, useEffect, useState } from "react";
import Loader from "../components/common/Loader";
import Pagination from "../components/common/Pagination";
import SectionTitle from "../components/common/SectionTitle";
import MoviesSection from "../components/Movies/MoviesSection";
import SearchBar from "../components/Search/SearchBar";
import { BookMarkedContext } from "../context/BookMarkedContext";
import { useFetch } from "../hooks/useFetch";
import {
  API_POPULAR_MOVIES,
  deboune,
  normalizeSearchQuery,
  SEARCH_MOVIES_API,
} from "../utils/utils";

const Movies = () => {
  const [pageNumberMovies, setPageNumberMovies] = useState(1);
  const [pageNumberSearch, setPageNumberSearch] = useState(1);
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const { data: movies, loading: moviesLoading } = useFetch(
    `${API_POPULAR_MOVIES}${pageNumberMovies}`
  );
  const { bookMarkedMovies, indicateBookedMarkedBtn } =
    useContext(BookMarkedContext);
  const [searchInput, setSearchInput] = useState("");
  const normalizedSearch = normalizeSearchQuery(searchInput);

  const searchUrl = normalizedSearch
    ? `${SEARCH_MOVIES_API}${normalizedSearch}`.replace(
        "page=1",
        `page=${pageNumberSearch}`
      )
    : null;

  const { data: moviesSearch, loading: searchLoading } = useFetch(searchUrl);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    if (searchInput.trim()) {
      if (moviesSearch) {
        setDisplayedMovies(moviesSearch.results || []);
        setPageCount(Number(moviesSearch.total_pages) || 0);
      } else {
        setDisplayedMovies([]);
        setPageCount(0);
      }
      return;
    }

    setDisplayedMovies((movies && movies.results) || []);
    setPageCount((movies && Number(movies.total_pages)) || 0);
  }, [movies, moviesSearch, searchInput]);

  const onSearch = (event) => {
    setSearchInput(event.target.value);
    setPageNumberSearch(1);
  };

  const handleSearchInput = deboune(onSearch, 500);

  const handlePageClick = ({ selected }) => {
    if (searchInput.trim()) {
      setPageNumberSearch(Number(selected) + 1);
    } else {
      setPageNumberMovies(Number(selected) + 1);
    }
  };

  const isLoading = searchInput.trim() ? searchLoading : moviesLoading;

  return (
    <main>
      <div className="container">
        <SearchBar
          placeHolder="Search for movies"
          handleSearchInput={handleSearchInput}
        />
        <section>
          {moviesSearch ? (
            <SectionTitle
              className="section-title"
              content={`Found ${moviesSearch.total_results} results for '${searchInput}'`}
            />
          ) : (
            <SectionTitle className="section-title" content="Movies" />
          )}
          {isLoading ? (
            <div className="loader-wrapper">
              <Loader />
            </div>
          ) : (
            <MoviesSection
              className="card-container card-container-margin"
              movies={displayedMovies}
              indicateBookedMarkedBtn={indicateBookedMarkedBtn}
              bookMarked={bookMarkedMovies}
            />
          )}
        </section>
        <Pagination
          className=""
          handlePageClick={handlePageClick}
          pageCount={pageCount}
        />
      </div>
    </main>
  );
};

export default Movies;
