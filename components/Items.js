import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View , Alert , Button, SafeAreaView ,ScrollView, FlatList} from 'react-native';
import {useState , useEffect} from 'react'
import Item from './Item'

export default function Items({data}){
    // const data

    const handleClick =async (postId)  => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    const json = await response.json() ; 
    // setData(json);
    Alert.alert(json.id + " " + json.body) ; 
    }

    return (<SafeAreaView>
      {/* <FlatList
      data={data}
      renderItem={({item}) => <Item title={item.title} body={item.body} />}
      // renderItem={({item}) => (<Text>{item.id}</Text>)}
      keyExtractor={item => item.id}
      /> */}
      {
        data.map((item) => {
          return (
            <>
            <View key={item.id}>
              <Item title={item.title} body={item.body}  />
              <TouchableOpacity style={styles.eachbtn} onPress={()=>handleClick(item.id)}>
                <Text style={styles.t1}>Click Here</Text>
              </TouchableOpacity>
            </View>
            </>
          )
        })
      }
      
  </SafeAreaView>)
    

}

const styles = StyleSheet.create({
  eachbtn : {
    width : 85,
    height : 25,
    borderWidth : 2,
    fontSize : 20,
    borderColor : 'red',
    backgroundColor : 'black',
    flex:1 ,
    justifyContent : 'center',
    alignItems : 'center',
    
  },
  t1 : {
    color : 'white',
  }

})