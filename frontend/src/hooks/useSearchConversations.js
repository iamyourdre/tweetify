import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from 'react-hot-toast';

const useSearchConversations = () => {
  const [loading, setLoading] = useState(false);
  const { conversations } = useConversation();
  const [results, setResults] = useState([]);

  const searchConversations = async (searchQuery) => {
    setLoading(true);
    try {
      let results = [];
      const regex = new RegExp(searchQuery.toLowerCase(), 'i');
      conversations.map((conversation) => {
        if(conversation.participants.find(participant => regex.test(participant.fullName.toLowerCase()))) {
          results.push(conversation);
        }
      });
      setResults(results);

    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, results, searchConversations };
};

export default useSearchConversations;