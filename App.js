import { StatusBar, StyleSheet, TouchableOpacity, Text, Button, Alert } from 'react-native'
import * as React from 'react';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./components/Home"
import EachItem from './components/EachItem'
import Items from './components/Items'
import Login from './components/Login'
import Content from './components/Content'
import { useFonts } from 'expo-font';
import Publications from './components/Publications';
import Font from './components/Font'
import BookRenderingPage from './components/BookRenderingPage'
import TranslationPage from './components/TranslationPage'
import Logout from './components/Logout'
import SentencePage from './components/SentencePage'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
// import { navigationRef, isReadyRef } from './RootNavigation.js';
import SentencePageForProofreading from './components/SentencePageForProofreading'

const Stack = createNativeStackNavigator();


export default function App({navigation}) {
  // React.useEffect(() => {
  //   return () => {
  //     isReadyRef.current = false
  //   };
  // }, []);
  // const navigation = useNavigation();


  return (
    // <NavigationContainer ref={navigationRef}
    //   onReady={() => {
    //     isReadyRef.current = true;
    //   }}>
    <NavigationContainer>
      <Stack.Navigator>

        {/* <Stack.Screen name="Login" component={Login} options={{
          headerStyle: {
            backgroundColor: '#c45c5b',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <TouchableOpacity
              // style={styles.logoutButton}
              className="mr-4 underline hidden"
              onPress={() => Alert.alert('Confirm Logout ?', '', [
                {
                  text: 'Cancel',

                },
                {
                  text: 'Confirm', onPress: async () => {
                    await AsyncStorage.removeItem('email');
                    await AsyncStorage.removeItem('password');
                    await AsyncStorage.removeItem('uid');
                    await AsyncStorage.removeItem('name');
                    navigation.navigate("Login");
                    // navigation.reset({
                    //   index: 0,
                    //   routes: [{ name: 'Login' }],
                    // });

                  }
                }
              ])} >

              <Text className="text-lg font-bold text-white">Logout</Text>


            </TouchableOpacity>
          ),

        }} /> */}
        <Stack.Screen name="Publications" component={Publications} options={{
          headerStyle: {
            backgroundColor: '#c45c5b',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <TouchableOpacity
              // style={styles.logoutButton}
              className=" hidden mr-4 underline"
              onPress={() => Alert.alert('Confirm Logout ?', '', [
                {
                  text: 'Cancel',

                },
                {
                  text: 'Confirm', onPress: async () => {
                    await AsyncStorage.removeItem('email');
                    await AsyncStorage.removeItem('password');
                    await AsyncStorage.removeItem('uid');
                    await AsyncStorage.removeItem('name');
                    navigation.navigate("Login");
                    // navigation.reset({
                    //   index: 0,
                    //   routes: [{ name: 'Login' }],
                    // });

                  }
                }
              ])} >

              <Text className="text-lg font-bold text-white underline">Logout</Text>


            </TouchableOpacity>
          ),
        }} />
        <Stack.Screen name="BookRenderingPage" component={BookRenderingPage} options={
          ({ route, navigation }) => ({
            title: route.params.book.toUpperCase(),
            headerStyle: {
              backgroundColor: '#c45c5b',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight: () => (
              <TouchableOpacity
                // style={styles.logoutButton}
                className="mr-4 underline"
                onPress={() => Alert.alert('Confirm Logout ?', '', [
                  {
                    text: 'Cancel',

                  },
                  {
                    text: 'Confirm', onPress: async () => {
                      await AsyncStorage.removeItem('email');
                      await AsyncStorage.removeItem('password');
                      await AsyncStorage.removeItem('uid');
                      await AsyncStorage.removeItem('name');
                      navigation.navigate("Login");
                    }
                  }
                ])} >

                <Text className="text-lg font-bold text-white underline">Logout</Text>


              </TouchableOpacity>
            ),
          })
        } />
        {/* <Stack.Screen name="TranslationPage" component={TranslationPage} options={
          ({ route, navigation }) => ({
          title: route.params.bookname.toUpperCase(),
          headerStyle: {
            backgroundColor: '#c45c5b',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          })
        } /> */}
        <Stack.Screen name="SentencePage" component={SentencePage} options={
          ({ route, navigation }) => ({
            title: route.params.bookname.toUpperCase(),
            headerStyle: {
              backgroundColor: '#c45c5b',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight: () => (
              <TouchableOpacity
                // style={styles.logoutButton}
                className="mr-4"
                onPress={() => Alert.alert('Confirm Logout ?', '', [
                  {
                    text: 'Cancel',

                  },
                  {
                    text: 'Confirm', onPress: async () => {
                      await AsyncStorage.removeItem('email');
                      await AsyncStorage.removeItem('password');
                      await AsyncStorage.removeItem('uid');
                      await AsyncStorage.removeItem('name');
                      navigation.navigate("Login");
                    }
                  }
                ])} >

                <Text className="text-lg font-bold text-white underline">Logout</Text>


              </TouchableOpacity>
            ),
          })
        } />
        <Stack.Screen name="SentencePageForProofreading" component={SentencePageForProofreading} options={
          ({ route, navigation }) => ({
            title: route.params.bookname.toUpperCase(),
            headerStyle: {
              backgroundColor: '#c45c5b',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight: () => (
              <TouchableOpacity
                // style={styles.logoutButton}
                className="mr-4"
                onPress={() => Alert.alert('Confirm Logout ?', '', [
                  {
                    text: 'Cancel',

                  },
                  {
                    text: 'Confirm', onPress: async () => {
                      await AsyncStorage.removeItem('email');
                      await AsyncStorage.removeItem('password');
                      await AsyncStorage.removeItem('uid');
                      await AsyncStorage.removeItem('name');
                      navigation.navigate("Login");
                    }
                  }
                ])} >

                <Text className="text-lg font-bold text-white underline">Logout</Text>


              </TouchableOpacity>
            ),
          })
        } />
        {/* <Stack.Screen name="Font" component={Font} /> */}
        {/* <Stack.Screen name="Content" component={Content} /> */}
        {/* <Stack.Screen name="Home" component={Home} /> */}
        {/* <Stack.Screen name="EachItem" component={EachItem} /> */}
        {/* <Stack.Screen name="items" component={Items} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );


  return (<>
  </>)
}


// const styles = StyleSheet.create({
//   logoutButton : {
//     fontSize : "20px"
//   }
// })