import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

function TestScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text className="bg-blue-500 text-white p-4 rounded-md">
        Hello Wind
      </Text>
    </SafeAreaView>
  );
}



export default TestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
