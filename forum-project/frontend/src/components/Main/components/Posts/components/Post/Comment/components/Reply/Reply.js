import './reply.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faTrashCan, faHeartCrack } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { useState, useEffect} from 'react'
import axios from 'axios'
import MakeReply from '../MakeReply/MakeReply'


const Reply = ({reply, replyID, author, date, postFKeyID, atRenderLikes, atRenderDislikes, depth}) => {
    const [replies, setReplies] = useState([])
    const [likes, setLikes] = useState(atRenderLikes)
    const [dislikes, setDislikes] = useState(atRenderDislikes)
    const [showReplyInput, setShowReplyInput] = useState(false)

    useEffect(() => {      
        fetch(`http://localhost:3001/comment/get-reply/${replyID}`)
            .then(res => res.json())
            .then(data => {
                setReplies(data.results)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [replyID])

    const deleteReply = async () => {
        try {
            await axios.post('http://localhost:3001/comment/delete', {
                id: replyID
            }, {withCredentials: true})
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    const handleReplyBtnClick = () => {
        showReplyInput ? setShowReplyInput(false) : setShowReplyInput(true)
    }

    const handleLikeBtnClick = async () => {
        try {
            const results = await axios.get(`http://localhost:3001/comment/like/${replyID}`, {withCredentials: true})
            setLikes(results.data.results.length)
            const updatedDislikes = await axios.get(`http://localhost:3001/comment/reactions-amount/${replyID}`, {withCredentials: true})
            setDislikes(updatedDislikes.data.results.dislikes)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDislikeBtnClick = async () => {
        try {
            const results = await axios.get(`http://localhost:3001/comment/dislike/${replyID}`, {withCredentials: true})
            setDislikes(results.data.results.length)
            const updatedLikes = await axios.get(`http://localhost:3001/comment/reactions-amount/${replyID}`, {withCredentials: true})
            setLikes(updatedLikes.data.results.likes)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className='reply' style={{width: `${depth}%`}}>
                <div className="profile-picture-and-date-container">
                    <div className="profile-picture-wrap">
                        <div className="profile-picture">
                            <FontAwesomeIcon icon={faUser} className="profile-icon"/>
                        </div>
                        <p className='profile-name'>{author}</p>
                    </div>
                    <p className='comment-date'>{date}</p>
                    <FontAwesomeIcon className='comment-options-icon' icon={faTrashCan} onClick={deleteReply}/>
                </div>
                <div className="comment-content-wrap">
                    <p>{reply}</p>
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
            { showReplyInput && <MakeReply 
                setShowReplyInput={setShowReplyInput}
                postFKeyID={postFKeyID}
                replyParentID={replyID}
                style={{width: `${depth}%`}}
            />}
            <div className="replies-from-reply" style={{width: `${depth}%`}}>
                {
                    replies.map(reply => {
                        return <Reply key={reply.id} replyID={reply.id} reply={reply.comment} author={reply.comment_author} date={reply.date} postFKeyID={postFKeyID} atRenderLikes={reply.likes} atRenderDislikes={reply.dislikes} replyParentID={replyID} depth={depth - 2} />
                    })
                }
            </div>
            
        </>
    )
}


export default Reply