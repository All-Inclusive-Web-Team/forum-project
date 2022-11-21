import './comment.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEllipsis, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'



const Comment = ({commentID, commentContent, commentAuthor, commentDate}) => {
    const deleteComment = async () => {
        try {
            const result = await axios.post('http://localhost:3001/delete-comment', {
                id: commentID
            })
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='comment'>
            <div className="profile-picture-and-date-container">
                <div className="profile-picture-wrap">
                    <FontAwesomeIcon icon={faUser} className="profile-icon"/>
                    <p className='profile-name'>{commentAuthor}</p>
                </div>
                <p className='comment-date'>{commentDate}</p>
                <FontAwesomeIcon className='comment-options-icon' icon={faTrashCan} onClick={deleteComment}/>
            </div>
            <div className="comment-content-wrap">
                <p>{commentContent}</p>
            </div>
        </div>
    )
}

export default Comment