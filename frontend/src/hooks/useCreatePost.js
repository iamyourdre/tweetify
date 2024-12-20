import { useState } from "react";
import toast from "react-hot-toast";
import useAxios from "./useAxios";

const useCreatePost = () => {
  const [loading, setLoading] = useState(false);
  const [parentPost, setParentPost] = useState();

  const createPost = async (posts) => {
    setLoading(true);
    try {
      posts.map(async (post, index) => {
        const res = await useAxios.post('/posts', post);
        if(res.data.error) {
          throw new Error(data.error);
        }
        if(index === 0) {
          setParentPost(res.data);
        }
      });
      return parentPost;
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  }

  return { loading, createPost };
}

export default useCreatePost;