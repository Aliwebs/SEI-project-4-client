import axios from 'axios'
import { useEffect, useState } from 'react'
import { getToken } from '../../lib/auth'
import ProfileCard from '../misc/ProfileCard'
import useForm from '../../hooks/useForm'

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
  const convertDate = (post) => {
    const postCreatedAtDate = post.createdAt.split('T')[0]
    const date = new Date(postCreatedAtDate)
    const list = date.toUTCString().split(' ')
    if (date.getFullYear().toString() !== list[3]) {
      return (`${list[1]} ${list[2]} ${list[3]}`)
    }
    return (list[1] + ' ' + list[2])
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    axios.post('/api/posts/', formdata, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then(() => setUpdateData(!updateData))
      .catch(err => console.log(err.response.data))
  }
  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div id="add-post">
        <h2>Add a post</h2>
        <form onSubmit={handleSubmit}>
          <div>
            {props && <ProfileCard {...props} />}
            <input
              placeholder="write something"
              name="content"
              value={formdata.content}
              onChange={handleChange}
            />
          </div>
          <div className="buttons">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <div id="posts">
        {posts && posts.map(post => (
          <div className="post" key={post.id}>
            <small>{convertDate(post)}</small>
            <p>{post.content}</p>
            <ProfileCard {...post.user} />
          </div>
        ))}
      </div>
    </main>
  )
}

export default Home
