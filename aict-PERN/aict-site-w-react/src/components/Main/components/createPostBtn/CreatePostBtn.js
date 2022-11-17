import './createPostBtn.css'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faPlus } from '@fortawesome/free-solid-svg-icons'


const CreatePostBtn = ({setMakeAPostVisible, makeAPostVisible}) => {

    const [isMouseOverComponent, setIsMouseOverComponent] = useState(true)

    const handleOnBtnEnter = () => {
        setIsMouseOverComponent(false)
    }
    const handleOnBtnLeave = () => {
        setIsMouseOverComponent(true)
    }
    const handleOnBtnClick = () => {
        setMakeAPostVisible(false)
    }
    return (
        <button className="create-post-btn" onMouseEnter={handleOnBtnEnter} onMouseLeave={handleOnBtnLeave} onClick={handleOnBtnClick}>
            <FontAwesomeIcon icon={faPlus} className="create-post-btn-icon"/>
            <div className='create-post-btn-pop-up-memo' hidden={isMouseOverComponent}>Create Post</div>
        </button>
    )
}


export default CreatePostBtn