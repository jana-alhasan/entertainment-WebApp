const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY || "";

function createQuery(params = {}) {
  const searchParams = new URLSearchParams();

  if (TMDB_API_KEY) {
    searchParams.set("api_key", TMDB_API_KEY);
  }

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.set(key, String(value));
    }
  });

  const query = searchParams.toString();
  return query ? `?${query}` : "";
}

function createTmdbUrl(path, params = {}) {
  return `${TMDB_BASE_URL}${path}${createQuery(params)}`;
}

export const API_IMG = "https://image.tmdb.org/t/p/w500";

export const API_TRENDING_URL = createTmdbUrl("/trending/all/day");

export const API_POPULAR_MOVIES = `${createTmdbUrl("/movie/popular", {
  language: "en",
})}&page=`;

export const API_POPULAR_TV = `${createTmdbUrl("/tv/popular", {
  language: "en",
})}&page=`;

export const SEARCH_MOVIES_API = `${createTmdbUrl("/search/movie", {
  language: "en-US",
  page: 1,
  include_adult: false,
})}&query=`;

export const SEARCH_TVS_API = `${createTmdbUrl("/search/tv", {
  language: "en-US",
  page: 1,
  include_adult: false,
})}&query=`;

export const API_KEY = createQuery({ language: "en-US" });
export const DETAILS_API = TMDB_BASE_URL;

export const TV_Top_RATED = createTmdbUrl("/tv/top_rated", {
  language: "en-US",
  page: 1,
});

export const TV_LATEST_API = createTmdbUrl("/tv/airing_today", {
  language: "en-US",
  page: 1,
});

export const MOVIES_Top_RATED = createTmdbUrl("/movie/top_rated", {
  language: "en-US",
  page: 1,
});

export const MOVIES_LATEST_API = createTmdbUrl("/movie/now_playing", {
  language: "en-US",
  page: 1,
});

export const MULTI_SEARCH_API = `${createTmdbUrl("/search/multi", {
  language: "en-US",
  include_adult: false,
})}&query=`;

export function normalizeSearchQuery(value) {
  return encodeURIComponent(String(value || "").trim().toLowerCase());
}

export function isBookMarked(id, bookMarked) {
  return bookMarked.some((item) => item.id === id);
}

export const deboune = (func, delay) => {
  let timeoutid;
  return function (...args) {
    clearTimeout(timeoutid);
    timeoutid = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

export function toHoursAndMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return { hours, minutes };
}
