import './profilePage.css'
import { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import image from './images/example-cover.png'
import profilePic from './images/profile-pic.png'
import { useUserData } from '../../../../UserData'
import Post from '../Posts/components/Post/Post'
import Comment from '../Posts/components/Post/Comment/Comment'
import { useNavigate } from 'react-router-dom'


const ProfilePage = () => {
    const user = useUserData()
    const [posts, setPosts] = useState([])
    const [comments, setComments] = useState([])
    const [currentTab, setCurrentTab] = useState('post')
    const profilePage = useRef()
    const navigate = useNavigate()

    const handleTabClick = () => {
        currentTab === 'post' ? setCurrentTab('comment') : setCurrentTab('post')
    }


    useEffect(() => {
        if (user) {
            fetch(`http://localhost:3001/post/user-posts/${user.id}`)
                .then(res => res.json())
                .then(data => {
                    setPosts(data.results)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [])

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:3001/comment/user-comments/${user.id}`)
                .then(res => res.json())
                .then(data => {
                    setComments(data.results)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [user])
 

    const handleProfilePageXBtnClick = () => {
        navigate(-1)
    }

    return (
        <section className='profile-page' ref={profilePage}>
            <FontAwesomeIcon className='profile-page-x-btn' icon={faX} onClick={handleProfilePageXBtnClick}/>
            <div className='profile-page-cover-photo-wrap'>
                <img className='profile-page-cover-photo' src={image} alt="" />
            </div>
            <div className='profile-page-user-info'>
                <div className='profile-page-user-basic-info'>
                    <img className='profile-page-profile-pic' src={profilePic} alt="User Profile"/>
                    <h2 className='profile-page-name'>{user ? user.name: ''}</h2>
                </div>
            </div>
            <div className='profile-page-tabs'>
                <div className={currentTab === 'post' ? 'selected-profile-tab' : ''} onClick={handleTabClick}>Posts</div>
                <div className={currentTab === 'comment' ? 'selected-profile-tab' : ''} onClick={handleTabClick}>Comments</div>
            </div>
            {
                currentTab === 'post' ?
                    <div className='posts-display'>
                        {
                            posts.length > 0 
                            ?
                            posts.map(post => {
                                return <Post key={post.id} postID={post.id} postAuthor={post.author} atRenderLikes={post.likes} atRenderDislikes={post.dislikes} postContent={post.post} postDate={post.date} commentAmount={post.comment_amount} postFKeyID={post.id}/>
                            })
                            :
                            <h2>You have no posts currently</h2>
                        }
                    </div>
                : 
                <div className='profile-page-comments-display'>
                    {
                        comments.length > 0
                        ?
                        comments.map((comment) => {
                            return <Comment key={comment.id} commentID={comment.id} commentContent={comment.comment} commentAuthor={comment.author}
                            commentDate={comment.date} atRenderLikes={comment.likes} atRenderDislikes={comment.dislikes} commentParentID={comment.comment_parent_id} forProfilePage={true}/>
                        })
                        :
                        <h2>You have no current comments</h2>
                     }
                </div>
            }   
        </section>
    )
}

export default ProfilePage