// App.jsx
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import UserLayout from './layouts/UserLayout';
import Messages from './pages/Messages/Messages';
import { useAuthContext } from './contexts/AuthContext'
import { Toaster } from 'react-hot-toast'
import Login from './pages/Login/Login';
import SignUp from './pages/Signup/SignUp';

function App() {
  const {user} = useAuthContext();
  return (
    <>
      <Routes>
        <Route path="/" element={user ? <UserLayout /> : <Navigate to='/login' />} >
          <Route path='/' element={<Home />} />
          <Route path="/search" element={'search'} />
          <Route path="/notification" element={'notification'} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/posting" element={'posting'} />
        </Route>
        <Route path="/login" element={user ? <Navigate to='/' /> : <Login />} />
        <Route path="/signup" element={user ? <Navigate to='/' /> : <SignUp />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;