import axios from 'axios'
import { useEffect } from 'react'
import useForm from '../../hooks/useForm'
import { getToken, getPayload } from '../../lib/auth'

function Profile() {
  const { formdata, setFormData, handleChange } = useForm({
    username: '',
    firstName: '',
    lastName: '',
    profilePic: '',
    backgroundPic: '',
  })
  useEffect(() => {
    axios.get(`/api/auth/profile/${getPayload().sub}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then(res => setFormData(res.data))
      .catch(err => console.log(err))
  }, [setFormData])

  return (
    <>
      <header id="profile-header">
        <h1>Profile</h1>
        <div style={{ backgroundImage: `url(${formdata.backgroundPic})` }}>
          <img width="100" src={formdata.profilePic} />
        </div>
      </header>
      <main>

        <form>
          <input
            onChange={handleChange}
            name="username"
            placeholder="Username"
            value={formdata.username}
          />
          <input
            onChange={handleChange}
            name="firstName"
            placeholder="First Name"
            value={formdata.firstName}
          />
          <input
            onChange={handleChange}
            name="lastName"
            placeholder="Last Name"
            value={formdata.lastName}
          />
        </form>
      </main>
    </>
  )
}

export default Profile