import './comment.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faTrashCan, faHeartCrack } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import axios from 'axios'
import { useState, useEffect } from 'react'
import MakeReply from './components/MakeReply/MakeReply'
import Reply from './components/Reply/Reply'


const Comment = ({commentID, commentContent, commentAuthor, commentDate, postFKeyID, atRenderLikes, atRenderDislikes, forProfilePage}) => {
    const [showReplyInput, setShowReplyInput] = useState(false)
    const [replies, setReplies] = useState([])
    const [likes, setLikes] = useState(atRenderLikes)
    const [dislikes, setDislikes] = useState(atRenderDislikes)

    const deleteComment = async () => {
        try {
            await axios.post('http://localhost:3001/delete-comment', {
                id: commentID
            })
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {    
        fetch(`http://localhost:3001/reply?parentID=${commentID}`)
            .then(res => res.json())
            .then(data => {
                setReplies(data.results)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [commentID])

    const handleLikeBtnClick = async () => {
        try {
            const results = await axios.get(`http://localhost:3001/like-comment/${commentID}`, {withCredentials: true})
            setLikes(results.data.results.length)
            const updatedDislikes = await axios.get(`http://localhost:3001/comment-reactions-amount/${commentID}`, {withCredentials: true})
            setDislikes(updatedDislikes.data.results.dislikes)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDislikeBtnClick = async () => {
        try {
            const results = await axios.get(`http://localhost:3001/dislike-comment/${commentID}`, {withCredentials: true})
            setDislikes(results.data.results.length)
            const updatedLikes = await axios.get(`http://localhost:3001/comment-reactions-amount/${commentID}`, {withCredentials: true})
            setLikes(updatedLikes.data.results.likes)
        } catch (error) {
            console.log(error)
        }
    }

    const handleReplyBtnClick = () => {
        setShowReplyInput(true)
    }    


    return (
        <>
            <div className='comment'>
                <div className="profile-picture-and-date-container">
                    <div className="profile-picture-wrap">
                        <div className="profile-picture">
                            <FontAwesomeIcon icon={faUser} className="profile-icon"/>
                        </div>
                        <p className='profile-name'>{commentAuthor}</p>
                    </div>
                    <p className='comment-date'>{commentDate}</p>
                    <FontAwesomeIcon className='comment-options-icon' icon={faTrashCan} onClick={deleteComment}/>
                </div>
                <div className="comment-content-wrap">
                    <p>{commentContent}</p>
                </div>
                <div className="reply-btn-wrap">
                    <div className="comment-heart-container">
                        <FontAwesomeIcon icon={faHeart} className='comment-reaction-icon comment-heart-icon' onClick={handleLikeBtnClick}/>
                        <div className='comment-likes-number comment-number-of-reactions'>{likes}</div>
                        <FontAwesomeIcon icon={faHeartCrack} className='comment-reaction-icon comment-heart-break-icon' onClick={handleDislikeBtnClick}/>
                        <div className='comment-dislikes-number comment-number-of-reactions'>{dislikes}</div>
                    </div>
                    <button className='reply-btn' onClick={handleReplyBtnClick}>Reply</button>
                </div>
            </div>
            {   forProfilePage
                ?
                null
                : 
                <div>
                        <div>
                            {
                                showReplyInput && <MakeReply setShowReplyInput={setShowReplyInput} postFKeyID={postFKeyID} replyParentID={commentID}/>
                            }
                        </div>
                        <div className="replies">
                            {
                                replies.map(reply => {
                                    return <Reply key={reply.id} replyID={reply.id} reply={reply.comment} author={reply.author} date={reply.date} atRenderLikes={reply.likes} atRenderDislikes={reply.dislikes} postFKeyID={postFKeyID} depth={96}/>
                                })
                            }
                        </div>
                </div>
            }
        </>
    )
}

export default Comment