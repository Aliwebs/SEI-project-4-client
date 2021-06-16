import axios from 'axios'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { getToken, getPayload } from '../../lib/auth'

function Loading({ profile, setProfile }) {
  const history = useHistory()

  useEffect(() => {
    const getData = () => {
      if (!profile && getToken()) {
        axios.get(`/api/auth/profile/${getPayload().sub}/`, {
          headers: { Authorization: `Bearer ${getToken()}` },
        })
          .then(res => {
            if (res.data.dob === null) res.data.dob = ''
            console.log('here')
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
    }
    setTimeout(getData, 1000)

  }, [ setProfile])

  if (profile) {
    history.push('/home')
  }
  return <p>..loading</p>
}

export default Loading