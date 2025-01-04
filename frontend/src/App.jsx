// App.jsx
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import UserLayout from './layouts/UserLayout';
import Messages from './pages/Messages/Messages';
import { useAuthContext } from './contexts/AuthContext'
import { Toaster } from 'react-hot-toast'
import Login from './pages/Login/Login';
import SignUp from './pages/Signup/SignUp';
import Post from './pages/Post/Post';
import Search from './pages/Search/Search';
import Profile from './pages/Profile/Profile';
import Notification from './pages/Notification/Notification';

function App() {
  const {user} = useAuthContext();
  return (
    <>
      <Routes>
        <Route path="/" element={user ? <UserLayout /> : <Navigate to='/login' />} >
          <Route path='/' element={<Home />} />
          <Route path="/:username" element={<Profile/>} />
          <Route path="/search" element={<Search/>} />
          <Route path="/notification" element={<Notification/>} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/posting" element={'posting'} />
          <Route path="/p/:postId" element={<Post />} />
        </Route>
        <Route path="/login" element={user ? <Navigate to='/' /> : <Login />} />
        <Route path="/signup" element={user ? <Navigate to='/' /> : <SignUp />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;