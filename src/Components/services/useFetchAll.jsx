import { useState, useEffect, useRef } from "react";

export default function useFetchAll(urls) {
  const prevUrls = useRef([]);
  const [leaders, setLeaders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only run if the array of URLs passed in changes
    if (areEqual(prevUrls.current, urls)) {
      setLoading(false);
      return;
    }
    prevUrls.current = urls;

    const promises = urls.map((url) => {
      fetch(url).then((response) => {
        if (response.ok) return response.json();
        else throw response;
      });
    });

    Promise.all(promises)
      .then((json) => setLeaders(json))
      .catch((error) => {
        console.error(error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [urls]);

  return { leaders, loading, error };
}

function areEqual(array1, array2) {
  return (
    array1.length === array2.length &&
    array1.every((value, index) => value === array2[index])
  );
}
