// __tests__/HuggingFaceImageGenerator.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import HuggingFaceImageGenerator from '../src/screens/HuggingFace';
import query from '../src/api/huggingFace';

jest.mock('../src/api/huggingFace');

describe('HuggingFaceImageGenerator', () => {
  it('allows the user to generate an image from a text prompt', async () => {
    const mockImageUri = 'data:image/png;base64,...';
    query.mockResolvedValue(mockImageUri);

    const { getByPlaceholderText, getByText, queryByTestId } = render(<HuggingFaceImageGenerator />);

    const input = getByPlaceholderText('Type a prompt');
    const sendButton = getByText('Send');

    fireEvent.changeText(input, 'A beautiful landscape');
    fireEvent.press(sendButton);

    // Wait for the image to appear
    await waitFor(() => {
      expect(queryByTestId('generatedImage')).toBeTruthy();
    });
  });
});