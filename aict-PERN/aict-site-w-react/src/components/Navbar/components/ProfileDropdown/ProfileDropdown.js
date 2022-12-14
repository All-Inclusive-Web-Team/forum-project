import './profileDropdown.css'
import axios from 'axios'


const ProfileDropdown = ({isProfileDropdownVisible, openAndCloseProfilePage}) => {


    const handleMyProfileBtnClick = () => {
        openAndCloseProfilePage.isProfilePageOpen ? openAndCloseProfilePage.setIsProfilePageOpen(false) : openAndCloseProfilePage.setIsProfilePageOpen(true)
    }

    const logOutBtnOnClick = async () => {
        try {
            const result = await axios.delete('http://localhost:3001/logout', {withCredentials: true})
            window.location.reload()
        } catch (error) {
            console.log(error)   
        }
    }

    return (
        <ul className="profile-dropdown-menu" hidden={isProfileDropdownVisible}>
            <li onClick={handleMyProfileBtnClick}>My Profile</li>
            <li>Settings</li>
            <li onClick={logOutBtnOnClick}>Logout</li>
        </ul>
    )
}

export default ProfileDropdown