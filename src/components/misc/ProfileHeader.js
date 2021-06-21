import { useState } from 'react'

function ProfileHeader({ formdata, handleChange, me }) {
  const [modalState, setModalState] = useState(null)
  return (
    <header>
      <div id="profile-container" style={{ backgroundImage: `url(${formdata.backgroundPic || ''})` }}>
        {me ?
          <>
            <div className="circle" onClick={() => setModalState('profile')}>
              <img src={formdata.profilePic || ''} />
              <p>Edit</p>
            </div>
            <h6 className="username">{formdata.username || ''}</h6>
            <button onClick={() => setModalState('background')} type="button">Edit</button>
          </>
          :
          <>
            <div className="circle">
              <img src={formdata.profilePic || ''} />
            </div>
            <h6 className="username">{formdata.username || ''}</h6>
            <button type="button">Follow</button>
          </>
        }


      </div>
      {modalState === 'background' &&
        <>
          <div className="modal">
            <div onBlur={() => setModalState(null)}>
              <label>Change Background Picture</label>
              <input
                onChange={handleChange}
                name="backgroundPic"
                value={formdata.backgroundPic || ''}
              />
            </div>
          </div>
          <div className="modal-close">
            <span>X</span>
          </div>
        </>
      }
      {modalState === 'profile' &&
        <div className="modal">
          <div onBlur={() => setModalState(null)}>
            <label>Change Profile Picture</label>
            <input
              onChange={handleChange}
              name="profilePic"
              value={formdata.profilePic || ''}
            />
          </div>
        </div>}
    </header>
  )

}

export default ProfileHeader