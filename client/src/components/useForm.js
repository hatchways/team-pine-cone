import { useState } from 'react';

export default function useForm(initialFValues) {

  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState(initialFValues);

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
    errors,
    setErrors,
    handleInputChange
  }
}