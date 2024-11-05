// __tests__/ChatScreen.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ChatScreen from '../src/screens/ChatScreen';
import { chatWithGPT } from '../src/api/openai';

jest.mock('../src/api/geimini');

describe('ChatScreen', () => {
  it('allows the user to send a message and receive a response from Gemni', async () => {
    // Mock the API response
    chatWithGPT.mockResolvedValue({ content: 'Hello from Gemini', type: 'text' });

    const route = { params: { BotName: 'Gemini', BotLogo: 'google.png' } };

    const { getByPlaceholderText, getByText, findByText } = render(<ChatScreen route={route} />);

    const input = getByPlaceholderText('Type a message');
    const sendButton = getByText('Send');

    // Simulate user typing a message
    fireEvent.changeText(input, 'Hello');
    fireEvent.press(sendButton);

    // Check if the user's message is displayed
    expect(getByText('Hello')).toBeTruthy();

    // Wait for the bot's response to be displayed
    expect(await findByText('Hello from Gemini')).toBeTruthy();
  });
});