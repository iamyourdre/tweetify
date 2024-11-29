import React, { useState } from 'react'
import { HiOutlineLockClosed, HiUser } from "react-icons/hi";
import { RiUserSmileLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
import GenderCheckbox from './GenderCheckbox';
import useSignUp from '../../hooks/useSignUp';

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const {loading, signup} = useSignUp();

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  }

  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div className="h-full content-center px-8">
        <form className="rounded-xl w-full md:w-80 py-6 grid gap-3 mx-auto" onSubmit={handleSubmit}>
          <p className="text-2xl text-center mb-4 font-semibold">Sign Up</p>
          <label className="input input-bordered flex items-center gap-2">
            <RiUserSmileLine />
            <input
              type="text"
              className="grow"
              placeholder="Full Name"
              value={inputs.fullName}
              onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <HiUser />
            <input
              type="text"
              className="grow"
              placeholder="Username"
              value={inputs.username}
              onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <HiOutlineLockClosed />
            <input
              type="password"
              className="grow"
              placeholder="Password"
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <HiOutlineLockClosed />
            <input
              type="password"
              className="grow"
              placeholder="Confirm Password"
              value={inputs.confirmPassword}
              onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
            />
          </label>
          <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />
          <button className="btn btn-neutral" type="submit" disabled={loading}>Sign Up</button>
          <p>Already have an account? <Link to="/login" className="link">Login!</Link></p>
        </form>
      </div>
    </div>
  )
}

export default SignUp