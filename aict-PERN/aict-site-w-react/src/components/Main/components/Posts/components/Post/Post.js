import './post.css'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment } from '@fortawesome/free-regular-svg-icons'
import { faTrashCan, faHeartCrack } from '@fortawesome/free-solid-svg-icons'
import Comment from './Comment/Comment'
import MakeComment from './MakeComment/MakeComment'
import axios from 'axios'
import { useUserData } from '../../../../../../UserData'


function Post ({postID, postAuthor, atRenderLikes, atRenderDislikes, postContent, postFKeyID, commentAmount, forProfilePage}) {
    const user = useUserData()
    const [comments, setComment] = useState([])
    const [likes, setLikes] = useState(atRenderLikes)
    const [dislikes, setDislikes] = useState(atRenderDislikes)
    const [isMakeCommentVisible, setIsMakeCommentVisible] = useState(true)
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

    const handleLikeBtnClick = async () => {
        try {
            const results = await axios.get(`http://localhost:3001/like-post/${postID}`, {withCredentials: true})
            setLikes(results.data.results.length)
            const updatedDislikes = await axios.get(`http://localhost:3001/post-reactions-amount/${postID}`, {withCredentials: true})
            setDislikes(updatedDislikes.data.results.dislikes)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDislikeBtnClick = async () => {
        try {
            const results = await axios.get(`http://localhost:3001/dislike-post/${postID}`, {withCredentials: true})
            setDislikes(results.data.results.length)
            const updatedLikes = await axios.get(`http://localhost:3001/post-reactions-amount/${postID}`, {withCredentials: true})
            setLikes(updatedLikes.data.results.likes)
        } catch (error) {
            console.log(error)
        }
    }

    const handleCommentBtnClick = () => {
        isMakeCommentVisible ? setIsMakeCommentVisible(false) : setIsMakeCommentVisible(true)
    }

    return (
        <div className="post">
            <div className="post-author-wrap">
                <h2 className="post-author">
                    {postAuthor}
                </h2>
                <FontAwesomeIcon className='post-options-icon' icon={faTrashCan} onClick={deletePost}/>
            </div>
            <p>{postContent}</p>
            <section className='comment-like-section'>
                <div className="heart-container">
                    <FontAwesomeIcon className='post-icon heart-icon' icon={faHeart} onClick={handleLikeBtnClick}/>
                    <div className='post-number number-of-hearts'>{likes}</div>
                    <FontAwesomeIcon className='post-icon heart-break-icon' icon={faHeartCrack} onClick={handleDislikeBtnClick}/>
                    <div className='post-number number-of-broken-hearts'>{dislikes}</div>
                </div>
                <div className="comment-container">
                    <div className='post-number'>{commentAmount}</div>
                    <FontAwesomeIcon className='post-icon comment-icon' icon={faComment} onClick={handleCommentBtnClick}/>
                </div>
            </section>
            {
                !forProfilePage ?
                <section>
                    <div>
                        {
                            user ?
                                <MakeComment postFKeyID={postFKeyID} isMakeCommentVisible={isMakeCommentVisible}/>
                            : 
                            <div className='log-in-msg'>Please log in to make a post or comment on posts</div>
                        }
                        <div className="seperation-line"></div>
                    </div>
                    <div className='comments'>
                        {
                            
                            comments.length > 0 ? 
                                comments.map((comment) => {
                                    return <Comment key={comment.id} commentID={comment.id} commentContent={comment.comment} commentAuthor={comment.author}
                                    commentDate={comment.date} postFKeyID={postFKeyID} atRenderLikes={comment.likes} atRenderDislikes={comment.dislikes} commentParentID={comment.comment_parent_id}/>
                                })
                            : <div className='no-comments-msg'>No comments yet</div>
                        }
                    </div>
                </section>
                : null
            }
        </div>
    )
}

export default Post