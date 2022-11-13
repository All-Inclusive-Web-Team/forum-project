import './comment.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'



const Comment = ({commentContent, commentAuthor, commentDate}) => {
    return (
        <div className='comment'>
            <div className="profile-picture-and-date-container">
                <div className="profile-picture-wrap">
                    <FontAwesomeIcon icon={faUser} className="profile-icon"/>
                    <p className='profile-name'>{commentAuthor}</p>
                </div>
                <p className='comment-date'>{commentDate}</p>
            </div>
            <div className="comment-content-wrap">
                <p>{commentContent}</p>
            </div>
        </div>
    )
}

export default Comment