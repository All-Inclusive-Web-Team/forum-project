import { useEffect, useState } from "react"
import './posts.css'

const Posts = () => {
    const [posts, setPosts] = useState(null)
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
            posts !== null
                ? posts.map((post) => (
                <div key={post.id} className="post">
                    <h2 className="post-author">
                    {post.posted_by}
                    </h2>
                    <p>{post.post}</p>
                </div>
            ))
            : <p>Please configure database on your instance to create a post</p>
            }
        </div>
    )
}

export default Posts