import { Link } from 'react-router-dom'
import { getPayload } from '../../lib/auth'

function ProfileCard({ profilePic, username, id, hideUsername, reverseUsername }) {
  return (
    <div id="profile-card">
      {!hideUsername && <p>{username}</p>}
      <Link className="circle" to={id === getPayload().sub || id === undefined ? '/profile/' : `/profile/${id}`}>
        <img src={profilePic} />
      </Link>
      {reverseUsername && <p style={{ margin: '10px' }}>{username}</p>}
    </div>
  )
}

export default ProfileCard