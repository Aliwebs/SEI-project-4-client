import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Login from './components/auth/Login'
import Profile from './components/auth/Profile'
import Register from './components/auth/Register'
// import Home from './components/common/Home'
import SecureRoute from './components/common/SecureRoute'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <SecureRoute exact path="/logout">
          <Login logout={true} />
        </SecureRoute>
        <Route path="/register" component={Register} />
        <SecureRoute path="/home" component={Profile} />

      </Switch>
    </Router>
  )
}

export default App
