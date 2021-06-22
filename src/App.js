import { useState, useEffect, createContext } from 'react'
import axios from 'axios'
import { Switch, Route, useLocation } from 'react-router-dom'
import { getToken, getPayload } from './lib/auth'

export const ProfileContext = createContext(null)

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

  const updateProfile = (user) => {
    axios.get(`/api/auth/profile/${user.id}/`, {
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then(res => setProfile(res.data))
      .catch(() => setIsErr(true))
  }

  if (isLoading) {
    return null
  }

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {profile && <Navbar profile={profile} />}
      <Switch>
        <Route exact path="/">
          <Login profile={profile} onLogin={updateProfile} />
        </Route>
        <Route exact path="/register" component={Register} />
        <SecureRoute path="/home" >
          <Home {...profile} />
        </SecureRoute>
        <SecureRoute path="/profile/:id" component={Profile} />
        <SecureRoute path="/profile/">
          <Profile profile={profile} updateProfile={updateProfile} />
        </SecureRoute>
      </Switch>
    </ProfileContext.Provider>
  )
}

export default App

