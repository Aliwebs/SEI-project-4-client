import axios from 'axios'
import { useEffect, useState } from 'react'
import useForm from '../../hooks/useForm'
import { getToken, getPayload } from '../../lib/auth'

function Profile() {
  const [isEditingBackground, setIsEditingBackground] = useState(false)
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const { formdata, setFormData, handleChange, isChanged } = useForm({
    username: '',
    firstName: '',
    lastName: '',
    profilePic: '',
    backgroundPic: '',
    dob: '',
  })
  useEffect(() => {
    axios.get(`/api/auth/profile/${getPayload().sub}/`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then(res => {
        if (res.data.dob === null) res.data.dob = ''
        setFormData(res.data)
      })
      .catch(err => console.log(err))
  }, [setFormData])

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const res = await axios.put(`/api/auth/profile/${getPayload().sub}/`, formdata, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      console.log(res.data)
      setFormData(res.data)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  const handleBackgroundEdit = () => {
    setIsEditingBackground(true)
    setIsEditingProfile(false)
  }
  const handleProfileEdit = () => {
    setIsEditingProfile(true)
    setIsEditingBackground(false)
  }

  const modal = document.querySelectorAll('.modal')

  modal.forEach(div => {
    div.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal')) {
        if (div.display === 'none') {
          div.display = 'flex'
          setIsEditingBackground(true)
          setIsEditingProfile(true)
        } else {
          div.style.display = 'none'
          setIsEditingBackground(false)
          setIsEditingProfile(false)
        }
      }
    })
  })

  return (
    <>

      <header>
        {formdata ?
          <div id="profile-container" style={{ backgroundImage: `url(${formdata.backgroundPic})` }}>
            <div className="circle" onClick={handleProfileEdit}>
              <img src={formdata.profilePic} />
              <p>Edit</p>
            </div>
            <h6>{formdata.username}</h6>
            <button onClick={handleBackgroundEdit} type="button">Edit</button>
          </div>
          : <p>...loading</p>}
        <div className="modal" style={{ display: `${isEditingBackground ? 'flex' : 'none'}` }}>
          <div>
            <label>Change Background Picture</label>
            <input
              onChange={handleChange}
              name="backgroundPic"
              value={formdata.backgroundPic}
            />
          </div>
        </div>
        <div className="modal" style={{ display: `${isEditingProfile ? 'flex' : 'none'}` }}>
          <div>
            <label>Change Profile Picture</label>
            <input
              onChange={handleChange}
              name="profilePic"
              value={formdata.profilePic}
            />
          </div>
        </div>
      </header>
      <main id="profile-main">
        {formdata &&
          <form onSubmit={handleSubmit}>
            <div>
              <label>Username</label>
              <input
                onChange={handleChange}
                name="username"
                placeholder="Username"
                value={formdata.username}
              />
            </div>
            <div>
              <label>First Name</label>
              <input
                onChange={handleChange}
                name="firstName"
                placeholder="First Name"
                value={formdata.firstName}
              />
            </div>
            <div>
              <label>Last Name</label>
              <input
                onChange={handleChange}
                name="lastName"
                placeholder="Last Name"
                value={formdata.lastName}
              />
            </div>
            <div>
              <label>Date Of Birth</label>
              <input
                onChange={handleChange}
                name="dob"
                type="date"
                value={formdata.dob}
              />
            </div>
            <button type="submit" className={`${isChanged ? 'button-alert' : ''}`}>Save Changes</button>
          </form>
        }
      </main>

    </>
  )
}

export default Profile