import { useState } from 'react'
import './navbar.css' 
import logo from './images/dcrdlogo-1.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useUserData } from '../../UserData'
import ProfileDropdown from './components/ProfileDropdown/ProfileDropdown'
import { Outlet, Link } from 'react-router-dom'

const Navbar = ({setLogInRegisterPopUp, logInRegisterPopUp, openAndCloseProfilePage}) => {
    const user = useUserData()
    const [isProfileDropdownVisible, setIsProfileDropdownVisible] = useState(true)

    const handleUserProfileBtnClick = () => {
        isProfileDropdownVisible ? setIsProfileDropdownVisible(false) : setIsProfileDropdownVisible(true)
    }

    return (
        <>
            <header>
                <img src={logo} alt="Website Logo"/>
                <div className='navbar-selection'>
                    {
                        user 
                        ? 
                            <div className='user-profile-btn' onClick={handleUserProfileBtnClick}><FontAwesomeIcon icon={faUser}/></div>
                        
                        :
                        <Link to="/login-register" style={{textDecoration: 'none'}}>
                            <button className='login-btn'>Login</button>
                        </Link>
                    }
                </div>
                <ProfileDropdown isProfileDropdownVisible={isProfileDropdownVisible} setIsProfileDropdownVisible={setIsProfileDropdownVisible} openAndCloseProfilePage={openAndCloseProfilePage}/>
            </header>
            <Outlet/>
        </>
    )
}

export default Navbar