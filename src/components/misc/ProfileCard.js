import { Link } from 'react-router-dom'
import { getPayload } from '../../lib/auth'

function ProfileCard({ profilePic, username, id }) {
  return (
    <div id="profile-card">
      <p>{username}</p>
      <Link className="circle" to={id === getPayload().sub ? '/profile/' : `/profile/${id}`}>
        <img src={profilePic} />
      </Link>
    </div>
  )
}

export default ProfileCard