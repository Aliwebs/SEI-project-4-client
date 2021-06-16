import { useState, useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { getToken, getPayload } from './lib/auth'

import Login from './components/auth/Login'
import Profile from './components/auth/Profile'
import Register from './components/auth/Register'
import Home from './components/common/Home'
import Navbar from './components/common/Navbar'
import SecureRoute from './components/common/SecureRoute'
import Loading from './components/misc/Loading'

function App() {
  const [profile, setProfile] = useState(null)
  useEffect(() => {
    if (!profile && getToken()) {
      console.log('it ran anywyas')
      axios.get(`/api/auth/profile/${getPayload().sub}/`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
        .then(res => {
          if (res.data.dob === null) res.data.dob = ''
          setProfile(res.data)
        })
        .catch(err => {
          if (err && err.response) {
            console.log(err.response.data)
          } else {
            console.log(err)
          }
        })
    }
  }, [ setProfile])
  console.log('here after')
  return (
    <Router>
      <Navbar profile={profile} />
      <Switch>
        <SecureRoute exact path="/loading">
          <Loading profile={profile} setProfile={setProfile} />
        </SecureRoute>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <SecureRoute exact path="/logout">
          <Login logout={true} />
        </SecureRoute>
        <SecureRoute path="/home" component={Home} />
        <SecureRoute path="/profile">
          <Profile profile={profile} setProfile={setProfile} />
        </SecureRoute>
      </Switch>
    </Router>
  )
}

export default App
