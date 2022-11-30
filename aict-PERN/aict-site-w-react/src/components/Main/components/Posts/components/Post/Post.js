import './post.css'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHeart, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import Comment from './Comment/Comment'
import MakeComment from './MakeComment/MakeComment'
import axios from 'axios'
import { useUserData } from '../../../../../../UserData'


function Post ({postID, postAuthor, postContent, postDate, postFKeyID}) {
    const user = useUserData()
    const [comments, setComment] = useState([])
    useEffect(() => {
        fetch(`http://localhost:3001/comments?fKeyID=${postFKeyID}`)
            .then(res => res.json())
            .then(data => {
                setComment(data.results)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [postFKeyID])


    const deletePost = async () => {
        try {
            await axios.post('http://localhost:3001/delete-post', {
                id: postID
            })
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className="post">
            <div className="post-author-wrap">
                <h2 className="post-author">
                    {postAuthor}
                </h2>
                <div className="post-date">{postDate}</div>
                <FontAwesomeIcon className='post-options-icon' icon={faTrashCan} onClick={deletePost}/>
            </div>
            <p>{postContent}</p>
            <section className='comment-like-section'>
                <FontAwesomeIcon className='heart-icon' icon={faHeart} />
                <FontAwesomeIcon className='comment-icon' icon={faComment} />
            </section>
            <section>
                {
                    user ?
                        <MakeComment postFKeyID={postFKeyID}/>
                    : 
                    <div className='log-in-msg'>Please log in to make a post or comment on posts</div>
                }
                <div className="seperation-line"></div>
            </section>
            <section className='comments'>
                {
                    comments.length > 0 ? 
                        comments.map((comment) => {
                            return <Comment key={comment.id} commentID={comment.id} commentContent={comment.comment} commentAuthor={comment.comment_author}
                            commentDate={comment.date} postFKeyID={postFKeyID} commentParentID={comment.comment_parent_id}/>
                        })
                    : <div className='no-comments-msg'>No comments yet</div>
                }
            </section>
        </div>
    )
}

export default Post