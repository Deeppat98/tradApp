import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View , Alert , Button , ActivityIndicator, ScrollView } from 'react-native';
import {useState , useEffect} from 'react'
import Items from './Items'
export default function Home () {
  const [data, setData] = useState([]);

  useEffect(() => {
    const btnHandler = async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const json = await response.json() ; 
      setData(json);
    }

    btnHandler() ; 
  })
  const btnHandler = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const json = await response.json() ; 
    setData(json);
    Alert.alert("I am clicked !") ; 
  }
  
  
  return (
    

    <>

    <ScrollView >
      <View style={styles.container}>

      <TouchableOpacity onPress={() => {}}>
        <View>
          <Text>Click Here</Text>
        </View>
      </TouchableOpacity>
      <Text>Hello World ! How are You !</Text>
      <Text>I am Good !</Text>
      <Button
        onPress={btnHandler}
        title="Click Me"
        color="#841584"
      />
      <StatusBar style="auto" />

      </View>
      
    
    <View>
      {data ? <Items data={data} /> : <Text>Didn't got the data</Text>    }
    </View>

    </ScrollView>
    </>
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
