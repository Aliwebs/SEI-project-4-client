import axios from 'axios'
import { useHistory, Link, Redirect } from 'react-router-dom'
import useForm from '../../hooks/useForm'
import { getPayload } from '../../lib/auth'

function Login({ profile, onLogin }) {
  const history = useHistory()

  const { formdata, formErrors, setFormErrors, handleChange } = useForm({
    email: '',
    password: '',
  })

  if (profile) {
    return <Redirect to="/home" />
  }
  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const res = await axios.post('/api/auth/login/', formdata)
      onLogin({ token: res.data.token, id: getPayload().sub })
      localStorage.setItem('token', res.data.token)
      history.push('/home')
    } catch (err) {
      const errors = err.response ? err.response.data : undefined
      if (errors) {
        setFormErrors(errors)
      }
    }
  }

  return (
    <main id="login">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        {formErrors.detail && <h3 className="alert">Incorrect Login Details</h3>}
        <input
          name="email"
          onChange={handleChange}
          placeholder="Email address"
          className={formErrors.detail ? 'box-alert' : ''}
        />
        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Password"
          className={formErrors.detail ? 'box-alert' : ''}
        />
        <button type='submit'>Submit</button>
        <div>
          <p>{'Don\'t have an account?'}</p>
          <p><Link to='/register'>Register</Link></p>
        </div>
      </form>
    </main>
  )
}

export default Login
