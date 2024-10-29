import axios from 'axios';


const openai = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Authorization': `Bearer ${process.env.EXPO_PUBLIC_OPENAI_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export const chatWithGPT = async (messages) => {
  try {
    // Logging the messages structure and model for debugging
    console.log('Sending request to OpenAI API with data:', { model: 'gpt-4-turbo', messages });

    const response = await openai.post('/chat/completions', {
      model: 'gpt-3.5-turbo', // Ensure the model name is correct
      messages, // Verify this structure in case of issues
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching data from OpenAI:', error?.response?.data || error.message);
    return 'An error occurred while fetching the response.';
  }
};
