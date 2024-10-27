import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator.js';
import DashboardScreen from './src/screens/DashboardScreen.js';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <DashboardScreen navigation={AppNavigator} />
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
