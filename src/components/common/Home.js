import { useEffect, useState } from 'react'

import ProfileCard from '../misc/ProfileCard'
import useForm from '../../hooks/useForm'
import PostCard from '../posts/PostCard'
import ImageUpload from '../upload/ImageUpload'
import { getAllPosts, postPost } from '../../lib/api'

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
    getAllPosts()
      .then(res => {
        setPosts(res.data)
      })
      .catch(err => console.log(err))
  }, [updateData, props])

  const handleImageUpload = (url) => {
    handleChange({ target: { name: 'attachments', value: { url: url } } })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    postPost(formdata)
      .then(() => {
        handleChange({ target: { name: 'content', value: '' } })
        handleChange({ target: { name: 'attachments', value: { url: '' } } })
        setUpdateData(!updateData)
      })
      .catch(err => console.log(err?.response.data))
  }
  if (posts) {
    console.log(posts)
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