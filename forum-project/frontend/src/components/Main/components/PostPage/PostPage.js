import './postPage.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Post from '../Posts/components/Post/Post'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

 
const PostPage = () => {
    const {id} = useParams()
    const [postData, setPostData] = useState(null)

    const getPostByID = async () => {
        try {
            const results =  await axios.get(`http://localhost:3001/post/${id}`)
            setPostData(results.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPostByID()
    }, [])


    return (
        <div className='post-page'>
            <Link to="/" style={{textDecoration: 'none'}}>
                <div className="post-page-back-btn-wrap">
                    <FontAwesomeIcon icon={faArrowLeft} className="post-page-back-btn-arrow"/>
                    <button className='post-page-back-btn'>Back to main feed</button>
                </div>
            </Link>
            {
                postData ?
                <Post key={id} postID={id} postAuthor={postData.author} atRenderLikes={postData.likes} atRenderDislikes={postData.dislikes} postContent={postData.post} postDate={postData.date} commentAmount={postData.comment_amount} postFKeyID={postData.id} forPostPage={true}/> :
                'loading'
            }
        </div>
    )
}

export default PostPage