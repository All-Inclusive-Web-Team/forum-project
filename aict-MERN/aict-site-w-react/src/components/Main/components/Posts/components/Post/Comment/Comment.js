import './comment.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'



const Comment  = () => {
    return (
        <div className='comment'>
            <div className="profile-picture-and-date-container">
                <div className="profile-picture-wrap">
                    <FontAwesomeIcon icon={faUser} />
                </div>
                <p>date</p>
            </div>
            <div className="comment-content-wrap">
                <p>this is a comment</p>
            </div>
        </div>
    )
}

export default Comment