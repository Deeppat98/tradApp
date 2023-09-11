
import * as React from 'react';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./components/Home"
import EachItem from './components/EachItem'
// import  Item from './components/Item'
import Items from './components/Items'
import Login from './components/Login'
import Content from './components/Content'
import { useFonts } from 'expo-font';
import Publications from './components/Publications';
import Font from './components/Font'
import BookRenderingPage from './components/BookRenderingPage'
import TranslationPage from './components/TranslationPage'


const Stack = createNativeStackNavigator();


export default function App() {

  const universalOptions = {
    // title: 'My Publications', 
    headerStyle: {
      backgroundColor: '#c45c5b',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={universalOptions} />
        <Stack.Screen name="Publications" component={Publications} options={universalOptions} />
        <Stack.Screen name="BookRenderingPage" component={BookRenderingPage}  options={
          ({ route, navigation }) => ({
          title: route.params.book.toUpperCase(),
          headerStyle: {
            backgroundColor: '#c45c5b',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          })
          
        } />
        <Stack.Screen name="TranslationPage" component={TranslationPage} />
        <Stack.Screen name="Font" component={Font} />
        <Stack.Screen name="Content" component={Content} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="EachItem" component={EachItem} />
        <Stack.Screen name="items" component={Items} />
      </Stack.Navigator>
    </NavigationContainer>
  );


  return (<>
  </>)
}
