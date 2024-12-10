import { useEffect } from "react";
import { useSocketContext } from "../contexts/SocketContext";
import useConversation from "../zustand/useConversation";

const useListenMessages = () => {
  const {socket} = useSocketContext();
  const {messages, setMessages, conversations, setConversations} = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      setMessages([...messages, newMessage]);
    });
    socket?.on("updateConversation", (updateConversation) => {
      let updatedConversation = [updateConversation[0]]; 
      conversations.forEach(conversation => {
        if (conversation._id !== updateConversation[0]._id) {
          updatedConversation.push(conversation);
        }
      });

      setConversations(updatedConversation);
    });

    return () => {
      socket?.off("newMessage");
      socket?.off("updateConversation");
    }
  }, [socket, setMessages, messages]);
}

export default useListenMessages