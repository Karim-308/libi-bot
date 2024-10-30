import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator.js';
import DashboardScreen from './src/screens/DashboardScreen.js';

export default function App() {
  return (
    
      <AppNavigator />
      
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#dd9d00',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
