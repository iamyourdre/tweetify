import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxios from "./useAxios";

const useGetUsers = (searchQuery) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      if (!searchQuery) return;
      setLoading(true);
      try {
        const res = await useAxios.get(`/users/${searchQuery}`);
        if (res.data.error) {
          throw new Error(res.data.error);
        }
        setUsers(res.data);
      } catch (error) {
        toast.error(error.response?.data?.error || error.message);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, [searchQuery]);

  return { loading, users };
}

export default useGetUsers;