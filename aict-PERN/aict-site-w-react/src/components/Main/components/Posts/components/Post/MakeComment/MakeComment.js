import './makeComment.css'
import { useRef, useState } from 'react'
import axios from 'axios'

const MakeComment = ({postFKeyID}) => {
    const [comment, setComment] = useState('')
    const handleCommentOnFocus = (e) => {
        e.preventDefault()
    }
    const handleCommentFormSubmit = async (e) => {
        e.preventDefault()
        try {
            const result = await axios.post('http://localhost:3001/comments', {
                comment: comment,
                fKeyID: postFKeyID,
            }, {withCredentials: true})
            console.log(result)
            window.location.reload()
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