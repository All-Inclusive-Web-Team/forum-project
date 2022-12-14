import './makeReply.css'
import { useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'



const MakeReply = ({replyParentID, postFKeyID, parentID, setShowReplyInput, style}) => {

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
        <div className="make-reply-form-container" style={style}>
            <form className='make-reply-form' action="aict-site-w-react/src/components/Main/components/Posts/components/Post/Comment/components/MakeReply" onSubmit={handleReplyFormSubmit}>
                {/* <div className="make-reply"> */}
                    <textarea name="comment" placeholder='Reply..' className='make-reply-textarea' cols="30" rows="10" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                    <div className="make-reply-btns-wrap">
                        <FontAwesomeIcon icon={faX} className='make-reply-exit-icon' onClick={() => setShowReplyInput(false)}/>
                        <button className='make-reply-submit-btn'>Submit</button>
                    </div>
                {/* </div> */}
            </form>
        </div>
    )
}

export default MakeReply