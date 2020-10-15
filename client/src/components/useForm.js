import { useState } from 'react';

export default function useForm(initialFormValues) {

  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState(initialFormValues);

  const handleInputChange = e => {
    let { name, value, checked } = e.target;
    if (!value) {
      value = checked
    }
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