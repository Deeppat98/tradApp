import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View , Alert , Button, SafeAreaView , FlatList} from 'react-native';
import {useState , useEffect} from 'react'
import Item from './Item'

export default function Items({data}){
    // const data

    return (<SafeAreaView>
      <FlatList
      data={data}
      renderItem={({item}) => <Item title={item.title} body={item.body} />}
      // renderItem={({item}) => (<Text>{item.id}</Text>)}
      keyExtractor={item => item.id}
    />
  </SafeAreaView>)
    

}