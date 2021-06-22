import axios from 'axios'
import { useEffect, useState } from 'react'
import { getToken } from '../../lib/auth'
import ProfileCard from '../misc/ProfileCard'
import useForm from '../../hooks/useForm'
import PostCard from '../posts/PostCard'
import ImageUpload from '../upload/ImageUpload'

function Home(props) {
  const [posts, setPosts] = useState(null)
  const [updateData, setUpdateData] = useState(false)
  const { formdata, handleChange } = useForm({
    content: '',
    attachments: {
      url: '',
    },
  })
  useEffect(() => {
    axios.get('/api/posts/', {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then(res => {
        const followers = props.followers.map(follower => follower.username)
        const myFollows = res.data.filter(post => followers.includes(post.user.username))
        const filteredPosts = [...myFollows, ...res.data?.filter(post => !followers.includes(post.user.username))]
        setPosts(filteredPosts)
      })
      .catch(err => console.log(err))
  }, [updateData, props.followers])


  const handleImageUpload = (url) => {
    handleChange({ target: { name: 'attachments', value: { url: url } } })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/api/posts/', formdata, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then(() => {
        handleChange({ target: { name: 'content', value: '' } })
        handleChange({ target: { name: 'attachments', value: { url: '' } } })
        formdata.attachments.url = ''
        setUpdateData(!updateData)
      })
      .catch(err => console.log(err?.response.data))
  }
  return (
    <div style={{ display: 'flex' }}>
      <aside>
        <h3>Following</h3>
        <div id="followers">
          {props && props.followers && props?.followers.length >= 1 ?
            props.followers.map(follower => (
              <ProfileCard key={follower.id} {...follower} hideUsername={true} reverseUsername={true} />
            )) : <p>No followers...</p>}
        </div>
      </aside>
      <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div id="add-post">
          <h2>Add a post</h2>
          <form onSubmit={handleSubmit}>
            <div>
              {props && <ProfileCard {...props} hideUsername={true} />}
            </div>
            <div>
              <textarea
                placeholder="write something"
                name="content"
                value={formdata.content}
                onChange={handleChange}
                maxLength="250"
              />
              <p>Characters remaining: {250 - formdata.content.length}</p>
              <ImageUpload onUpload={handleImageUpload} isPost />
              <div className="buttons">
                <button className="btn-black" type="submit">Post</button>
              </div>
            </div>
          </form>
        </div>
        <div id="posts">
          {posts && posts.map(post => (
            <PostCard key={post.id} {...post} updateData={updateData} setUpdateData={setUpdateData} />
          ))}
        </div>
      </main>
    </div>
  )
}

export default Home
