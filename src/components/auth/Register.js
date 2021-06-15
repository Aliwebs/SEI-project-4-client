import axios from 'axios'
import { useHistory, Link } from 'react-router-dom'
import useForm from '../../hooks/useForm'

function Register() {
  const history = useHistory()
  const { formdata, formErrors, setFormErrors, handleChange } = useForm({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  })

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      await axios.post('/api/auth/register/', formdata)
      history.push('/')
    } catch (err) {
      const errors = err.response ? err.response.data : undefined
      if (errors) {
        console.log(err.response.data)
        setFormErrors({
          username: errors.username ? errors.username[0] : undefined,
          email: errors.email ? errors.email[0] : undefined,
          password: errors.password ? errors.password : undefined,
          passwordConfirmation: errors.passwordConfirmation ? errors.passwordConfirmation[0] : undefined,
        })
      }
    }
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
        {formErrors.username && <p className="alert">{formErrors.username}</p>}

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
        {formErrors.passwordConfirmation && <p className="alert">{formErrors.passwordConfirmation}</p>}

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