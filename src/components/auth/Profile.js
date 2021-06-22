import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Moment from 'react-moment'


import useForm from '../../hooks/useForm'
import { getToken, getPayload } from '../../lib/auth'

import ProfileBody from '../misc/ProfileBody'
import ProfileHeader from '../misc/ProfileHeader'
import ProfileCard from '../misc/ProfileCard'

function Profile({ profile, setProfile }) {
  const { id } = useParams()
  const [posts, setPosts] = useState(null)
  let me = false
  if (!id) {
    me = true
  }
  const { formdata, setFormData, setFormErrors, handleChange, isChanged, setIsChanged } = useForm({
    username: '',
    firstName: '',
    lastName: '',
    profilePic: '',
    backgroundPic: '',
    dob: '',
    followers: [],
  })
  useEffect(() => {
    if (!profile && !id) return

    if (id) {
      axios.get(`/api/auth/profile/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
        .then(res => setFormData(res.data))
        .then(() => {
          return axios.get(`/api/posts/by/${id}/`, {
            headers: { Authorization: `Bearer ${getToken()}` },
          })
        })
        .then(res => setPosts(res.data))
        .catch((err) => console.log(err))
    } else {
      setFormData(profile)
    }
  }, [profile, setFormData, id])

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const res = await axios.put(`/api/auth/profile/${getPayload().sub}/`, formdata, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      setProfile(res.data)
      setIsChanged(false)
    } catch (err) {
      if (err?.response) {
        console.log(err.response.data)
        setFormErrors(err.response.data)
      }
      console.log(err)
    }
  }
  return (
    <>
      {formdata &&
        <ProfileHeader
          formdata={formdata}
          handleChange={handleChange}
          me={me}
          id={id}
        />
      }
      <main id="profile-main">
        {me ? <ProfileBody
          formdata={formdata}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isChanged={isChanged}
        /> :
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <aside>
              <h3>Following</h3>
              <div id="followers">
                {formdata && formdata?.followers.length < 1
                  ? 'No followers.'
                  : formdata.followers.map(follower => (
                    <ProfileCard key={follower.id} {...follower} hideUsername={true} reverseUsername={true} />
                  ))}
              </div>
            </aside>
            <div id="posts">
              <h3>Posts made by {formdata.username}</h3>
              {posts && posts.map(post => (
                <div className="post" key={post.id}>
                  <small><Moment fromNow>{post.createdAt}</Moment></small>
                  <p>{post.content}</p>
                  <ProfileCard {...post.user} />
                </div>
              ))}
            </div>
          </div>

        }
      </main>
    </>
  )
}

export default Profile