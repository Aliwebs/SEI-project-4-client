import ImageUpload from '../upload/ImageUpload'
import { ProfileContext } from '../../App'
import { useEffect, useState, useContext } from 'react'
import { followUser } from '../../lib/api'

function ProfileHeader({ formdata, handleChange, me, id }) {
  const [isFollowing, setIsFollowing] = useState(false)
  const { profile } = useContext(ProfileContext)
  useEffect(() => {
    const users = profile.followers.map(follower => follower.id)
    if (users && users.includes(id)) {
      setIsFollowing(true)
    }
  }, [setIsFollowing, profile, id])

  const handleBackgroundUpload = (url) => {
    handleChange({ target: { name: 'backgroundPic', value: url } })
  }
  const handleProfileUpload = (url) => {
    handleChange({ target: { name: 'profilePic', value: url } })
  }

  const handleFollow = () => {
    // handleChange({ target: { name: 'followers', value: id } })
    followUser(id)
      .then(() => setIsFollowing(!isFollowing))
      .catch(err => console.log(err.response.data))
  }
  return (
    <header>
      <div id="profile-container" style={{ backgroundImage: `url(${formdata.backgroundPic || ''})` }}>
        {me ?
          <>
            <div className="circle">
              <img src={formdata.profilePic || ''} />
              <ImageUpload onUpload={handleProfileUpload} isProfileImg={true} />
            </div>
            <h6 className="username">{formdata.username || ''}</h6>
            {/* <button onClick={() => setModalState('background')} type="button">Edit</button> */}
            <ImageUpload onUpload={handleBackgroundUpload} />
          </>
          :
          <>
            <div className="circle">
              <img src={formdata.profilePic || ''} />
            </div>
            <h6 className="username">{formdata.username || ''}</h6>
            <button onClick={handleFollow} className="btn-danger" type="button">{isFollowing ? 'Unfollow' : 'Follow'} </button>
          </>
        }


      </div>
    </header>
  )

}

export default ProfileHeader