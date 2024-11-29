import { get, set } from "mongoose";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxios from "./useAxios";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    const getConversation = async () => {
      setLoading(true);
      try {
        
        const res = await useAxios.get('/users');
        if(res.data.error) {
          throw new Error(data.error);
        }
        setConversations(res.data);

      } catch (error) {
        toast.error(error.response?.data?.error || error.message);
      } finally {
        setLoading(false);
      }
    };
    getConversation();
  }, []);

  return { loading, conversations };
}

export default useGetConversations;