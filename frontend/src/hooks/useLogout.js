import { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import useAxios from "./useAxios";
import toast from "react-hot-toast";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      const res = await useAxios.post('/auth/logout');
      if(res.data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem('user', JSON.stringify(res.data));
      localStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  }
  return { loading, logout };
}

export default useLogout