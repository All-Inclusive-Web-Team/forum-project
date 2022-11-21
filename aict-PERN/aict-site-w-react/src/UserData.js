import { createContext, useEffect, useState, useContext } from "react"
import axios from 'axios'

export const UserDataContext = createContext(null)

export const UserData = ({children}) => {
    const [data, setData] = useState(null)
    const getUserData = async () => {
        try {
            const result = await axios.get('http://localhost:3001/user', {withCredentials: true})
            setData(result.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getUserData()
    }, [])
    
    return (
        <UserDataContext.Provider value={data}>
            {children}
        </UserDataContext.Provider>
    )
}

export const useUserData = () => useContext(UserDataContext)


