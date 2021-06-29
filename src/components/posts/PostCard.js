import Moment from 'react-moment'

import { getUserId } from '../../lib/auth'

import useForm from '../../hooks/useForm'
import ProfileCard from '../misc/ProfileCard'
import { useState } from 'react'
import { deletePost, toggleLikePost, postComment, deleteComment } from '../../lib/api'


function PostCard({ id, content, createdAt, attachments, likedBy, user, comments, updateData, setUpdateData }) {
  const [refresh, setRefresh] = useState(false)
  const [commentsData, setCommentsData] = useState(comments)
  const { formdata, handleChange } = useForm({
    content: '',
  })
  const userId = getUserId()

  const handleSubmit = (e) => {
    e.preventDefault()

    postComment(id, formdata)
      .then((res) => {
        handleChange({ target: { name: 'content', value: '' } })
        setCommentsData([res.data, ...commentsData])
      })
      .catch(err => console.log(err?.response.data))
  }

  const handleDelete = ({ target: { value } }) => {
    if (window.confirm('Do you really want to delete this comment?')) {
      deleteComment(value)
        .then(() => {
          setCommentsData([...comments.filter(comment => comment.id !== Number(value))])
        })
        .catch(err => console.log(err?.response.data))
    }
  }

  const handlePostDelete = () => {
    if (window.confirm('Do  you really want to delete this post?')) {
      deletePost(id)
        .then(() => {
          setUpdateData(!updateData)
        })
        .catch(err => console.log(err?.response.data))
    }
  }

  const handleLike = () => {
    likedBy.push(userId)
    toggleLikePost(id, { likedBy: likedBy, content: content })
      .then(() => setRefresh(!refresh))
      .catch(err => console.log(err.response.data))
  }

  const handleDislike = () => {
    likedBy.pop(userId)
    toggleLikePost(id, { likedBy: likedBy, content: content })
      .then(() => setRefresh(!refresh))
      .catch(err => console.log(err.response.data))
  }

  comments = commentsData?.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })
  return (
    <div className="post">
      {userId === user.id &&
        <button className="close" onClick={handlePostDelete} value={id}>X</button>}
      <div className="post-content">

        <h4>{content}</h4>
        <small><Moment fromNow>{createdAt}</Moment></small>
        {attachments.length > 0 ? <img width="500px" src={attachments[0]?.url} /> : <img width="500px" src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png' />}

      </div>
      <ProfileCard {...user} />
      <div style={{ display: 'flex', alignItems: 'c' }}>
        {likedBy.includes(userId) ? <i onClick={handleDislike} className="fas fa-heart"></i> : <i onClick={handleLike} className="far fa-heart"></i>}
        <p style={{ margin: '5px 0px 0px 10px' }}>{likedBy.length}</p>
        <i style={{ margin: '0px 10px' }} className="far fa-comment-alt"></i>
        {comments && <p style={{ margin: '0px 5px' }}>{comments.length}</p>}
      </div>
      <div id="comments">
        <form onSubmit={handleSubmit}>
          <input
            placeholder="..."
            onChange={handleChange}
            name="content"
            maxLength="100"
            value={formdata.content}
          />
          <p>Characters remaining: {100 - formdata.content.length}</p>
          <button>Comment</button>
        </form>
        <div>
          {comments && comments.map(comment => (
            <div key={comment.id} className="comment">
              {userId === comment.owner.id &&
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
    </div>
  )
}

export default PostCard