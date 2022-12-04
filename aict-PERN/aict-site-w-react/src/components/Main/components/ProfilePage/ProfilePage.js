import './profilePage.css'
import { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import image from './images/example-cover.png'
import profilePic from './images/profile-pic.png'
import { useUserData } from '../../../../UserData'
import Posts from '../Posts/Posts'


const ProfilePage = ({openAndCloseProfilePage}) => {
    const user = useUserData()
    // const [posts, setPosts] = useState([])
    const profilePage = useRef()


    useEffect(() => {
        if (openAndCloseProfilePage.isProfilePageOpen) {
            profilePage.current.style.width = '100%'
            document.body.style.overflow = 'hidden'
        } else if (!openAndCloseProfilePage.isProfilePageOpen) {
            profilePage.current.style.width = ''
            document.body.style.overflow = ''
        }
    }, [openAndCloseProfilePage.isProfilePageOpen])


    const handleProfilePageXBtnClick = () => {
        openAndCloseProfilePage.setIsProfilePageOpen(false)
    }

    return (
        <section className='profile-page' ref={profilePage}>
            <FontAwesomeIcon className='profile-page-x-btn' icon={faX} onClick={handleProfilePageXBtnClick}/>
            <div className='profile-page-cover-photo-wrap'>
                <img className='profile-page-cover-photo' src={image} alt="" />
            </div>
            <div className='profile-page-user-info'>
                <div className='profile-page-user-basic-info'>
                    <img className='profile-page-profile-pic' src={profilePic} alt="Profile picture" />
                    <h2 className='profile-page-name'>{user ? user.name: ''}</h2>
                </div>
            </div>
            <Posts forProfilePage={true}/>
        </section>
    )
}

export default ProfilePage