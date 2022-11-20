import { useEffect, useState } from 'react'
import './navbar.css' 
import logo from './images/dcrdlogo-1.png'
import axios from 'axios'

const Navbar = ({setLogInRegisterPopUp, logInRegisterPopUp}) => {
    const [user, setUser] = useState(null)
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


    
    const getUser = async () => {
        try {
            const result = await axios.get('http://localhost:3001/user', {withCredentials: true})
            return result.data
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUser().then(res => {
            if (res === false) {
                setUser(null)
            } else {
                setUser(res)
            }
        }).catch(err =>{
            console.log(err)
        })

    }, [])

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