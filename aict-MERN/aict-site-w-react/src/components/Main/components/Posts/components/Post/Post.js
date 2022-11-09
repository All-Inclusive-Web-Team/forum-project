import './post.css'
import { useState, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHeart,faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'

function Post ({postAuthor, postContent}) {
    // const [isMouseOverOptionsBtn, setIsMouseOverOptionsBtn] = useState(false)
    // const postOptionsBtnBackground = useRef()
    // const postOptionsBtn = useRef()
    // const onPostOptionsMouseEnter = () => {
    //     postOptionsBtnBackground.current.style.backgroundColor = 'rgba(0,0,0,0.3)'
    //     postOptionsBtn.current.style.color = 'rgb(142, 44, 44)'
    // }
    // const onPostOptionsMouseLeave = () => {
    //     postOptionsBtnBackground.current.style.backgroundColor = ''
    //     postOptionsBtn.current.style.color = ''
    // }
    return (
        <div className="post">
            <div className="post-author-wrap">
                <h2 className="post-author">
                    {postAuthor}
                </h2>
                <FontAwesomeIcon className='post-options-icon' icon={faEllipsisVertical}/>
            </div>
            <p>{postContent}</p>
            <section className='comment-like-section'>
                <FontAwesomeIcon className='heart-icon' icon={faHeart} />
                <FontAwesomeIcon className='comment-icon' icon={faComment} />
            </section>
        </div>
    )
}

export default Post