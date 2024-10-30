import React, { useState, useRef, useEffect } from 'react'; 
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { chatWithGPT } from '../api/openai'; // Adjust the import based on your structure
import { chatWithGemini } from '../api/gemini'; // Import the Gemini chat function
import ChatHeader from '../components/ChatHeader';

const ChatScreen = ({ route, navigation }) => {
  const { BotName, BotLogo } = route.params;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const flatListRef = useRef(null);

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
      }
  
      const assistantMessage = {
        role: 'bot',
        type: botResponse.type,
        content: botResponse.content
      };
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
    }
  };

  const renderItem = ({ item }) => (
    <View style={[styles.messageBubble, item.role === 'user' ? styles.userBubble : styles.botBubble]}>
      {item.type === 'image' ? (
        <Image source={{ uri: item.content }} style={styles.botImage} />
      ) : (
        <Text style={styles.messageText}>{item.content}</Text>
      )}
    </View>
  );
  

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <SafeAreaView style={styles.container}>
     <ChatHeader BotName={BotName} BotLogo={BotLogo}/>

      <View style={styles.chatContainer}>
        <Image 
          style={styles.backgroundImage} 
          source={require("../../assets/doodleBackground.jpg")} 
        />
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()} // Use index as key
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
});

export default ChatScreen;