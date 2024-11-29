import React, { useState } from 'react'
import { HiOutlineLockClosed, HiUser } from "react-icons/hi";
import { Link } from 'react-router-dom';
import useLogin from '../../hooks/useLogin';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {loading, login} = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  }

  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div className="h-full content-center px-8">
        <form className="rounded-xl w-full md:w-80 py-6 grid gap-3 mx-auto" onSubmit={handleSubmit}>
          <p className="text-2xl text-center mb-4 font-semibold">Login</p>
          <label className="input input-bordered flex items-center gap-2">
            <HiUser />
            <input
              type="text"
              className="grow"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <HiOutlineLockClosed />
            <input
              type="password"
              className="grow"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button className="btn btn-neutral" type="submit" disabled={loading}>Login</button>
          <p>Don't have an account? <Link to="/signup" className="link">Sign Up!</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Login