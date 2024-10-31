// utils/conversationStorage.js
import AsyncStorage from '@react-native-async-storage/async-storage';


{/*
export const saveConversation = async (key, conversation) => {
  try {
    const storedConversations = await AsyncStorage.getItem(STORAGE_KEY);
    const conversations = storedConversations ? JSON.parse(storedConversations) : [];

    // Add a unique identifier to the key
    const date = new Date();
    const formattedDate = `${date.getHours() % 12 || 12}:${date.getMinutes()}:${date.getSeconds()} ${date.getHours() >= 12 ? 'PM' : 'AM'} ${date.getDate()}/${date.getMonth() + 1}`;
    const uniqueKey = `${key} ${formattedDate}`;
    const newConversation = { key: uniqueKey, conversation };
    
    console.log("Jsut saved a new conv\n", newConversation);
    conversations.push(newConversation);

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
  } catch (error) {
    console.error("Error saving conversation:", error);
  }
};*/}

export const saveConversation = async (botName, key, conversation) => {
  const STORAGE_KEY = `conversation_history_${botName}`;
  try {
    const storedConversations = await AsyncStorage.getItem(STORAGE_KEY);
    const conversations = storedConversations ? JSON.parse(storedConversations) : [];

    // Check if the conversation already exists
    const existingConversationIndex = conversations.findIndex(conv => conv.key === key);
    if (existingConversationIndex !== -1) {
      // Update the existing conversation
      conversations[existingConversationIndex].conversation = conversation;
    } else {
      // Add a new conversation
      const newConversation = { key, conversation };
      conversations.push(newConversation);
    }

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
  } catch (error) {
    console.error("Error saving conversation:", error);
  }
};

export const loadConversations = async (botName) => {
  const STORAGE_KEY = `conversation_history_${botName}`;
  try {
    const storedConversations = await AsyncStorage.getItem(STORAGE_KEY);
    return storedConversations ? JSON.parse(storedConversations) : [];
  } catch (error) {
    console.error("Error loading conversations:", error);
    return [];
  }
};

export const deleteAllConversations = async (botName) => {
  const STORAGE_KEY = `conversation_history_${botName}`;
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error deleting all conversations:", error);
  }
};
