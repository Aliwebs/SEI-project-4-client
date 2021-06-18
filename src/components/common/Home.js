import axios from 'axios'
import { useEffect, useState } from 'react'
import { getToken } from '../../lib/auth'
import ProfileCard from '../misc/ProfileCard'
import useForm from '../../hooks/useForm'

function Home() {
  const [posts, setPosts] = useState(null)
  const [updateData, setUpdateData] = useState(false)
  const { formdata, handleChange } = useForm({
    title: '',
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
  console.log(posts)

  const handleSubmit = (e) => {
    e.preventDefault()

    axios.post('/api/posts/', formdata, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then(() => setUpdateData(!updateData))
      .catch(err => console.log(err.response.data))
  }
  console.log(formdata)
  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div id="add-post">
        <h1>Add a post</h1>
        <form onSubmit={handleSubmit}>
          <input placeholder="title" name="title" onChange={handleChange} />
          <input height="200px" placeholder="write something" name="content" onChange={handleChange} />
          <div className="buttons">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <div id="posts">
        {posts && posts.map(post => (
          <div key={post.id}>
            <small>{convertDate(post)}</small>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <ProfileCard {...post.user} />
          </div>
        ))}
      </div>
    </main>
  )
}

export default Home
