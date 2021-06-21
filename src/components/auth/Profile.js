import axios from 'axios'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useForm from '../../hooks/useForm'
import { getToken, getPayload } from '../../lib/auth'
import ProfileBody from '../misc/ProfileBody'
import ProfileHeader from '../misc/ProfileHeader'

function Profile({ profile, setProfile }) {
  const { id } = useParams()
  let me = false
  if (!id) {
    me = true
  }
  const { formdata, setFormData, setFormErrors, handleChange, isChanged, setIsChanged } = useForm({
    username: '',
    firstName: '',
    lastName: '',
    profilePic: '',
    backgroundPic: '',
    dob: '',
  })
  useEffect(() => {
    if (!profile && !id) return

    if (id) {
      axios.get(`/api/auth/profile/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
        .then(res => setFormData(res.data))
        .catch((err) => console.log(err))
    } else {
      setFormData(profile)
    }
  }, [profile, setFormData, id])

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const res = await axios.put(`/api/auth/profile/${getPayload().sub}/`, formdata, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      setProfile(res.data)
      setIsChanged(false)
    } catch (err) {
      if (err.response) {
        console.log(err.response.data)
        setFormErrors(err.response.data)
      }
      console.log(err)
    }
  }
  console.log(formdata)
  return (
    <>
      {formdata &&
        <ProfileHeader
          formdata={formdata}
          handleChange={handleChange}
          me={me}
        />
      }
      <main id="profile-main">
        {me ? <ProfileBody
          formdata={formdata}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isChanged={isChanged}
        /> :
          <p>Not me</p>}
      </main>
    </>
  )
}

export default Profile