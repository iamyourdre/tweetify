import { useState } from "react";
import toast from "react-hot-toast";
import useAxios from "./useAxios";

const useLikePost = () => {
  const [loading, setLoading] = useState(false);

  const likePost = async (postId) => {
    setLoading(true);
    try {
      const res = await useAxios.post(`/posts/${postId}/like`);
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

  const unlikePost = async (postId) => {
    setLoading(true);
    try {
      const res = await useAxios.post(`/posts/${postId}/unlike`);
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

  return { loading, likePost, unlikePost };
};

export default useLikePost;