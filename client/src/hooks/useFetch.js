import { useState, useEffect } from "react";

export const useFetch = function (options) {
  const [value, setValue] = useState(options.init);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const req = !options.method
      ? fetch(options.url)
      : fetch(options.url, {
          method: options.method,
          headers: { "Content-type": "application/json; charset=UTF-8" },
          body: JSON.stringify(options.params),
        });

    req
      .then((res) => res.json())
      .then((data) => setValue(data))
      .catch((err) => {
        setError(err.message);
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [options.url, options.method, options.params]);

  const updateValue = (newValue) => setValue(newValue);
  const updateLoading = (loading) => setLoading(loading);
  const updateError = (value) => setError(value);

  return [value, loading, error, updateValue, updateLoading, updateError];
};
