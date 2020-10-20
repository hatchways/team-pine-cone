import { useState } from 'react';

export default function useForm(initialFormValues) {

  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState(initialFormValues);

  const handleInputChange = e => {
    let { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    })
  };

  const handleCheckboxChange = (e) => {
    let { name, checked } = e.target;
    setValues({
      ...values,
      [name]: checked,
    });
  };

  // Return object of re-usable variables or functions
  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    handleCheckboxChange
  }
}