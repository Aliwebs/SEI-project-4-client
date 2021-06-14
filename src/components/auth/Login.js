import axios from 'axios'
import { useHistory, Link } from 'react-router-dom'

import useForm from '../../hooks/useForm'
import { isAuthenticated } from '../../lib/auth'

function Login({ logout }) {
  const history = useHistory()

  if (logout) {
    localStorage.removeItem('token')
  }

  //code below only runs if coming from /logout
  if (isAuthenticated()) {
    history.push('/home')
  }

  const { formdata, formErrors, setFormErrors, handleChange } = useForm({
    email: '',
    password: '',
  })


  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const res = await axios.post('/api/auth/login/', formdata)
      localStorage.setItem('token', res.data.token)
      history.push('/home')
    } catch (err) {
      const errors = err.response ? err.response.data : undefined
      if (errors) {
        console.log(err.response.data)
        setFormErrors(errors)
      }
    }
  }

  return (
    <main>
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