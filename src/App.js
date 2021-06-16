import { useState, useEffect } from 'react'
import axios from 'axios'
import { Switch, Route, useLocation } from 'react-router-dom'
import { getToken, getPayload } from './lib/auth'

import Login from './components/auth/Login'
import Profile from './components/auth/Profile'
import Register from './components/auth/Register'
import Home from './components/common/Home'
import Navbar from './components/common/Navbar'
import SecureRoute from './components/common/SecureRoute'


function App() {
  const [profile, setProfile] = useState(null)
  const [isErr, setIsErr] = useState(false)
  const isLoading = !profile && !isErr
  const { pathname } = useLocation()

  useEffect(() => {
    axios.get(`/api/auth/profile/${getPayload().sub}/`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then(res => setProfile(res.data))
      .catch(() => setIsErr(true))
  }, [pathname])

  if (isLoading) {
    return null
  }

  return (
    <>
      {profile && <Navbar profile={profile} />}
      <Switch>
        <Route exact path="/">
          <Login profile={profile} />
        </Route>
        <Route exact path="/register" component={Register} />
        <SecureRoute path="/home" component={Home} />
        <SecureRoute path="/profile">
          <Profile profile={profile} setProfile={setProfile} />
        </SecureRoute>
      </Switch>
    </>
  )
}

export default App

