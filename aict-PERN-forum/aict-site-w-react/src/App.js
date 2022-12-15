import { Routes, Route } from "react-router-dom";
import PostPage from './components/Main/components/PostPage/PostPage'
import Navbar from "./components/Navbar/Navbar";
import { UserData } from "./UserData"
import Main from "./components/Main/Main";
import LogInRegister from "./components/Main/components/LogInRegister/LogInRegister";
import ProfilePage from "./components/Main/components/ProfilePage/ProfilePage";

function App() {
  return (
    <UserData>
      <Routes>
          <Route element={<Navbar/>}>
            <Route path="/" element={<Main/>}/>
            <Route path="/post/:id" element={<PostPage/>}/>
          </Route>
          <Route path="/login-register" element={<LogInRegister/>}/>
          <Route path="/profile/:id" element={<ProfilePage/>}/>
      </Routes>
    </UserData>
  )
}

export default App;
