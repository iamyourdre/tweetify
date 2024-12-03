import { useState } from "react";
import useConversation from "../zustand/useConversation";
import useAxios from "./useAxios";
import toast from 'react-hot-toast';

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (formData) => {
    setLoading(true);
    try {
      const res = await useAxios.post(`/messages/send/${selectedConversation?.receiver._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (res.data.error) {
        throw new Error(res.data.error);
      }

      setMessages([...messages, res.data]);
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;