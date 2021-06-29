import { useHistory, Link, Redirect } from 'react-router-dom'
import useForm from '../../hooks/useForm'
import { register } from '../../lib/auth'

function Register({ profile }) {
  const history = useHistory()
  const { formdata, formErrors, setFormErrors, handleChange } = useForm({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  if (profile) {
    return <Redirect to="/home" />
  }

  const handleSubmit = async event => {
    event.preventDefault()

    register(formdata)
      .then(() => history.push('/'))
      .catch(err => setFormErrors(err.response.data))
  }

  return (
    <main id="register">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <input
          name="username"
          onChange={handleChange}
          placeholder="Username"
          className={formErrors.username ? 'box-alert' : ''}
        />
        {formErrors.username && formErrors.username.map(err => <p key={err} className="alert">{err}</p>)}

        <input
          name="email"
          onChange={handleChange}
          placeholder="Email address"
          className={formErrors.email ? 'box-alert' : ''}
        />
        {formErrors.email && <p className="alert">{formErrors.email}</p>}

        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Password"
          className={formErrors.password ? 'box-alert' : ''}
        />
        {formErrors.password && formErrors.password.map(err => (
          <p key={err} className="alert">{err}<br /></p>
        ))}
        <input
          name="passwordConfirmation"
          type="password"
          onChange={handleChange}
          placeholder="Password Confirmation"
          className={formErrors.passwordConfirmation ? 'box-alert' : ''}
        />
        {formErrors.password && formErrors.password.map(err => <p key={err} className="alert">{err}</p>)}

        <button type='submit'>Submit</button>
        <div>
          <p>{'Already have an account?'}</p>
          <p><Link to='/'>Login</Link></p>
        </div>
      </form>
    </main>
  )
}

export default Register
