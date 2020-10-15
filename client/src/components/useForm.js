import { useState } from 'react';

export default function useForm(initialFormValues) {

  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState(initialFormValues);

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