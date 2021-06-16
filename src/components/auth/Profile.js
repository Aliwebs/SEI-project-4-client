import axios from 'axios'
import { useEffect, useState } from 'react'
import useForm from '../../hooks/useForm'
import { getToken, getPayload } from '../../lib/auth'

function Profile({ profile, setProfile }) {
  const [modalState, setModalState] = useState(null)
  const { formdata, setFormData, setFormErrors, handleChange, isChanged, setIsChanged } = useForm({
    username: '',
    firstName: '',
    lastName: '',
    profilePic: '',
    backgroundPic: '',
    dob: '',
  })
  useEffect(() => {
    if (!profile) return

    setFormData(profile)
  }, [profile, setFormData])


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


  return (
    <>
      {formdata ?
        <header>
          <div id="profile-container" style={{ backgroundImage: `url(${formdata.backgroundPic})` }}>
            <div className="circle" onClick={() => setModalState('profile')}>
              <img src={formdata.profilePic} />
              <p>Edit</p>
            </div>
            <h6 className="username">{formdata.username}</h6>
            <button onClick={() => setModalState('background')} type="button">Edit</button>
          </div>
          {modalState === 'background' &&
            <div className="modal" onClick={() => setModalState(null)}>
              <div>
                <label>Change Background Picture</label>
                <input
                  onChange={handleChange}
                  name="backgroundPic"
                  value={formdata.backgroundPic}
                />
              </div>
            </div>
          }
          {modalState === 'profile' && <div className="modal" onClick={() => setModalState(null)}>
            <div >
              <label>Change Profile Picture</label>
              <input
                onChange={handleChange}
                name="profilePic"
                value={formdata.profilePic}
              />
            </div>
          </div>}
        </header>
        : <p>...loading</p>
      }

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
