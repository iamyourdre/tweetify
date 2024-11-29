import {create} from 'zustand';

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (room) => set({ selectedConversation: room }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;