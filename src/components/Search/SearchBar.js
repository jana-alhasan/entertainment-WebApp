import React from "react";

const SearchBar = ({ placeHolder, handleSearchInput }) => {
  const searchLabel = placeHolder || "Search";

  return (
    <div className="search-bar" role="search">
      <i className="fa fa-search" aria-hidden="true"></i>
      <input
        type="search"
        aria-label={searchLabel}
        placeholder={placeHolder}
        onChange={handleSearchInput}
        autoComplete="off"
      />
    </div>
  );
};

export default SearchBar;
