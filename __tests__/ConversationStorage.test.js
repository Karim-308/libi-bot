// __tests__/ConversationStorage.test.js
import { saveConversation, loadConversations } from '../src/utils/conversationStorage';

describe('Conversation Storage', () => {
  it('saves and loads conversations correctly', async () => {
    const botName = 'Gemini';
    const key = 'test-key';
    const conversation = [{ role: 'user', content: 'Hello' }];

    // Save the conversation
    await saveConversation(botName, key, conversation);

    // Load conversations
    const conversations = await loadConversations(botName);

    const savedConversation = conversations.find(conv => conv.key === key);

    expect(savedConversation).toBeDefined();
    expect(savedConversation.conversation).toEqual(conversation);
  });
});