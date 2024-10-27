import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import './global.css';
import TestScreen from './src/screens/TestScreen.js';
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <TestScreen />
      <Text className="bg-yellow-400 text- p-4 rounded-md">Karim</Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
