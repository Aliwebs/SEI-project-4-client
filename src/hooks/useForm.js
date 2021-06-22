import { useState } from 'react'

export default function useForm(initalState) {
  const [formdata, setFormData] = useState(initalState)
  const [formErrors, setFormErrors] = useState(initalState)
  const [isChanged, setIsChanged] = useState(false)

  const handleChange = ({ target: { name, value } }) => {
    setIsChanged(true)
    if (name === 'followers') {
      setFormData({ ...formdata, followers: [value, ...formdata.followers] })
      setFormErrors({ ...formErrors, [name]: '' })
    } else {
      setFormData({ ...formdata, [name]: value })
      setFormErrors({ ...formErrors, [name]: '' })
    }
  }

  return {
    formdata,
    setFormData,
    formErrors,
    setFormErrors,
    handleChange,
    isChanged,
    setIsChanged,
  }
}

