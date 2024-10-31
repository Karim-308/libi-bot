import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image, DrawerLayoutAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { chatWithGPT } from '../api/openai'; // Import GPT function
import { chatWithGemini ,generateImagesWithGemini} from '../api/gemini'; // Import Gemini function
import ChatHeader from '../components/ChatHeader';
import { saveConversation, loadConversations, deleteAllConversations } from '../utils/conversationStorage'; // Helper functions
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';

const ChatScreen = ({ route }) => {
  const { BotName, BotLogo } = route.params;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [conversations, setConversations] = useState([]);
  const drawerRef = useRef(null);
  const flatListRef = useRef(null);

  const loadConversationHistory = async () => {
    console.log("Now speaking with:", BotName);
    const history = await loadConversations(BotName);
    console.log("Loaded conversation history:", history);
    setConversations(history);
    if (history.length > 0) {
      setMessages(history[history.length - 1].conversation);
    }
  };

  const sendMessage = async () => {
    if (input.trim()) {
      const userMessage = { role: 'user', content: input };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setInput('');

      let botResponse;
      if (BotName === "ChatGPT") {
        botResponse = await chatWithGPT([...messages, userMessage]);
      } else if (BotName === "Gemini") {
        botResponse = await chatWithGemini(input);
        console.log("testing RESPONSE :::>>", botResponse);
      }
      else if (BotName === "Gemini-Vision") {
        botResponse = await generateImagesWithGemini(input);
        console.log("testing VISION RESPONSE :::>>", botResponse);
      }

      const assistantMessage = {
        role: 'bot',
        type: botResponse.type,
        content: botResponse
      };
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
    }
  };

  const startNewChat = () => {
    console.log("lets start a new chat");
    if (messages.length > 0){
    saveConversation(BotName,messages[0].content, messages);}
    setMessages([]);
  };

  const renderItem = ({ item }) => {
    console.log("CONTENT :::>>", item.content);
    return (
      <View style={[styles.messageBubble, item.role === 'user' ? styles.userBubble : styles.botBubble]}>
        {item.type === 'image' ? (
          <Image source={{ uri: item.content }} style={styles.botImage} />
        ) : (
          <Text style={styles.messageText}>{item.content}</Text>
        )}
      </View>
    );
  };

  const loadConversation = (conversation) => {
    setMessages(conversation);
    drawerRef.current.closeDrawer();
  };

  const handleDeleteAllConversations = async () => {
    await deleteAllConversations(BotName);
    setConversations([]); // Clear the state to remove items from the FlatList
  };

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  useEffect(() => {
    loadConversationHistory();
  }, []);

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].role === 'bot') {
      console.log("Saving conversation:", messages);
      saveConversation(BotName,messages[0].content, messages);
    }
  }, [messages]);

  return (
    <DrawerLayoutAndroid
      ref={drawerRef}
      drawerWidth={300}
      drawerPosition="right"
      renderNavigationView={() => (
        <SafeAreaView style={styles.drawerContainer}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={styles.drawerHeader}>Conversation History</Text>
            <TouchableOpacity
              onPress={handleDeleteAllConversations}
              style={styles.backButton}
            >
              <FontAwesome name="trash" size={18} color="black" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={conversations}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => loadConversation(item.conversation)}>
                <Text style={styles.conversationItem}>{item.key}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.key}
          />
        </SafeAreaView>
      )}
    >
      <SafeAreaView style={styles.container}>
        <ChatHeader BotName={BotName} BotLogo={BotLogo} startNewChat={startNewChat} onHistoryPress={() => drawerRef.current.openDrawer()} />
        <View style={styles.chatContainer}>
          <Image
            style={styles.backgroundImage}
            source={require("../../assets/doodleBackground.jpg")}
          />
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.listContainer}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Type a message"
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  ChatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  botLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  ChatHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatContainer: {
    flex: 1,
    position: 'relative', // to position the background image
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    top: 0,
    left: 0,
  },
  listContainer: {
    padding: 10,
    paddingBottom: 10, // Add padding to prevent overlap with the input
  },
  inputContainer: {
    marginTop: 0,
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#FFD700',
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  messageBubble: {
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
    maxWidth: '80%',
  },
  userBubble: {
    backgroundColor: '#FFD700',
    alignSelf: 'flex-end',
  },
  botBubble: {
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: '#000',
  },
  backButton: {
    padding: 8,
  },
  botImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
    margin: 5,
  },

  drawerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  drawerHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  conversationItem: {
    paddingVertical: 10,
    fontSize: 16,
    color: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default ChatScreen;