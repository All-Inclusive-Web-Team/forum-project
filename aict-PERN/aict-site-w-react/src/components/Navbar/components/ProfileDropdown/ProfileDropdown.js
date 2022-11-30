import './profileDropdown.css'

const ProfileDropdown = ({isProfileDropdownVisible}) => {
    return (
        <ul className="profile-dropdown-menu" hidden={isProfileDropdownVisible}>
            <li>My Profile</li>
            <li>Settings</li>
        </ul>
    )
}

export default ProfileDropdown