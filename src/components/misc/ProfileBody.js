function ProfileBody({ formdata, handleChange, handleSubmit, isChanged }) {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input
          onChange={handleChange}
          name="username"
          placeholder="Username"
          value={formdata.username || ''}
        />
      </div>
      <div>
        <label>First Name</label>
        <input
          onChange={handleChange}
          name="firstName"
          placeholder="First Name"
          value={formdata.firstName || ''}
        />
      </div>
      <div>
        <label>Last Name</label>
        <input
          onChange={handleChange}
          name="lastName"
          placeholder="Last Name"
          value={formdata.lastName || ''}
        />
      </div>
      <div>
        <label>Date Of Birth</label>
        <input
          onChange={handleChange}
          name="dob"
          type="date"
          value={formdata.dob || ''}
        />
      </div>
      <button type="submit" className={`${isChanged ? 'button-alert' : ''}`}>Save Changes</button>
    </form>
  )
}

export default ProfileBody