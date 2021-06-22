function ProfileBody({ formdata, handleChange, formErrors, handleSubmit, isChanged }) {
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
        {formErrors.username && formErrors.username.map(err => <p key={err}>{err}</p>)}
      </div>
      <div>
        <label>First Name</label>
        <input
          onChange={handleChange}
          name="firstName"
          placeholder="First Name"
          value={formdata.firstName || ''}
        />
        {formErrors.firstName && formErrors.firstName.map(err => <p key={err}>{err}</p>)}
      </div>
      <div>
        <label>Last Name</label>
        <input
          onChange={handleChange}
          name="lastName"
          placeholder="Last Name"
          value={formdata.lastName || ''}
        />
        {formErrors.lastName && formErrors.lastName.map(err => <p key={err}>{err}</p>)}
      </div>
      <div>
        <label>Date Of Birth</label>
        <input
          onChange={handleChange}
          name="dob"
          type="date"
          value={formdata.dob || ''}
        />
        {formErrors.dob && formErrors.dob.map(err => <p key={err}>{err}</p>)}
      </div>
      <button type="submit" className={`${isChanged ? 'button-alert' : ''}`}>Save Changes</button>
    </form>
  )
}

export default ProfileBody