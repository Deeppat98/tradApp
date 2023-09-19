import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View , Alert , Button, SafeAreaView ,ScrollView, FlatList} from 'react-native';
import {useState , useEffect} from 'react'
import Item from './Item'
import { useNavigation } from '@react-navigation/native';
export default function Items({data}){
    
    const navigation = useNavigation();
    const handleClick = async (postId)  => {
      // const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      // const json = await response.json() ; 
      return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then(response => response.json())
    .then(json => {
      navigation.navigate('EachItem' , {title : json.title , body : json.body} );
    })
    .catch(error => {
      console.error(error);
    });
    // setData(json);
      // navigation.navigate('item' , {title : json.title , body : json.body})
      // navigation.navigate('eachItem' , {title : json.title , body : json.body});
    // Alert.alert(json.id + " " + json.body) ; 
    }

    return (<SafeAreaView>
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