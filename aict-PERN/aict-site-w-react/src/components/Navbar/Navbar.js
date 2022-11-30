import { useEffect, useState } from 'react'
import './navbar.css' 
import logo from './images/dcrdlogo-1.png'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useUserData } from '../../UserData'
import ProfileDropdown from './components/ProfileDropdown/ProfileDropdown'

const Navbar = ({setLogInRegisterPopUp, logInRegisterPopUp}) => {
    const user = useUserData()

    const [isProfileDropdownVisible, setIsProfileDropdownVisible] = useState(true)

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

    const handleUserProfileBtnClick = () => {
        isProfileDropdownVisible ? setIsProfileDropdownVisible(false) : setIsProfileDropdownVisible(true)
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
            <div className='navbar-selection'>
                {
                    user 
                    ? 
                    <div className='user-profile-btn'><FontAwesomeIcon icon={faUser} onClick={handleUserProfileBtnClick}/></div> 
                    :
                    <button className='login-btn' onClick={logInPopUpBtnOnClick}>Login</button>
                }
            </div>
            <ProfileDropdown isProfileDropdownVisible={isProfileDropdownVisible} setIsProfileDropdownVisible={setIsProfileDropdownVisible}/>
        </header>
    )
}

export default Navbar