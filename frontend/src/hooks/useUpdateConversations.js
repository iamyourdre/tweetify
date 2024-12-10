import { useState, useEffect } from "react";
import useConversation from "../zustand/useConversation";
import useAxios from "./useAxios";
import toast from 'react-hot-toast';

const useUpdateConversations = () => {
  const [loading, setLoading] = useState(false);
  const { conversations, selectedConversation, setConversations } = useConversation();

  const updateConversations = async () => {
    setLoading(true);
    try {
      const res = await useAxios.get(`/conversations/${selectedConversation?._id+'-'+selectedConversation?.receiver._id}`);
      if (res.data.error) {
        throw new Error(res.data.error);
      }

      let updatedConversation = [res.data[0]]; 
      conversations.forEach(conversation => {
        if (conversation._id !== res.data[0]._id) {
          updatedConversation.push(conversation);
        }
      });

      setConversations(updatedConversation);

    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, updateConversations };
};

export default useUpdateConversations;