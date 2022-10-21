import { useRef, useState } from 'react'
import './navbar.css' 
import logo from './images/dcrdlogo-1.png'

const Navbar = () => {
    const [isMouseOverComponent, setIsMouseOverComponent] = useState(true)
    const noOtherPagesMessage = useRef();

    const questionMarkOnMouseEnter = () =>{
        setIsMouseOverComponent(false)
    }
    const questionMarkOnMouseLeave = () =>{
        setIsMouseOverComponent(true)
    }

    return (
        <header>
            <img src={logo} alt="" />
            <h2 className='question-mark' onMouseEnter={questionMarkOnMouseEnter} onMouseLeave={questionMarkOnMouseLeave}>?</h2>
            <div className="no-other-pages-message" hidden={isMouseOverComponent} ref={noOtherPagesMessage}>
                {/* <div className="triangle"></div> */}
                <h4 className='no-other-pages-message-header'>Why is this our only page?</h4>
                <p className='no-other-pages-message-content'>
                    We are currently working on adding more content to our site, 
                    thank you for your patience.
                </p>
            </div>
        </header>
    )
}

export default Navbar