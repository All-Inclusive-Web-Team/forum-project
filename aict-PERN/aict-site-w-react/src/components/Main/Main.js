import { useState } from 'react'
import './main.css'
import MakeAPost from './components/MakeAPost/MakeAPost'
import Posts from './components/Posts/Posts'
import CreatePostBtn from './components/createPostBtn/CreatePostBtn'
import LogInRegister from './components/LogInRegister/LogInRegister'


const Main = ({
    setLogInRegisterPopUp,
    logInRegisterPopUp,
    setUserData
    }) => {
    const [makeAPostVisible, setMakeAPostVisible] = useState(true)



    return(
        <main>
            {/* <section className="forum-heading">
                <div className="create-post-header">
                    <h2 className="create-post-header">Create a Post!</h2>
                    <p>
                        Our forum is a place for any coder or programmer to ask questions, make comments, really anything you want. 
                    </p>
                </div>
            </section> */}
            <section className="posts">
                <Posts/>
            </section>  
            <section className="make-a-post">
                <CreatePostBtn setMakeAPostVisible={setMakeAPostVisible} makeAPostVisible={makeAPostVisible}/>
                <MakeAPost setMakeAPostVisible={setMakeAPostVisible} makeAPostVisible={makeAPostVisible}/>
            </section>
            <section className='login-register'>
                <LogInRegister setLogInRegisterPopUp={setLogInRegisterPopUp} logInRegisterPopUp={logInRegisterPopUp} setUserData={setUserData}/>
            </section>
        </main>
    )
}


export default Main