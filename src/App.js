import { useState, useEffect, createContext } from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'

export const ProfileContext = createContext(null)

import Login from './components/auth/Login'
import Profile from './components/auth/Profile'
import Register from './components/auth/Register'
import Home from './components/common/Home'
import Navbar from './components/common/Navbar'
import SecureRoute from './components/common/SecureRoute'
import { getProfile } from './lib/api'


function App() {
  const [profile, setProfile] = useState(null)
  const { pathname } = useLocation()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      getProfile()
        .then(res => setProfile(res.data))
        .catch(err => console.log(err.response))
    }
  }, [pathname])

  const updateProfile = (user) => {
    getProfile(user.id)
      .then(res => setProfile(res.data))
      .catch(err => console.log(err.response))
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

