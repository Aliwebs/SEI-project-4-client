import { Route, Redirect } from 'react-router-dom'
import { isAuthenticated } from '../../lib/auth'

function SecureRoute({ component, ...rest }) {
  //code below is for any secure routes except login
  if (isAuthenticated()) {
    return <Route {...rest} component={component} />
  }
  return <Redirect to="/" />
}

export default SecureRoute