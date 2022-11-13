import './makeAPost.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import axios from 'axios'

const MakeAPost = ({makeAPostVisible, setMakeAPostVisible}) => {
    const [user, setUser] = useState(null)

    const handleXBtnClick = () => {
        setMakeAPostVisible(true)
    }
    const getUser = async () => {
        try {
            const result = await axios.get('http://localhost:3001/user', {withCredentials: true})
            return result.data
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUser().then(res => {
            if (res === false) {
                setUser(null)
            } else {
                setUser(res)
            }
        }).catch(err =>{
            console.log(err)
        })

    }, [])

    return (
        <div className="make-a-post" hidden={makeAPostVisible}>
            <div className="make-a-post-wrap">
                <button className='make-a-post-exit-btn' onClick={handleXBtnClick}>
                    <FontAwesomeIcon icon={faXmark}/>
                </button>
                {
                    user ? 
                        <form action="http://localhost:3001/posts" method='POST'>
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
                    : <div className='log-in-msg'>Please log in to make a post or comment on posts</div>
                }
            </div>
        </div>
    )
}

export default MakeAPost