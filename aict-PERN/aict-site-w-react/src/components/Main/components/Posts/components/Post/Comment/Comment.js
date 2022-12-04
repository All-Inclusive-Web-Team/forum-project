import './comment.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import MakeReply from './components/MakeReply/MakeReply'
import Reply from './components/Reply/Reply'


const Comment = ({commentID, commentContent, commentAuthor, commentDate, postFKeyID, forProfilePage}) => {
    const [showReplyInput, setShowReplyInput] = useState(false)
    const [replies, setReplies] = useState([])

    // REFS
    const commentRepliesWrap = useRef()

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
                <div className="comment-id-info">
                    <div>Comment ID: {commentID}</div>
                </div>
                <div className="comment-content-wrap">
                    <p>{commentContent}</p>
                </div>
                <div className="reply-btn-wrap">
                    <button className='reply-btn' onClick={handleReplyBtnClick}>Reply</button>
                </div>
                <div className='thread-line'></div>
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
                                    return <Reply key={reply.id} reply={reply.comment} author={reply.author} date={reply.comment_date} postFKeyID={postFKeyID} replyParentID={commentID}/>
                                })
                            }
                        </div>
                </div>
            }
        </>
    )
}

export default Comment