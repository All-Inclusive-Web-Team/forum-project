import './reply.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import MakeReply from '../MakeReply/MakeReply'


const Reply = ({reply, author, date, postFKeyID, replyParentID}) => {

    const [showReplyInput, setShowReplyInput] = useState(false)

    const handleReplyBtnClick = () => {
        showReplyInput ? setShowReplyInput(false) : setShowReplyInput(true)
    }

    return (
        <>
            <div className='reply'>
                <div className="profile-picture-and-date-container">
                    <div className="profile-picture-wrap">
                        <FontAwesomeIcon icon={faUser} className="profile-icon"/>
                        <p className='profile-name'>{author}</p>
                    </div>
                    <p className='comment-date'>{date}</p>
                    <FontAwesomeIcon className='comment-options-icon' icon={faTrashCan}/>
                </div>
                <div className="comment-content-wrap">
                    <p>{reply}</p>
                </div>
                <div className="reply-btn-wrap">
                    <button className='reply-btn' onClick={handleReplyBtnClick}>Reply</button>
                </div>
            </div>
            { showReplyInput && <MakeReply style={{
            transform: 'translateY(-10px)', 
            // float: 'right',
            width: 'calc(100% - 4%)',
            marginRight: '0px'
            }} 
            setShowReplyInput={setShowReplyInput}
            postFKeyID={postFKeyID}
            replyParentID={replyParentID}
            />}
        </>
    )
}


export default Reply