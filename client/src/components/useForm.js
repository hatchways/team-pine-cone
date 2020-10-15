import React, { useState } from 'react'

export default function useForm(initialFValues) {

  const [values, setValues] = useState(initialFValues);

  return {
    values,
    setValues,
  }
}
