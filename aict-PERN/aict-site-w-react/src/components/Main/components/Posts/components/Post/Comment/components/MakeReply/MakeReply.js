import './makeReply.css'
import { useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'



const MakeReply = ({postFKeyID, replyParentID, setShowReplyInput, style}) => {

    const [comment, setComment] = useState('')
    

    const handleReplyFormSubmit = async (e) => {
        e.preventDefault()
        // const commentToSend = {
        //     comment: comment,
        //     fKeyID: postFKeyID,
        //     parentID: replyParentID,
        // }
        // console.log(commentToSend)
        try {
            const result = await axios.post('http://localhost:3001/reply', {
                comment: comment,
                fKeyID: postFKeyID,
                parentID: replyParentID,
            }, {withCredentials: true})
            console.log(result)
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }




    return (
        <div className="reply-form-container" style={style}>
            <form className='reply-form' action="" onSubmit={handleReplyFormSubmit}>
                <div className="reply">
                    <textarea name="comment" placeholder='Reply..' className='reply-textarea' cols="30" rows="10" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                    <div className="reply-btns-wrap">
                        <FontAwesomeIcon icon={faX} className='reply-exit-icon' onClick={() => setShowReplyInput(false)}/>
                        <button className='reply-submit-btn'>Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default MakeReply