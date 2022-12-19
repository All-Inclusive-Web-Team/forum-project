import { useEffect, useState } from "react"
import Post from './components/Post/Post'
import './posts.css'


const Posts = () => {

    const [posts, setPosts] = useState([])
    useEffect(() => {
        fetch('http://localhost:3001/post')
            .then(res => res.json())
            .then(data => {
                setPosts(data.results)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])


    return (
        <div className="posts-display">
            {
                posts.length > 0
            ? 
                posts.map((post) => {
                    return <Post key={post.id} postID={post.id} postAuthor={post.author} atRenderLikes={post.likes} atRenderDislikes={post.dislikes} postContent={post.post} postDate={post.date} commentAmount={post.comment_amount} postFKeyID={post.id}/>
                })
            : 
                !posts 
            ? 
                <p>Please configure database on your instance to create a post</p>
            :
                <div className="no-posts-message">No posts currently</div>
            }
        </div>
    )
}

export default Posts