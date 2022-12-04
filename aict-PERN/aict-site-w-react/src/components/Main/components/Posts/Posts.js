import { useEffect, useState } from "react"
import Post from './components/Post/Post'
import './posts.css'
import { useUserData } from "../../../../UserData"


const Posts = ({forProfilePage}) => {
    const user = useUserData()
    const [posts, setPosts] = useState([])
    useEffect(() => {
        fetch('http://localhost:3001/posts')
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
                ? posts.map((post) => {
                    return <Post key={post.id} postID={post.id} postAuthor={post.author} postContent={post.post} postFKeyID={post.id} postDate={post.date} forProfilePage={forProfilePage}/>

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