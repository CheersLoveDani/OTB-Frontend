import { useState } from 'react'


function useForm(initialState) {
  const [formData, setFormData] = useState(initialState)
  const [formErrors, setFormErrors] = useState(initialState)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setFormErrors({ ...formErrors, [e.target.name]: '' })
  }
  return {
    formData,
    formErrors,
    setFormData,
    setFormErrors,
    handleChange,
  }
}
export default useForm