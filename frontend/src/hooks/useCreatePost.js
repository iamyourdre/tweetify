import { useState } from "react";
import toast from "react-hot-toast";
import useAxios from "./useAxios";

const useCreatePost = () => {
  const [loading, setLoading] = useState(false);

  const createPost = async (thread, parentPost = null) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('text', thread.text);
      if(parentPost) {
        formData.append('parentPost', parentPost._id);
        formData.append('type', 'childPost');
      }
      thread.images.forEach((image) => {
        formData.append('media', image);
      });

      const res = await useAxios.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (res.data.error) {
        throw new Error(res.data.error);
      }
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  }

  const createMultiplePosts = async (threads) => {
    setLoading(true);
    try {
      let firstPost = null;
      for (let i = 0; i < threads.length; i++) {
        const newPost = await createPost(threads[i], firstPost);
        if (i === 0) {
          firstPost = newPost;
        }
      }
      return firstPost;
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  }

  return { loading, createMultiplePosts, createPost };
}

export default useCreatePost;