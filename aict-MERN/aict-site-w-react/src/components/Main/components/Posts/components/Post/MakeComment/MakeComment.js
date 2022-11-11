import './makeComment.css'
import { useRef, useState } from 'react'
import axios from 'axios'

const MakeComment = () => {
    const [comment, setComment] = useState('')
    const handleCommentOnFocus = (e) => {
        e.preventDefault()
    }
    const handleCommentFormSubmit = async (e) => {
        e.preventDefault()
        try {
            // after commit
        } catch (error) {
            console.log(error)
        }
    }
    return  (
        <div className="make-comment">
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