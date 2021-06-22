import axios from 'axios'
import Moment from 'react-moment'

import { getToken, getPayload } from '../../lib/auth'

import useForm from '../../hooks/useForm'
import ProfileCard from '../misc/ProfileCard'
import { useState } from 'react'


function PostCard({ id, content, createdAt, attachments, user, comments, updateData, setUpdateData }) {
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

  const handlePostDelete = () => {
    axios.delete(`/api/posts/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then(() => {
        setUpdateData(!updateData)
      })
      .catch(err => console.log(err?.response.data))
  }
  comments = comments.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
  return (
    <div className="post">
      {getPayload().sub === user.id &&
        <button className="close" onClick={handlePostDelete} value={id}>X</button>}
      <div className="post-content">

        <h4>{content}</h4>
        <small><Moment fromNow>{createdAt}</Moment></small>
        {attachments.length > 0 ? <img width="500px" src={attachments[0]?.url} /> : <img width="500px" src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png' />}

      </div>
      <ProfileCard {...user} />
      <div id="comments">
        <form onSubmit={handleSubmit}>
          <input
            placeholder="..."
            onChange={handleChange}
            name="content"
            maxLength="100"
          />
          <p>Characters remaining: {100 - formdata.content.length}</p>
          <button>Comment</button>
        </form>
        <div>
          {comments && comments.map(comment => (
            <div key={comment.id} className="comment">
              {getPayload().sub === comment.owner.id &&
                <button className="close" onTouchEnd={handleDelete} onClick={handleDelete} value={comment.id}>X</button>}
              <ProfileCard {...comment.owner} hideUsername={true} />
              <div>
                <p >{comment.content}</p>
                <small clas="timestamp"><Moment fromNow>{comment.createdAt}</Moment></small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div >
  )
}

export default PostCard