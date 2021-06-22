import axios from 'axios'
import { useEffect, useState } from 'react'
import { getToken } from '../../lib/auth'
import ProfileCard from '../misc/ProfileCard'
import useForm from '../../hooks/useForm'
import PostCard from '../posts/PostCard'

function Home(props) {
  const [posts, setPosts] = useState(null)
  const [updateData, setUpdateData] = useState(false)
  const { formdata, handleChange } = useForm({
    content: '',
  })
  useEffect(() => {
    axios.get('/api/posts/', {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then(res => setPosts(res.data))
      .catch(err => console.log(err))
  }, [updateData])
  // const convertDate = (post) => {
  //   const date = new Date(post.createdAt)
  //   const list = date.toUTCString().split(' ')
  //   if (date.getFullYear().toString() !== list[3]) {
  //     return (`${list[1]} ${list[2]} ${list[3]}`)
  //   }
  //   return `${list[1]} ${list[2]} ${list[4]}`
  // }

  // const getTimeElapsed = (post) => {
  //   const date = new Date(post.createdAt)
  //   const time = Math.floor(date.getTime() / 1000)
  //   const timeNow = Math.floor(Date.now() / 1000)
  //   if (timeNow < 60) return new Date((timeNow - time) * 1000).toISOString().substr(12, 8)
  //   return new Date((timeNow - time) * 1000).toISOString().substr(11, 8)
  // }

  const handleSubmit = (e) => {
    e.preventDefault()

    axios.post('/api/posts/', formdata, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then(() => {
        handleChange({ target: { name: 'content', value: '' } })
        setUpdateData(!updateData)
      })
      .catch(err => console.log(err.response.data))
  }
  return (
    <div style={{ display: 'flex' }}>
      <aside>
        <h3>Following</h3>
        <div id="followers">
          {props && props?.followers.length < 1
            ? 'Sorry you don"t have any followers.'
            : props.followers.map(follower => (
              <ProfileCard key={follower.id} {...follower} hideUsername={true} reverseUsername={true} />
            ))}
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
              />
              <div className="buttons">
                <button className="btn-black" type="submit">Post</button>
              </div>
            </div>
          </form>
        </div>
        <div id="posts">
          {posts && posts.map(post => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
      </main>
    </div>
  )
}

export default Home
