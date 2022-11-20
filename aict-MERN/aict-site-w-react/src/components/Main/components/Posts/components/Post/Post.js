import './post.css'
import { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHeart,faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import Comment from './Comment/Comment'
import MakeComment from './MakeComment/MakeComment'
import axios from 'axios'


function Post ({postAuthor, postContent, postFKeyID}) {
    const [comments, setComment] = useState([])
    useEffect(() => {
        fetch(`http://localhost:3001/comments?fKeyID=${postFKeyID}`)
            .then(res => res.json())
            .then(data => {
                setComment(data.result.reverse())
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div className="post">
            <div className="post-author-wrap">
                <h2 className="post-author">
                    {postAuthor}
                </h2>
                <FontAwesomeIcon className='post-options-icon' icon={faEllipsisVertical}/>
            </div>
            <p>{postContent}</p>
            <section className='comment-like-section'>
                <FontAwesomeIcon className='heart-icon' icon={faHeart} />
                <FontAwesomeIcon className='comment-icon' icon={faComment} />
            </section>
            <section>
                <MakeComment postFKeyID={postFKeyID}/>
                <div className="seperation-line"></div>
            </section>
            <section>
                {
                    comments.length > 0 ? 
                        comments.map((comment) => {
                            return <Comment key={comment.id} commentContent={comment.comment} commentAuthor={comment.comment_author}
                            commentDate={comment.to_char}/>
                        })
                    : <div className='no-comments-msg'>No comments yet</div>
                }
            </section>
        </div>
    )
}

export default Post