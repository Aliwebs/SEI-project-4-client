import { useState } from 'react'

export default function useForm(initalState) {
  const [formdata, setFormData] = useState(initalState)
  const [formErrors, setFormErrors] = useState(initalState)

  const handleChange = ({ target: { name, value } }) => {
    setFormData({ ...formdata, [name]: value })
    setFormErrors({ ...formErrors, [name]: '' })
  }

  return {
    formdata,
    setFormData,
    formErrors,
    setFormErrors,
    handleChange,
  }
}

