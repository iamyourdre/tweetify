import { get, set } from "mongoose";
import useConversation from "../zustand/useConversation";
import useAxios from "./useAxios"
import { useEffect, useState } from "react";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const {messages, setMessages, selectedConversation} = useConversation();

    useEffect(() => {
      const getMessages = async () => {
        setLoading(true);
        try {
          const res = await useAxios.get(`/messages/${selectedConversation._id}`)
          if(res.data.error) {
            throw new Error(data.error);
          }
          setMessages(res.data)
        } catch (error) {
          toast.error(error.message)
        } finally {
          setLoading(false)
        }
      }
      if(selectedConversation._id) getMessages();
    }, [selectedConversation?._id, setMessages])

    return {loading, messages}
}

export default useGetMessages