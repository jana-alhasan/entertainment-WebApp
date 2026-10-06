import { createContext } from "react";
import React from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { isBookMarked } from "../utils/utils";

const BookMarkedContext = createContext({});

const BookMarkedContextProvider = (props) => {
  const [bookMarkedMovies, setBookMarkedMovies] = useLocalStorage(
    "bookMarkedMovies",
    []
  );
  const [bookMarkedTVs, setBookMarkedTVS] = useLocalStorage(
    "bookMarkedTVS",
    []
  );

  const handleDeleteBookedMarked = (id, mediaType) => {
    if (mediaType === "movie") {
      setBookMarkedMovies((currentItems) =>
        currentItems.filter((item) => item.id !== id)
      );
    } else {
      setBookMarkedTVS((currentItems) =>
        currentItems.filter((item) => item.id !== id)
      );
    }
  };

  const handleAddBookedMarked = (item, mediaType) => {
    if (mediaType === "movie") {
      setBookMarkedMovies((currentItems) => [...currentItems, item]);
    } else {
      setBookMarkedTVS((currentItems) => [...currentItems, item]);
    }
  };

  const indicateBookedMarkedBtn = (element, mediaType) => {
    const selectedBookmarks =
      mediaType === "movie" ? bookMarkedMovies : bookMarkedTVs;

    if (isBookMarked(element.id, selectedBookmarks)) {
      handleDeleteBookedMarked(element.id, mediaType);
    } else {
      handleAddBookedMarked(element, mediaType);
    }
  };

  return (
    <BookMarkedContext.Provider
      value={{
        bookMarkedMovies,
        bookMarkedTVs,
        indicateBookedMarkedBtn,
      }}
    >
      {props.children}
    </BookMarkedContext.Provider>
  );
};

export { BookMarkedContextProvider, BookMarkedContext };
