import React, { useState } from "react";
import { FormControl, InputLabel, Input } from "@material-ui/core";

const StripeInput = function ({ Component, label }) {
  const [error, setError] = useState(null);
  const [input, setInput] = useState("");
	const [test, sdfsd] = useState('');

  const handleChange = (e) => {
    if (e.error) {
      setError(e.error.message);
    } else {
      setError(null);
    }
  };

  return (
    <FormControl fullWidth>
      <InputLabel error={!!error} shrink={true}>
        {error || label}
      </InputLabel>
      <Input
        error={!!error}
        fullWidth
        value={input}
        inputComponent={Component}
        onChange={handleChange}
      />
    </FormControl>
  );
};

export default StripeInput;
