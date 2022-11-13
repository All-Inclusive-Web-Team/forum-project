import { useEffect, useState } from "react"
import Post from './components/Post/Post'
import './posts.css'

const Posts = () => {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        fetch('http://localhost:3001/posts')
            .then(res => res.json())
            .then(data => {
                setPosts(data.posts)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    return (
        <div className="posts-display">
            {
            posts.length > 0
                ? posts.map((post) => {
                    return <Post key={post.id} postAuthor={post.post_author} postContent={post.post} postFKeyID={post.comment_id}/>
                })
            : !posts ? 
                <p>Please configure database on your instance to create a post</p>
            :
                <div className="no-posts-message">No posts currently</div>
            }
        </div>
    )
}

export default Posts