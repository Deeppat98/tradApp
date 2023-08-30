import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View , Alert , Button, ScrollView } from 'react-native';
import {useState , useEffect} from 'react'


export default function Item({title , body}){

    return (
        <>  
            <ScrollView>
                <View style = {styles.container}>
                    <Text style={styles.text}>Text : {title}</Text>
                    <Text style={styles.text}>Body : {body}</Text>
                </View>
                
            </ScrollView>
        </>
    )

}

const styles = StyleSheet.create({
    container : {
        borderWidth : 2 , 
        borderColor : 'green',
    } , 
    text : {
        fontSize : 20,
        // fontColor : 'yellow'
    }

})