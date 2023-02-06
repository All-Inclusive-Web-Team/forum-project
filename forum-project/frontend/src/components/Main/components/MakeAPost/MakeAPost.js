import './makeAPost.css'
import 'filepond/dist/filepond.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useUserData } from '../../../../UserData'
import { faImage, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useRef, useState } from 'react'
import {FilePond} from 'react-filepond'

const MakeAPost = ({makeAPostVisible, setMakeAPostVisible}) => {
    const user = useUserData()
    const inputOptions = useRef()
    const textInput = useRef()

    const [imageInputOpen, setImageInputOpen] = useState(false)
    const [files, setFiles] = useState([])
    // const [currentPost, setCurrentPost] = useState(null)

    const handleXBtnClick = () => {
        setMakeAPostVisible(true)
    }

    const onImageIconClick = () => {
        imageInputOpen ? setImageInputOpen(false) : setImageInputOpen(true)
    }

    const cancelImageUpload = () => {
        setImageInputOpen(false)
    }

    return (
        <div className="make-a-post" hidden={makeAPostVisible}>
            <div className="make-a-post-wrap">
                <button className='make-a-post-exit-btn' onClick={handleXBtnClick}>
                    <FontAwesomeIcon icon={faXmark}/>
                </button>
                {
                    user ? 
                        <form action="http://localhost:3001/post" method='POST' >
                            <div className="make-a-post-form-pair">
                                <div className="make-a-post-form-label">
                                    <label>Post:</label>
                                </div>
                                <div ref={inputOptions} className="input-options">
                                    <FontAwesomeIcon icon={faImage} onClick={onImageIconClick}/>
                                </div>
                                {
                                    imageInputOpen 
                                    &&
                                    <div className='image-input-container'>
                                        <button onClick={cancelImageUpload} className="image-upload-cancel-btn">Cancel</button>
                                        <FilePond
                                            files={files}
                                            onupdatefiles={setFiles}
                                            allowMultiple={false}
                                            server="http://localhost:3001/post/async-file-upload"
                                            name="imgName"
                                            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                                        />
                                    </div>
                                }
                                <div className="make-a-post-form-input">
                                    <div className='text-input'>
                                        <input type="hidden" value={user.id}/>
                                        <textarea ref={textInput} className='make-a-post-form-textarea' name="post" cols="30" rows="10"></textarea>
                                    </div>
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