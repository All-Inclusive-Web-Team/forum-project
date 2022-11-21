import { useEffect } from 'react'
import './navbar.css' 
import logo from './images/dcrdlogo-1.png'
import axios from 'axios'
import { useUserData } from '../../UserData'

const Navbar = ({setLogInRegisterPopUp, logInRegisterPopUp}) => {
    const user = useUserData()

    const logInPopUpBtnOnClick = () => {
        setLogInRegisterPopUp(true)
    }

    const logOutBtnOnClick = async () => {
        try {
            const result = await axios.delete('http://localhost:3001/logout', {withCredentials: true})
            console.log(result)
            window.location.reload()
        } catch (error) {
            console.log(error)   
        }
    }


    useEffect(() => {
        if (logInRegisterPopUp === true) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
    }, [logInRegisterPopUp])


    return (

        <header>
            <img src={logo} alt="Website Logo"/>
            {user ? <div className='user-welcome-message'>Welcome {user.name}</div> : null}
            <div className='navbar-selection'>
                {
                    user ? 
                    <button className='logout-btn' onClick={logOutBtnOnClick}>Logout</button> :
                    <button className='login-btn' onClick={logInPopUpBtnOnClick}>Login</button>
                }
            </div>
        </header>
    )
}

export default Navbar