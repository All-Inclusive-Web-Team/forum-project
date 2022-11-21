import Navbar from "./components/Navbar/Navbar";
import Main from "./components/Main/Main"
import { useState } from "react";

function App() {
  const [logInRegisterPopUp, setLogInRegisterPopUp] = useState(false)
  const [userData, setUserData] = useState(null)
  return (
    <div>
      <Navbar 
      setLogInRegisterPopUp={setLogInRegisterPopUp} 
      logInRegisterPopUp={logInRegisterPopUp}
      userData={userData}
      setUserData={setUserData}
      />
      <Main 
      setLogInRegisterPopUp={setLogInRegisterPopUp}
      logInRegisterPopUp={logInRegisterPopUp}
      userData={userData}
      setUserData={setUserData}
      />
    </div>
  );
}

export default App;
