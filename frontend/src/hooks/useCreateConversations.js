import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxios from "./useAxios";

const useCreateConversations = () => {
  const [loading, setLoading] = useState(false);

  const createConversations = async (recipient) => {
    setLoading(true);
    try {
      const res = await useAxios.post('/conversations', {recipient: recipient});
      if(res.data.error) {
        throw new Error(data.error);
      }
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  }

  return { loading, createConversations };
}

export default useCreateConversations;