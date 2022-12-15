import { useState } from 'react'
import './main.css'
import MakeAPost from './components/MakeAPost/MakeAPost'
import Posts from './components/Posts/Posts'
import CreatePostBtn from './components/createPostBtn/CreatePostBtn'


const Main = () => {
    const [makeAPostVisible, setMakeAPostVisible] = useState(true)
    return(
        <main>
            <section className="posts">
                <Posts/>
            </section>  
            <section className="make-a-post">
                <CreatePostBtn setMakeAPostVisible={setMakeAPostVisible} makeAPostVisible={makeAPostVisible}/>
                <MakeAPost setMakeAPostVisible={setMakeAPostVisible} makeAPostVisible={makeAPostVisible}/>
            </section>
        </main>
    )
}


export default Main