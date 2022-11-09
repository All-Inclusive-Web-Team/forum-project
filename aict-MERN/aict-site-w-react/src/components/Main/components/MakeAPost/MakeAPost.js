import './makeAPost.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faXmark } from '@fortawesome/free-solid-svg-icons'

const MakeAPost = ({makeAPostVisible, setMakeAPostVisible}) => {

    const handleXBtnClick = () => {
        setMakeAPostVisible(true)
    }


    return (
        <div className="make-a-post" hidden={makeAPostVisible}>
            <div className="make-a-post-wrap">
                <button className='make-a-post-exit-btn' onClick={handleXBtnClick}>
                    <FontAwesomeIcon icon={faXmark}/>
                </button>
                <form action="http://localhost:3001/posts" method='POST'>
                    {/* <textarea className="make-a-post-input" name="post" id="" cols="30" rows="10"></textarea>
                    <button className='make-a-post-submit-btn'>Submit</button> */}
                    {/* <div className="make-a-post-form-pair">
                        <div className="make-a-post-form-label">
                            <label>Author of Post:</label>
                        </div>
                        <div className="make-a-post-form-input">
                            <input type="text" name="posted_by"/>
                        </div>
                    </div> */}
                    <div className="make-a-post-form-pair">
                        <div className="make-a-post-form-label">
                            <label>Post:</label>
                        </div>
                        <div className="make-a-post-form-input">
                            <div className="input-options">
                                <FontAwesomeIcon icon={faImage} />
                            </div>
                            <textarea className='make-a-post-form-textarea' name="post" cols="30" rows="10"></textarea>
                        </div>
                    </div>
                    <div className="make-a-post-form-submit">
                        <button className="make-a-post-form-submit-btn">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default MakeAPost