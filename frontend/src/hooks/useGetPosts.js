import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxios from "./useAxios";
import usePost from "../zustand/usePost";

const useGetPosts = () => {
  const [loading, setLoading] = useState(false);
  const { setFyp } = usePost();

  const getFyp = async () => {
    setLoading(true);
    try {
      
      const res = await useAxios.get('/posts');
      if(res.data.error) {
        throw new Error(data.error);
      }
      setFyp(res.data);

    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, getFyp };
}

export default useGetPosts;