function ProfileCard({ profilePic, username }) {
  return (
    <div id="profile-card">
      <p>{username}</p>
      <div className="circle">
        <img src={profilePic} />
      </div>
    </div>
  )
}

export default ProfileCard