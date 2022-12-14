import './makeAPost.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useUserData } from '../../../../UserData'
import { faImage, faXmark } from '@fortawesome/free-solid-svg-icons'

const MakeAPost = ({makeAPostVisible, setMakeAPostVisible}) => {
    const user = useUserData()

    const handleXBtnClick = () => {
        setMakeAPostVisible(true)
    }

    return (
        <div className="make-a-post" hidden={makeAPostVisible}>
            <div className="make-a-post-wrap">
                <button className='make-a-post-exit-btn' onClick={handleXBtnClick}>
                    <FontAwesomeIcon icon={faXmark}/>
                </button>
                {
                    user ? 
                        <form action="http://localhost:3001/post" method='POST'>
                            <div className="make-a-post-form-pair">
                                <div className="make-a-post-form-label">
                                    <label>Post:</label>
                                </div>
                                <div className="make-a-post-form-input">
                                    <div className="input-options">
                                        <FontAwesomeIcon icon={faImage} />
                                    </div>
                                    <input type="hidden" value={user.id}/>
                                    <textarea className='make-a-post-form-textarea' name="post" cols="30" rows="10"></textarea>
                                </div>
                            </div>
                            <div className="make-a-post-form-submit">
                                <button className="make-a-post-form-submit-btn">Submit</button>
                            </div>
                        </form>
                    : <div className='log-in-msg'>Please log in to make a post or comment on posts</div>
                }
            </div>
        </div>
    )
}

export default MakeAPost