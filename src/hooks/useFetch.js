import { useEffect, useState } from "react";

export function useFetch(url) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) {
      setLoading(false);
      setData(null);
      setError(null);
      return;
    }

    const fetchController = new AbortController();
    setError(null);
    setLoading(true);
    setData(null);

    const handleFetch = async () => {
      try {
        const response = await fetch(url, { signal: fetchController.signal });

        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        const responseData = await response.json();
        setData(responseData);
        setLoading(false);
      } catch (err) {
        if (err.name === "AbortError") {
          return;
        }

        setLoading(false);
        setError(err.message);
      }
    };

    handleFetch();

    return () => {
      fetchController.abort();
    };
  }, [url]);

  return { loading, data, error };
}
