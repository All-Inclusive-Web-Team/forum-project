import Navbar from "./components/Navbar/Navbar";
import Main from "./components/Main/Main"
import { useState } from "react";
import { UserData } from "./UserData"

function App() {
  const [logInRegisterPopUp, setLogInRegisterPopUp] = useState(false)
  const [userData, setUserData] = useState(null)
  const [isProfilePageOpen, setIsProfilePageOpen] = useState(false)
  return (
    <div>
      <UserData>
        <Navbar 
        setLogInRegisterPopUp={setLogInRegisterPopUp} 
        logInRegisterPopUp={logInRegisterPopUp}
        userData={userData}
        setUserData={setUserData}
        isProfilePageOpen={isProfilePageOpen}
        setIsProfilePageOpen={setIsProfilePageOpen}
        openAndCloseProfilePage={{
          isProfilePageOpen: isProfilePageOpen,
          setIsProfilePageOpen: setIsProfilePageOpen,
        }}
        />
        <Main 
        setLogInRegisterPopUp={setLogInRegisterPopUp}
        logInRegisterPopUp={logInRegisterPopUp}
        userData={userData}
        setUserData={setUserData}
        openAndCloseProfilePage={{
          isProfilePageOpen: isProfilePageOpen,
          setIsProfilePageOpen: setIsProfilePageOpen,
        }}
        />
      </UserData>
    </div>
  );
}

export default App;
