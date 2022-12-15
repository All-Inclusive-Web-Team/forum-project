import './profileDropdown.css'
import axios from 'axios'
import { useUserData } from '../../../../UserData'
import { Link } from 'react-router-dom'


const ProfileDropdown = ({isProfileDropdownVisible}) => {
    const user = useUserData()

    const logOutBtnOnClick = async () => {
        try {
            await axios.delete('http://localhost:3001/logout', {withCredentials: true})
            window.location.reload()
        } catch (error) {
            console.log(error)   
        }
    }

    return (
        <ul className="profile-dropdown-menu" hidden={isProfileDropdownVisible}>
            {
                user && <Link to={`/profile/${user.id}`} style={{textDecoration: 'none'}}><li className='profile-dropdown-btn'>My Profile</li></Link>
            }
            <li className='profile-dropdown-btn'>Settings</li>
            <li onClick={logOutBtnOnClick} className='profile-dropdown-btn'>Logout</li>
        </ul>
    )
}

export default ProfileDropdown