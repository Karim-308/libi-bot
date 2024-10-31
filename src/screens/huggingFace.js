import React, { useState } from 'react';
import { View, Image, ActivityIndicator, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

// Function to fetch image from Hugging Face API
async function query(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/stable-diffusion-v1-5/stable-diffusion-v1-5",
    {
      headers: {
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_HUGGING_FACE_API_KEY}`,
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.blob();
}

export default function HuggingFaceImageGenerator() {
  const navigation = useNavigation();
  const [input, setInput] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false); // New loading state

  // Function to handle the image request
  const handleGenerateImage = async () => {
    if (!input.trim()) {
      alert('Please enter a prompt');
      return;
    }

    setLoading(true); // Start loading

    try {
      const blob = await query({ "inputs": input });
      
      // Convert the blob to a Base64 string
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUri(reader.result); // Set the image URI
        setLoading(false); // Stop loading
      };
      reader.readAsDataURL(blob); // Convert blob to Base64
    } catch (error) {
      console.error(error);
      alert('Failed to generate image. Please try again.');
      setLoading(false); // Stop loading on error
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.ChatHeader}>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Dashboard')}
          style={styles.backButton}
        >
          <FontAwesome name="chevron-left" size={18} color="black" />
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image style={styles.botLogo} source={require("../../assets/stabilityAi.png")} />
          <Text style={styles.ChatHeaderText}>Stable Diffusion</Text>
        </View>
        <Text style={{ color: "white" }}>1</Text>
      </View>

      <View style={styles.contentContainer}>
        <Image source={require("../../assets/doodleBackground.jpg")} style={styles.backgroundImage} />
        <View style={styles.imageContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#f4cc00" /> // Loading indicator
          ) : (
            imageUri && (
              <Image
                source={{ uri: imageUri }}
                style={styles.generatedImage}
              />
            )
          )}
        </View>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type a prompt"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleGenerateImage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    top: 0,
    left: 0,
  },
  ChatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#ddd',
  },
  botLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    resizeMode: 'contain',
  },
  ChatHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    padding: 8,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  generatedImage: {
    width: 300,
    height: 300,
  },
  inputContainer: {
    zIndex: -2,
    marginTop: 0,
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    backgroundColor: '#fff',
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
  sendButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  sendButton: {
    backgroundColor: '#f4cc00',
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    position: 'relative',
  },
});