import { useState } from 'react'

export default function useForm(initalState) {
  const [formdata, setFormData] = useState(initalState)
  const [formErrors, setFormErrors] = useState(initalState)
  const [isChanged, setIsChanged] = useState(false)

  const handleChange = ({ target: { name, value } }) => {
    setIsChanged(true)
    setFormData({ ...formdata, [name]: value })
    setFormErrors({ ...formErrors, [name]: '' })
  }

  return {
    formdata,
    setFormData,
    formErrors,
    setFormErrors,
    handleChange,
    isChanged,
  }
}

