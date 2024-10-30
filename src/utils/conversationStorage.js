import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveConversation = async (keyOfConversation, conversation) => {
  try {
    const timestamp = new Date().toISOString();
    const conversationKey = `${keyOfConversation}`;
    await AsyncStorage.setItem(conversationKey, JSON.stringify(conversation));
  } catch (error) {
    console.error("Error saving conversation:", error);
  }
};

export const loadConversations = async (botName) => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const botKeys = keys.filter(key => key.startsWith(botName));
    const storedConversations = await AsyncStorage.multiGet(botKeys);

    return storedConversations.map(([key, value]) => ({
      key,
      conversation: JSON.parse(value),
    }));
  } catch (error) {
    console.error("Error loading conversations:", error);
    return [];
  }
};


export const deleteAllConversations = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys);
    console.log("All conversations deleted successfully.");
  } catch (error) {
    console.error("Error deleting all conversations:", error);
  }
};