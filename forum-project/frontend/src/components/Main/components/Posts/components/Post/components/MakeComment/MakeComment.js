import './makeComment.css'
import { useState } from 'react'
import axios from 'axios'

const MakeComment = ({postFKeyID, isMakeCommentVisible}) => {
    const [comment, setComment] = useState('')
    const handleCommentOnFocus = (e) => {
        e.preventDefault()
    }
    const handleCommentFormSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`http://localhost:3001/comment/post-comment/${postFKeyID}`, {
                comment: comment
            }, {withCredentials: true})
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }
    return  (
        <div className="make-comment" hidden={isMakeCommentVisible}>
            <form className='make-comment-form' onSubmit={handleCommentFormSubmit}>
                <div className="comment-input-wrap">
                    <textarea value={comment} name="comment" className='comment-input' placeholder='Make a comment..' onFocus={handleCommentOnFocus}
                    onChange={(e) => setComment(e.target.value)}></textarea>
                    <button className='comment-submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default MakeComment