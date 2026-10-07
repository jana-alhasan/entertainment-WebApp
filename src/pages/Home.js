import React, { Fragment, useContext, useEffect, useState } from "react";
import SectionTitle from "../components/common/SectionTitle";
import SearchBar from "../components/Search/SearchBar";
import { useFetch } from "../hooks/useFetch";
import {
  deboune,
  MULTI_SEARCH_API,
  normalizeSearchQuery,
} from "../utils/utils";
import Loader from "../components/common/Loader";
import { BookMarkedContext } from "../context/BookMarkedContext";
import HomeSearchResult from "../components/Search/HomeSearchResult";
import Pagination from "../components/common/Pagination";
import NowPlaying from "../components/HomePage/NowPlaying";
import TopRatedMovie from "../components/HomePage/TopRatedMovie";
import TvSeries from "../components/HomePage/TVSeries";
import TopRatedTV from "../components/HomePage/TopRatedTV";
import Trending from "../components/HomePage/Trending";

const Home = () => {
  const [pageNumberSearch, setPageNumberSearch] = useState(1);
  const [displayedSearch, setDisplayedSearch] = useState(null);
  const { bookMarkedMovies, bookMarkedTVs, indicateBookedMarkedBtn } =
    useContext(BookMarkedContext);
  const [searchInput, setSearchInput] = useState("");
  const normalizedSearch = normalizeSearchQuery(searchInput);
  const { data: search, loading: searchLoading } = useFetch(
    normalizedSearch
      ? `${MULTI_SEARCH_API}${normalizedSearch}&page=${pageNumberSearch}`
      : null
  );
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    if (!searchInput.trim()) {
      setDisplayedSearch(null);
      setPageCount(0);
      return;
    }

    if (search) {
      setDisplayedSearch(search.results || []);
      setPageCount(Number(search.total_pages) || 0);
    } else {
      setDisplayedSearch(null);
      setPageCount(0);
    }
  }, [search, searchInput]);

  const onSearch = (event) => {
    setSearchInput(event.target.value);
    setPageNumberSearch(1);
  };

  const handleSearchInput = deboune(onSearch, 500);

  const handlePageClick = ({ selected }) => {
    if (searchInput.trim()) {
      setPageNumberSearch(Number(selected) + 1);
    } else {
      setPageNumberSearch(1);
    }
  };

  return (
    <main>
      <div className="container">
        <SearchBar
          placeHolder="Search for movies or TV series"
          handleSearchInput={handleSearchInput}
        />
        {!displayedSearch && !normalizedSearch ? (
          <Fragment>
            <Trending />
            <TopRatedTV />
            <TvSeries />
            <TopRatedMovie />
            <NowPlaying />
          </Fragment>
        ) : searchLoading ? (
          <div className="loader-wrapper">
            <Loader />
          </div>
        ) : (
          displayedSearch &&
          search && (
            <Fragment>
              <SectionTitle
                className="section-title"
                content={`Found ${search.total_results} results for '${searchInput}'`}
              />
              <HomeSearchResult
                result={displayedSearch}
                bookMarkedMovies={bookMarkedMovies}
                bookMarkedTVs={bookMarkedTVs}
                indicateBookedMarkedBtn={indicateBookedMarkedBtn}
              />
            </Fragment>
          )
        )}
        <Pagination
          className=""
          handlePageClick={handlePageClick}
          pageCount={pageCount}
        />
      </div>
    </main>
  );
};

export default Home;
