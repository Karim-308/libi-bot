import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/DashboardScreen';
import ChatScreen from '../screens/ChatScreen';
import HuggingFaceImageGenerator from '../screens/huggingFace';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='Dashboard'>
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="HuggingFace" component={HuggingFaceImageGenerator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
