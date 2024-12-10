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
    // socket?.on("updateConversation", (updateConversation) => {
    //   const updatedConversations = conversations.map(conversation =>
    //     conversation._id === updateConversation._id ? updateConversation : conversation
    //   );
    //   setConversations(updatedConversations);
    // });

    return () => {
      socket?.off("newMessage");
      // socket?.off("updateConversation");
    }
  }, [socket, setMessages, messages]);
}

export default useListenMessages