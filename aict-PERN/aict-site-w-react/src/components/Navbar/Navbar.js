import { useEffect, useState } from 'react'
import './navbar.css' 
import logo from './images/dcrdlogo-1.png'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useUserData } from '../../UserData'
import ProfileDropdown from './components/ProfileDropdown/ProfileDropdown'

const Navbar = ({setLogInRegisterPopUp, logInRegisterPopUp, openAndCloseProfilePage}) => {
    const user = useUserData()

    const [isProfileDropdownVisible, setIsProfileDropdownVisible] = useState(true)

    const logInPopUpBtnOnClick = () => {
        setLogInRegisterPopUp(true)
    }


    const handleUserProfileBtnClick = () => {
        isProfileDropdownVisible ? setIsProfileDropdownVisible(false) : setIsProfileDropdownVisible(true)
    }

    return (

        <header>
            <img src={logo} alt="Website Logo"/>
            <div className='navbar-selection'>
                {
                    user 
                    ? 
                    <div className='user-profile-btn' onClick={handleUserProfileBtnClick}><FontAwesomeIcon icon={faUser}/></div> 
                    :
                    <button className='login-btn' onClick={logInPopUpBtnOnClick}>Login</button>
                }
            </div>
            <ProfileDropdown isProfileDropdownVisible={isProfileDropdownVisible} setIsProfileDropdownVisible={setIsProfileDropdownVisible} openAndCloseProfilePage={openAndCloseProfilePage}/>
        </header>
    )
}

export default Navbar