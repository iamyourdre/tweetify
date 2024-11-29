import { useState } from "react";
import toast from "react-hot-toast";
import useAxios from "./useAxios";
import { useAuthContext } from "../contexts/AuthContext";

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const {setUser} = useAuthContext();

  const signup = async ({fullName, username, password, confirmPassword, gender}) => {
    const success = handleInputError({fullName, username, password, confirmPassword, gender});
    if (!success) return;
    setLoading(true);
    try {

      const res = await useAxios.post('/auth/signup', {
        fullName, username, password, confirmPassword, gender
      });
      if(res.data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem('user', JSON.stringify(res.data));
      setUser(res.data);

    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  }
  return { loading, signup };
}

export default useSignUp

const handleInputError = ({fullName, username, password, confirmPassword, gender}) => {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error('Please fill in all fields');
    return false;
  }
  if (password !== confirmPassword) {
    toast.error('Passwords do not match');
    return false;
  }
  if (password.length < 6) {
    toast.error('Password must be at least 6 characters long');
    return false;
  }
  return true;
}
