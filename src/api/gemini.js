import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize GoogleGenerativeAI with the API key from environment variables
const genAI = new GoogleGenerativeAI("");

console.log('API Key:', process.env.EXPO_PUBLIC_GEMINI_API_KEY);

export const chatWithGemini = async (inputMessage) => {
  try {
    // Logging the input message for debugging
    console.log('Sending request to Gemini API with input:', inputMessage);

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(inputMessage);
    const response = await result.response;
    const text = await response.text(); // Make sure this matches the expected structure

    return text; // Return the generated text
  } catch (error) {
    console.error('Error fetching data from Gemini:', error?.response?.data || error.message);
    return 'An error occurred while fetching the response.';
  }
};