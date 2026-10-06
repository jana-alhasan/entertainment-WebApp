import React, { useContext, useEffect, useState } from "react";
import Loader from "../components/common/Loader";
import Pagination from "../components/common/Pagination";
import SectionTitle from "../components/common/SectionTitle";
import SearchBar from "../components/Search/SearchBar";
import TVSection from "../components/TV/TVSection";
import { BookMarkedContext } from "../context/BookMarkedContext";
import { useFetch } from "../hooks/useFetch";
import { API_POPULAR_TV, deboune, SEARCH_TVS_API } from "../utils/utils";

const Tv = () => {
  const [pageNumberTvs, setPageNumberTvs] = useState(1);
  const [pageNumberSearch, setPageNumberSearch] = useState(1);
  const [displayedTVs, setDisplayedTVs] = useState([]);
  const { data: tvs, loading: tvsLoading } = useFetch(
    `${API_POPULAR_TV}${pageNumberTvs}`
  );
  const { bookMarkedTVs, indicateBookedMarkedBtn } =
    useContext(BookMarkedContext);
  const [searchInput, setSearchInput] = useState("");

  const searchUrl = searchInput
    ? `${SEARCH_TVS_API}${searchInput.toLowerCase()}`.replace(
        "page=1",
        `page=${pageNumberSearch}`
      )
    : null;

  const { data: tvSearch, loading: searchLoading } = useFetch(searchUrl);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    if (searchInput.trim()) {
      if (tvSearch) {
        setDisplayedTVs(tvSearch.results || []);
        setPageCount(Number(tvSearch.total_pages) || 0);
      } else {
        setDisplayedTVs([]);
        setPageCount(0);
      }
      return;
    }

    setDisplayedTVs((tvs && tvs.results) || []);
    setPageCount((tvs && Number(tvs.total_pages)) || 0);
  }, [tvs, tvSearch, searchInput]);

  const onSearch = (event) => {
    setSearchInput(event.target.value);
    setPageNumberSearch(1);
  };

  const handleSearchInput = deboune(onSearch, 500);

  const handlePageClick = ({ selected }) => {
    if (searchInput) {
      setPageNumberSearch(Number(selected) + 1);
    } else {
      setPageNumberTvs(Number(selected) + 1);
    }
  };

  const isLoading = searchInput ? searchLoading : tvsLoading;

  return (
    <main>
      <div className="container">
        <SearchBar
          placeHolder="Search for TV series"
          handleSearchInput={handleSearchInput}
        />
        <section>
          {tvSearch ? (
            <SectionTitle
              className="section-title"
              content={`Found ${tvSearch.total_results} results for '${searchInput}'`}
            />
          ) : (
            <SectionTitle className="section-title" content="TV Series" />
          )}
          {isLoading ? (
            <div className="loader-wrapper">
              <Loader />
            </div>
          ) : (
            <TVSection
              className="card-container card-container-margin"
              tvs={displayedTVs}
              indicateBookedMarkedBtn={indicateBookedMarkedBtn}
              bookMarked={bookMarkedTVs}
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

export default Tv;
