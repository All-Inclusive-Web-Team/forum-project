import { useEffect, useState } from "react"
import './posts.css'

const Posts = () => {
    const [posts, setPosts] = useState(null)

    useEffect(() => {
        fetch('http://localhost:3001/posts')
            .then(res => res.json())
            .then(data => {
                const presentablePosts = data.posts.map((post) => {
                    return <div key={post.id} className="post"><h2 className="post-author">{post.posted_by}</h2><p>{post.post}</p></div>
                })
                setPosts(presentablePosts)
            })
            .catch((err) => {
                console.log(err)
                setPosts(<div className="post"><p>Please configure database on your instance to create a post</p></div>)
            })
    }, [])
    return (
        <>
            <div className="posts-display">
                {posts}
            </div>
        </>
    )
}

export default Posts