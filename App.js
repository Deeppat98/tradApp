import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from "./components/Home"
import EachItem from './components/EachItem'
import  Item from './components/Item'

const Stack = createNativeStackNavigator();


export default function App () {
  
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="eachItem" component={EachItem} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  

  return (<>
  </>)
}
