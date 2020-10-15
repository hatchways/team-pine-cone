import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core';

export default function useForm(initialFValues) {

  const [values, setValues] = useState(initialFValues);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    })
  };

  // Return object of re-usable variables or functions
  return {
    values,
    setValues,
    handleInputChange
  }
}