import './createPostBtn.css'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCirclePlus, faPlus } from '@fortawesome/free-solid-svg-icons'

library.add(faCirclePlus, faPlus)


const CreatePostBtn = ({setMakeAPostVisible, makeAPostVisible}) => {

    const [style, setStyle] = useState('none')

    const handleOnBtnEnter = () => {
        setStyle('block')
    }
    const handleOnBtnLeave = () => {
        setStyle('none')
    }
    const handleOnBtnClick = () => {
        if (makeAPostVisible === 'none') {
            setMakeAPostVisible('block')
        } else {
            setMakeAPostVisible('none')
        }
    }
    return (
        <>
            <button className="create-post-btn" onMouseEnter={handleOnBtnEnter} onMouseLeave={handleOnBtnLeave} onClick={handleOnBtnClick}>
                <FontAwesomeIcon icon={faPlus} className="create-post-btn-icon"/>
                <div className='create-post-btn-pop-up-memo' style={{display: style}}>Create Post</div>
            </button>
        </>
    )
}


export default CreatePostBtn