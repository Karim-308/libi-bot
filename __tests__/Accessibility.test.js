// __tests__/Accessibility.test.js
import React from 'react';
import { render } from '@testing-library/react-native';
import ChatScreen from '../src/screens/ChatScreen';

describe('Accessibility', () => {
  it('has accessibility labels for interactive elements', () => {
    const route = { params: { BotName: 'Gemini', BotLogo: 'google.png' } };
    const { getByA11yLabel } = render(<ChatScreen route={route} />);

    expect(getByA11yLabel('Type a message')).toBeTruthy();
    expect(getByA11yLabel('Send Message')).toBeTruthy();
  });
});