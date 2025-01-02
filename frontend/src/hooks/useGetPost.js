import { useState } from "react";
import toast from "react-hot-toast";
import useAxios from "./useAxios";

const useGetPost = () => {
  const [loading, setLoading] = useState(false);

  const getPost = async ({ postId }) => {
    setLoading(true);
    try {
      const res = await useAxios.get('/posts/' + postId);
      if (res.data.error) {
        throw new Error(res.data.error);
      }
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, getPost };
};

export default useGetPost;