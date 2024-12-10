import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxios from "./useAxios";
import useConversation from "../zustand/useConversation";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  // const [conversations, setConversations] = useState([]);
  const { conversations, setConversations } = useConversation();

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        
        const res = await useAxios.get('/conversations');
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
    getConversations();
  }, []);

  return { loading, conversations };
}

export default useGetConversations;