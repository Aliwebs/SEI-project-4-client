import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Moment from 'react-moment'


import useForm from '../../hooks/useForm'
import { getUserId } from '../../lib/auth'

import ProfileBody from '../misc/ProfileBody'
import ProfileHeader from '../misc/ProfileHeader'
import ProfileCard from '../misc/ProfileCard'
import { getPosts, getProfile, toggleFollowUser } from '../../lib/api'

function Profile({ profile, updateProfile }) {
  const { id } = useParams()
  const [posts, setPosts] = useState(null)
  const userId = getUserId()
  let me = false
  if (!id) {
    me = true
  }
  const { formdata, setFormData, formErrors, setFormErrors, handleChange, isChanged, setIsChanged } = useForm({
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
      getProfile(id)
        .then(res => setFormData(res.data))
        .then(() => {
          return getPosts(id)
        })
        .then(res => setPosts(res.data))
        .catch((err) => console.log(err))
    } else {
      setFormData(profile)
      getPosts(userId)
        .then(res => setPosts(res.data))
        .catch((err) => console.log(err))
    }
  }, [profile, setFormData, id, userId])

  const handleSubmit = (event) => {
    event.preventDefault()
    const followers = formdata.followers.map(follower => follower.id)

    toggleFollowUser({ ...formdata, followers: followers })
      .then(() => {
        updateProfile({ id: getUserId() })
        setIsChanged(false)
      })
      .catch(err => {
        if (err?.response) {
          console.log(err.response.data)
          setFormErrors(err.response.data)
        }
        console.log(err)
      })
  }
  console.log(posts)
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
        {me && <ProfileBody
          formdata={formdata}
          formErrors={formErrors}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isChanged={isChanged}
        />}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {!me &&
            <aside>
              <h3>Following</h3>
              <div id="followers">
                {formdata && formdata.followers && formdata?.followers.length >= 1 ?
                  formdata.followers.map(follower => (
                    <ProfileCard key={follower.id} {...follower} hideUsername={true} reverseUsername={true} />
                  )) : <p>No followers...</p>}
              </div>
            </aside>
          }
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
      </main>
    </>
  )
}

export default Profile