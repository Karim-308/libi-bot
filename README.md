# libi-bot 🤖
## ALX Graduation Project

Welcome to libi-bot, an interactive AI-powered chatbot application built with React Native. Engage in dynamic conversations with various bots, generate images using Hugging Face's Stable Diffusion model.

## Table of Contents
- [Features](#features)
- [Demo](#demo)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the App](#running-the-app)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Features
- 🌐 **Multi-Bot Interaction:** Chat with different AI bots, each offering unique capabilities.
- 🖼️ **Image Generation:** Create images from text prompts using Stable Diffusion.
- 💾 **Conversation History:** Maintain bot-specific chat histories persistently.
- 🎧 **Text-to-Speech Support:** Enhance accessibility with speech output of bot responses.
- 📱 **Responsive Design:** Optimized for various screen sizes and orientations.

## Demo
![libi-bot Demo](https://www.youtube.com/watch?v=rFPQCtRWjok)  
Click on the image to watch the demo video.

## Prerequisites
- Node.js (v14.x or later)
- Expo CLI (Latest version)
- Git (for cloning the repository)

## Installation
1. **Clone this Repository**
```
git clone https://github.com/yourusername/libi-bot.git
cd libi-bot
```
2. **Install Dependencies**
```
npm intsall
```


## Configuration
Create a `.env` file in the root directory of the project to store your API keys:

> Note: Replace `EXPO_PUBLIC_GEIMINI_API_KEY` and `EXPO_PUBLIC_HUGGING_FACE_API_KEY` with your actual API keys.

## Running the App
Start the development server with Expo CLI:
```
expo start
```
- Use the Expo app on your mobile device to scan the QR code.
- Alternatively, run the app on an emulator or simulator.

## Usage
### Dashboard:
- Select a bot to start chatting.
- Available bots include till now Gemini, Libi, and Stable Diffusion.

### Chat Screen:
- Engage in conversation by typing messages.
- View conversation history specific to the selected bot.
- Start a new chat or delete conversation history as needed.

### Image Generation:
- Navigate to the Stable Diffusion bot.
- Enter a text prompt to generate an image.
- Generated images will display in the app interface.

## Project Structure
```
libi-bot/
├── src/
│   ├── api/
│   │   ├── openai.js
│   │   ├── gemini.js
│   │   └── huggingFace.js
│   ├── components/
│   │   └── ChatHeader.js
│   ├── navigation/
│   │   └── AppNavigator.js
│   ├── screens/
│   │   ├── DashboardScreen.js
│   │   ├── ChatScreen.js
│   │   └── HuggingFace.js
│   └── utils/
│       └── conversationStorage.js
├── assets/
│   ├── fonts/
│   └── images/
├── __tests__/
│   ├── Accessibilty.test.js
│   |── ChatScreen.test.js
|   |── ChatScreenSnapshot.test.js
|   |── ConversationStorage.test.js
|   |── HuggingFaceImageGenerator.test.js
├── .env
├── App.js
└── package.json
```


## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the Repository
2. Create a Feature Branch
3. Commit Your Changes
4. Push to the Branch
5. Open a Pull Request

## License
This project is licensed under the MIT License.

## Acknowledgements
- **ALX Africa:** For providing the training and mentorship.
- **Hugging Face:** For the Stable Diffusion model.
- **Expo:** For the development tools and platform.
