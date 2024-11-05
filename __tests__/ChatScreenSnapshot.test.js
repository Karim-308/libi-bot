// __tests__/ChatScreenSnapshot.test.js
import React from 'react';
import renderer from 'react-test-renderer';
import ChatScreen from '../src/screens/ChatScreen';

it('ChatScreen renders correctly', () => {
  const route = { params: { BotName: 'Gemini', BotLogo: 'google.png' } };
  const tree = renderer.create(<ChatScreen route={route} />).toJSON();
  expect(tree).toMatchSnapshot();
});