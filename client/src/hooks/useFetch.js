import { useState, useEffect } from "react";

export const useFetch = function (options) {
  const [value, setValue] = useState(options.init);
  const [loading, setLoading] = useState(true);

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
      .catch((res) => console.log(res))
      .finally(() => setLoading(false));
  }, [options.url, options.method, options.params]);

  const updateValue = (newValue) => setValue(newValue);

  return [value, loading, updateValue];
};
