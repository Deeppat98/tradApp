import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  return (
    
    <View style={styles.container}>
      <TouchableOpacity onPress={() => {}}>
        <View>
          <Text>Click Here</Text>
        </View>
      </TouchableOpacity>
      <Text>Hello World ! How are You !</Text>
      <StatusBar style="auto" />
    </View>
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
