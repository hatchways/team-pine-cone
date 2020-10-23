import { useState, useEffect } from "react";

export const useFetch = function (options) {
  const [value, setValue] = useState(options.init);
  const [meta, setMeta] = useState({ loading: true, error: null });

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
        setMeta({ ...meta, error: err });
        console.log(err);
      })
      .finally(() => setMeta({ ...meta, loading: false }));
  }, [options.url, options.method, options.params]);

  const updateValue = (newValue) => setValue(newValue);

  return [value, meta.loading, meta.error, updateValue];
};
