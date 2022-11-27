import './reply.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import MakeReply from '../MakeReply/MakeReply'


const Reply = ({reply, replyID, author, date, postFKeyID, replyParentID, depth}) => {

    // console.log(depth)
    // console.log(replyParentID)

    const [replies, setReplies] = useState([])

    useEffect(() => {      
        fetch(`http://localhost:3001/reply?parentID=${replyID}`)
            .then(res => res.json())
            .then(data => {
                console.log(data.result)
                setReplies(data.result)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])




    const [showReplyInput, setShowReplyInput] = useState(false)

    const handleReplyBtnClick = () => {
        showReplyInput ? setShowReplyInput(false) : setShowReplyInput(true)
    }

    return (
        <>
            <div className='reply' style={{width: `${depth}%`}}>
                <div className="profile-picture-and-date-container">
                    <div className="profile-picture-wrap">
                        <FontAwesomeIcon icon={faUser} className="profile-icon"/>
                        <p className='profile-name'>{author}</p>
                    </div>
                    <p className='comment-date'>{date}</p>
                    <FontAwesomeIcon className='comment-options-icon' icon={faTrashCan}/>
                </div>
                <div className="reply-comment-id-info">
                    <div>comment id: {replyID}</div>
                    {replyParentID && <div>parent id: {replyParentID}</div>}
                </div>
                <div className="comment-content-wrap">
                    <p>{reply}</p>
                </div>
                <div className="reply-btn-wrap">
                    <button className='reply-btn' onClick={handleReplyBtnClick}>Reply</button>
                </div>
            </div>
            { showReplyInput && <MakeReply 
            setShowReplyInput={setShowReplyInput}
            postFKeyID={postFKeyID}
            parentID={replyID}
            style={{width: `${depth}%`,}}
            />}
            <div className="replies-from-reply">
                {
                    replies.map(reply => {
                        return <Reply key={reply.id} replyID={reply.id} reply={reply.comment} author={reply.comment_author} date={reply.comment_date} postFKeyID={postFKeyID} replyParentID={replyID} depth={depth - 2} />
                    })
                }
            </div>
        </>
    )
}


export default Reply