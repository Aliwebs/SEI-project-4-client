import axios from 'axios'
import Moment from 'react-moment'

import { getToken, getPayload } from '../../lib/auth'

import useForm from '../../hooks/useForm'
import ProfileCard from '../misc/ProfileCard'
import { useState } from 'react'


function PostCard({ id, content, createdAt, user, comments }) {
  const [refresh, setRefresh] = useState(false)
  const { formdata, handleChange } = useForm({
    content: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    axios.post(`/api/posts/${id}/comments/`, formdata, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then((res) => {
        comments.unshift(res.data)
        setRefresh(!refresh)
      })
      .catch(err => console.log(err?.response.data))
  }

  const handleDelete = ({ target: { value } }) => {
    axios.delete(`/api/posts/comments/${value}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then(() => {
        comments = comments.filter(comment => comment.id !== value)
        setRefresh(!refresh)
      })
      .catch(err => console.log(err?.response.data))
  }
  comments.reverse()
  return (
    <div className="post">
      {getPayload().sub === user.id &&
        <button className="close" onClick={handleDelete} value={id}>X</button>}
      <small><Moment fromNow>{createdAt}</Moment></small>
      <p>{content}</p>
      <ProfileCard {...user} />
      <div id="comments">
        <form onSubmit={handleSubmit}>
          <input
            placeholder="..."
            onChange={handleChange}
            name="content"
          />
          <button>Comment</button>
        </form>
        <div>
          {comments && comments.map(comment => (
            <div key={comment.id} className="comment">
              {getPayload().sub === comment.owner.id &&
                <button className="close" onClick={handleDelete} value={comment.id}>X</button>}
              <div>
                <p >{comment.content}</p>
                <small clas="timestamp"><Moment fromNow>{comment.createdAt}</Moment></small>
              </div>
              <ProfileCard {...comment.owner} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PostCard