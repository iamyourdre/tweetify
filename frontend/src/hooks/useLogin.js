import { useState } from "react";
import useAxios from "./useAxios";
import { useAuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuthContext();

  const login = async (username, password) => {
    const success = handleInputError({username, password});
    if (!success) return;
    setLoading(true);
    try {
      
      const res = await useAxios.post('/auth/login', {
        username, password
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
  return { loading, login };
}
export default useLogin

const handleInputError = ({username, password}) => {
  if (!username || !password) {
    toast.error('Please fill in all fields');
    return false;
  }
  return true;
}
