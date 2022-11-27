import './comment.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useState, useEffect } from 'react'
import MakeReply from './components/MakeReply/MakeReply'
import Reply from './components/Reply/Reply'



const Comment = ({commentID, commentContent, commentAuthor, commentDate, postFKeyID}) => {

    // console.log(commentID)
    // console.log(commentParentID)

    let styles = {}

    // if (commentParentID) {
    //     styles = {
    //         display: 'none'
    //     }
    // }

    const [showReplyInput, setShowReplyInput] = useState(false)

    const [replies, setReplies] = useState([])

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
                // console.log(data.result)
                setReplies(data.result)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])


    const handleReplyBtnClick = () => {
        setShowReplyInput(true)
    }    



    return (
        <>
            <div className='comment' style={styles}>
                <div className="profile-picture-and-date-container">
                    <div className="profile-picture-wrap">
                        <FontAwesomeIcon icon={faUser} className="profile-icon"/>
                        <p className='profile-name'>{commentAuthor}</p>
                    </div>
                    <p className='comment-date'>{commentDate}</p>
                    <FontAwesomeIcon className='comment-options-icon' icon={faTrashCan} onClick={deleteComment}/>
                </div>
                <div className="comment-content-wrap">
                    <b style={{textAlign: 'center'}}>{commentID}</b>
                    <p>{commentContent}</p>
                </div>
                <div className="reply-btn-wrap">
                    <button className='reply-btn-comment' onClick={handleReplyBtnClick}>Reply</button>
                </div>
            </div>
            {
                showReplyInput && <MakeReply setShowReplyInput={setShowReplyInput} postFKeyID={postFKeyID} parentID={commentID}/>
            }
            <div className="replies">
                {
                    replies.map(reply => {
                        return <Reply key={reply.id} replyID={reply.id} reply={reply.comment} author={reply.comment_author} date={reply.comment_date} postFKeyID={postFKeyID} replyParentID={commentID} depth={99}/>
                    })
                }
            </div>
        </>
    )
}

export default Comment