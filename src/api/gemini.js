import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize GoogleGenerativeAI with the API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.EXPO_PUBLIC_GEIMINI_API_KEY);

console.log('API Key:XXXXXXXXXXXXXXX', );

export const chatWithGemini = async (inputMessage) => {
  try {
    // Logging the input message for debugging
    console.log('Sending request to Gemini API with input:', inputMessage);

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(inputMessage);
    const response = await result.response;
    const text = await response.text(); // Make sure this matches the expected structure
    console.log('Received response from Gemini:', text);
    console.log('Response type:', typeof text);
    console.log('Response:' , response);

    return text; // Return the generated text
  } catch (error) {
    console.error('Error fetching data from Gemini:', error?.response?.data || error.message);
    return 'An error occurred while fetching the response.';
  }
};


export const generateImagesWithGemini = async (inputMessage) => {
  try {
    // Logging the input message for debugging
    console.log('Sending request to Gemini API with input:', inputMessage);
    
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Your are Libi Bot and you so frienndly, Answer to all message with the frienslist way possible" }],
        },
        {
          role: "model",
          parts: [{ text: "Okay I am Libi the bot I am the friendlist chatbot ever " }],
        },
      ],
    });

    const result = await model.generateContent(inputMessage);
    const response = await result.response;
    const text = await response.text(); // Make sure this matches the expected structure
    console.log('Received response from Gemini:', text);
    console.log('Response type:', typeof text);
    console.log('Response:' , response);

    return text; // Return the generated text
  } catch (error) {
    console.error('Error fetching data from Gemini:', error?.response?.data || error.message);
    return 'An error occurred while fetching the response.';
  }
};